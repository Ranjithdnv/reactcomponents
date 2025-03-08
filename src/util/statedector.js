import { useState, useEffect } from "react";

const stateChangesDetectorStore = [];

export const useStateChangesDetector = () => {
  const [store, setStore] = useState(stateChangesDetectorStore);

  useEffect(() => {
    console.log(store.slice(-5)); // Logs last 5 elements
  }, [store]);

  const stateChangesDetector = (name, prev, newValue) => {
    if (prev !== newValue) {
      console.log("kkkkkkkkkkkkk");
      console.trace(name, prev, newValue);
      setStore((prev) => [...prev, name]);
    }
    return newValue;
  };

  return { store, stateChangesDetector };
};
