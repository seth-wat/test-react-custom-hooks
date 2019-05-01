import { Exposer } from "./exposer/exposer";
import ReactDOM from "react-dom";
import React from "react";
import { WrapCustomHook, WrapUseState } from "./wrapper";

export const exposeHook = (hook, parameters) => {
  const exposer = new Exposer();
  parameters !== undefined
    ? ReactDOM.render(
        <WrapCustomHook
          hook={hook}
          setExposedHook={exposer.setExposedHook}
          vals={parameters}
        />,
        document.createElement("div")
      )
    : ReactDOM.render(
        <WrapUseState hook={hook} setExposedHook={exposer.setExposedHook} />,
        document.createElement("div")
      );
  return exposer.getExposedHook;
};
