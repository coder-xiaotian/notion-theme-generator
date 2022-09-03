import {createContext} from "react";

export function initContext<T>(
  func: (...args: any[]) => T,
) {
  return createContext(undefined as T);
}
