import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClick);
    document.addEventListener("touchend", handleClick);

    return () => {
      document.removeEventListener("mouseup", handleClick);
      document.removeEventListener("touchend", handleClick);
    };
  }, [ref, callback]);

  return ref;
};

export default useOutsideClick;
