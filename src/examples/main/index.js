import { useState, useEffect } from "react";
export const useDescription = initialDescription => {
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    // it just appends a ! to whatever the input string is
    setDescription(description + "!");
  });

  return { description, setDescription };
};
