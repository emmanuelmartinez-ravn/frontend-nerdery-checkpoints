import { useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    const lastLocalStorageValue = localStorage.getItem(key);
    try {
      if (lastLocalStorageValue) {
        const parsedLocalStorageValue = JSON.parse(lastLocalStorageValue);
        return parsedLocalStorageValue;
      }
    } catch {
      return initialValue;
    }
    return initialValue;
  });

  const setValue = (value: T | ((prev: T) => T)): void => {
    const newValue =
      value instanceof Function ? value(localStorageValue) : value;
    setLocalStorageValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [localStorageValue, setValue];
}
