import { useEffect, useState } from "react";

function getItem<T>(key: string, value: T): T {
  try {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : value;
  } catch {
    return value;
  }
}

export function useLocalStorageState<T>(
  _key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    return getItem(_key, initialValue);
  });

  const [prevKey, setPrevKey] = useState(_key);
  if (_key !== prevKey) {
    setPrevKey(_key);
    setLocalStorageValue(getItem(_key, initialValue));
  }

  useEffect(() => {
    localStorage.setItem(_key, JSON.stringify(localStorageValue));
  }, [_key, localStorageValue]);

  return [localStorageValue, setLocalStorageValue];
}
