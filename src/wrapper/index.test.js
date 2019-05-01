import { WrapCustomHook, WrapUseState } from ".";
import { cleanup, render } from "react-testing-library";
import * as React from "react";

describe("wrapper", () => {
  afterEach(() => {
    cleanup();
  });

  test("that WrapUseState exposes the hook passed in on props", () => {
    const mockProps = {
      hook: "any default use state value",
      setExposedHook: jest.fn()
    };
    render(<WrapUseState {...mockProps} />);
    expect(mockProps.setExposedHook.mock.calls[0][0][0]).toEqual(
      mockProps.hook
    );
  });

  test("that WrapCustomHook calls the custom hook with the appropriate in values", () => {
    const mockHook = jest.fn((a, b) => ({ a, b }));
    const mockProps = {
      hook: mockHook,
      vals: [1, 2],
      setExposedHook: jest.fn()
    };
    render(<WrapCustomHook {...mockProps} />);
    expect(mockProps.hook).toHaveBeenCalledWith(...mockProps.vals);
  });

  test("that WrapCustomHook exposes the custom hook passed in on props", () => {
    const mockHookResult = "any";
    const mockHook = jest.fn().mockReturnValue(mockHookResult);
    const mockProps = {
      hook: mockHook,
      vals: [1, 2],
      setExposedHook: jest.fn()
    };
    render(<WrapCustomHook {...mockProps} />);
    expect(mockProps.setExposedHook).toHaveBeenCalledWith(mockHookResult);
  });
});
