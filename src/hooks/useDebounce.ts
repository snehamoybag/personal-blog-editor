import { useCallback, useRef } from "react";

const DEFAULT_TIMEOUT = 500;

type Callback = () => void;
type Timeout = ReturnType<typeof setTimeout>;

export type Debounce = (callback: Callback) => void;

export type UseDebounce = (timeout?: number) => Debounce;

const useDebounce: UseDebounce = (timeout = DEFAULT_TIMEOUT) => {
  const timeoutRef = useRef<Timeout>(0 as unknown as Timeout);

  return useCallback(
    (callback: Callback) => {
      // clears prev timer if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // starts new timer
      timeoutRef.current = setTimeout(callback, timeout);
    },
    [timeout],
  );
};

export default useDebounce;
