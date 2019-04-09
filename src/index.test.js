import React from 'react'

import {exposeHook} from ".";
import {WrapCustomHook, WrapUseState} from "./wrapper";

jest.mock('./wrapper', () => ({
    WrapUseState: jest.fn(() => <div/>),
    WrapCustomHook: jest.fn(() => <div/>)
}))

describe("exposeHook", () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("when parameters are defined", () => {
        it("should call WrapCustomHook with the appropriate values", () => {
            const mockHook = () => 'any'
            const mockParams = ['any']
            exposeHook(mockHook, mockParams)
            const args = WrapCustomHook.mock.calls[0][0]
            expect(args.hook).toEqual(mockHook)
            expect(args.setExposedHook).toBeInstanceOf(Function)
            expect(args.vals).toEqual(mockParams)
        })
    })

    describe("when parameters are not defined", () => {
        it("should call WrapUseState with the appropriate values", () => {
            const mockHook = () => 'any'
            exposeHook(mockHook, undefined)
            const args = WrapUseState.mock.calls[0][0]
            expect(args.hook).toEqual(mockHook)
            expect(args.setExposedHook).toBeInstanceOf(Function)
        })
    })

    it("should return a function intended to get the exposed hook", () => {
        const returnVal = exposeHook(() => 'any')
        expect(returnVal).toBeInstanceOf(Function)
    })

})