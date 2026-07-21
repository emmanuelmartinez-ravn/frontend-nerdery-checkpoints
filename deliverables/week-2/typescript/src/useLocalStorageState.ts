import { useState } from "react";

function isUpdater<T>(value: T | ((prev: T) => T)): value is (prev: T) => T {
  return typeof value === "function";
}

export function useLocalStorageState<T>(
  _key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const storedValue = JSON.parse(localStorage.getItem(_key) ?? "null");

  const [localStorageValue, setLocalStorageValue] = useState<T>(
    storedValue ?? initialValue,
  );

  const setValueExternal = (_value: T | ((prev: T) => T)): void => {
    const newValue = isUpdater(_value) ? _value(localStorageValue) : _value;
    localStorage.setItem(_key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setValueExternal];
}
