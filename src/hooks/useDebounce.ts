import { useEffect, useState } from "react";

// <T> es la forma de decirle a useDebounce que los tipos los recibe por parámetro
// → useDebounce<string>('hello') or useDebounce<number>(2)
export function useDebounce<T>(value: T, delay = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Si pasan los 500 ms después del usuario haber teclado la última
      // letra se setea el value al debounceValue
      setDebounceValue(value);
    }, delay);
    // Desmontá el useEffect cada vez que cambia una dependencia
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}
