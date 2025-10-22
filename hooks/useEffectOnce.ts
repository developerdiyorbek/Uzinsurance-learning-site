import { EffectCallback, useEffect } from "react";

export function useEffectOnce(callback: EffectCallback) {
  useEffect(() => {
    const id = setTimeout(() => callback(), 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
