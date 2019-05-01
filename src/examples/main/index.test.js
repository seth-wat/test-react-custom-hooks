import { act } from "react-dom/test-utils";
import { exposeHook } from "../..";
import { useDescription } from ".";

it("should exclam", () => {
  let exposer;

  act(() => {
    // call the exposeHook function with the hook and any params, useDescription(description: string)
    exposer = exposeHook(useDescription, ["ez pz hook testing"]);
  });

  // when exposer() is called, it gives you the hooks return value, {description, setDescription}
  expect(exposer().description).toEqual("ez pz hook testing!");

  // anytime you dispatch a change, you MUST wrap it in react-dom's act function
  act(() => {
    exposer().setDescription("no dependencies");
  });

  // make sure your assertions are OUTSIDE of act!
  expect(exposer().description).toEqual("no dependencies!");

  // seriously don't forget to use act
  act(() => {
    exposer().setDescription("such unit tests, much wow");
  });

  // always call exposer when retrieving a value
  expect(exposer().description).toEqual("such unit tests, much wow!");
});
