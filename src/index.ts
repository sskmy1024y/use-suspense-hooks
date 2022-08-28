import {useCallback} from "react";
import {clear, clearAll, resolver} from './libs';


/**
 * Get the data asynchronously and return value via React.Suspense.
 *
 * @param key Specify unique key.
 * @param fn Receive asynchronous functions
 * @return asynchronous data
 */
export const useSuspenseValue = <T>(key: string, fn: () => Promise<T>): T => {
  return resolver<T>(key, fn);
}

/**
 * Execute the async function through React.Suspense.
 * And returns a function to reset the acquired asynchronous data.
 *
 * @param key Specify unique key.
 * @param fn Receive asynchronous functions
 */
export const useSuspenseState = <T>(key: string, fn: () => Promise<T>): [T, () => void] => {
  const data = resolver<T>(key, fn);
  const resetCache = useCallback(() => clear(key), [key])
  return [data, resetCache]
}

/**
 * Returns a function to reset the acquired asynchronous data.
 *
 * @param key Specify unique key.
 */
export const useSuspenseReset = (key: string) => {
  return useCallback(() => clear(key), [key])
}

/**
 * Clear all Suspense cache
 */
export const resetAllCache = () => {
  return clearAll()
}
