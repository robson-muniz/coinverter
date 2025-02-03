import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true); // User started typing
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsTyping(false); // User stopped typing
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isTyping };
}