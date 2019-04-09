import {Exposer} from "./exposer";

describe("Exposer", () => {
    test("that exposedHook is initially null", () => {
        const exposer = new Exposer()
        expect(exposer.exposedHook).toBe(null)
    })

    test("that setExposedHook sets the value of exposedHooked", () => {
        const exposer = new Exposer()
        const mockValue = 'any'
        exposer.setExposedHook(mockValue)
        expect(exposer.exposedHook).toEqual(mockValue)
    })

    test("that getExposedHook retrieves the value of exposedHook", () => {
        const exposer = new Exposer()
        const mockValue = 'any'
        exposer.exposedHook = mockValue
        expect(exposer.getExposedHook()).toEqual(mockValue)
    })
})