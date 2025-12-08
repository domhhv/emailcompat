import * as React from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      return setDebouncedValue(value);
    }, delay);

    return () => {
      return window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
