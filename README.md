<h1>test-react-custom-hooks</h1>

[![Build Status](https://travis-ci.com/seth-wat/test-react-custom-hooks.svg?branch=master)](https://travis-ci.com/seth-wat/test-react-custom-hooks)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)

> Invariant Violation: Hooks can only be called inside the body of a function component.

That's the error message we all get our first attempt at testing a hook. 
This is a little library that solves that violation so that they may be unit tested like any other function.

* 0 dependencies excluding react and react-dom
* super simple and un-opinionated api

`yarn install test-react-custom-hooks`

### e.g, here's a hook

```javascript
import {useState, useEffect} from 'react'
export const useDescription = (initialDescription) => {
    const [description, setDescription] = useState(initialDescription)

    useEffect(() => {
        // it just appends a ! to whatever the input string is
        setDescription(description + "!")
    })

    return {description, setDescription}

}
```

### i.e, here's a test

```javascript
it("should exclam", () => {

  let exposer

  act(() => {
    // call the exposeHook function with the hook and any params, useDescription(description: string)
    exposer = exposeHook(useDescription, ['ez pz hook testing'])
  })
  
  // when exposer() is called, it gives you the hooks return value, {description, setDescription}
  expect(exposer().description).toEqual('ez pz hook testing!')

  // anytime you dispatch a change, you MUST wrap it in react-dom's act function
  act(() => {
    exposer().setDescription('no dependencies')
  })

  // make sure your assertions are OUTSIDE of act!
  expect(exposer().description).toEqual('no dependencies!')

  // seriously don't forget to use act
  act(() => {
    exposer().setDescription("such unit tests, much wow")
  })
  
  // always call exposer when retrieving a value
  expect(exposer().description).toEqual('such unit tests, much wow!')
  
})
```

### API
### `exposeHook(hook [, parameters: []])`

The above given example is the most common use case of the API. There's a few things to note:
- To pass arguments into a hook `useMagic(a, b, c)` pass an array to parameters:
 `exposeHook(useMagic, ['foo', 'rah', 'doh'])`
- Regarding [act](https://reactjs.org/docs/test-utils.html#act)
    - `exposeHook` calls must be wrapped
    - any calls to the exposed hook that modify state must be wrapped
    - assertions must be after the `act` call
