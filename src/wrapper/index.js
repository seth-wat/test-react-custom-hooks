import { useState, useEffect } from "react";
import React from "react";

export const WrapUseState = props => {
  const hook = useState(props.hook);
  useEffect(() => {
    props.setExposedHook(hook);
  }, [hook]);
  return <div />;
};

export const WrapCustomHook = props => {
  const hook = props.hook(...props.vals);
  useEffect(() => {
    props.setExposedHook(hook);
  }, [hook]);

  return <div />;
};
