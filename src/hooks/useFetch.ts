import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCacheContext } from "./useCacheContext";
import { useEffect, useState } from "react";

/**
 * Custom configuration for the useFetch hook, extending AxiosRequestConfig.
 *
 * @typedef {Object} CustomAxiosConfig
 * @property {Array<unknown>} key - Array of items used to generate a unique cache key.
 * @property {boolean} [initialEnabled] - If true, the fetch will trigger immediately on component mount.
 * @property {Object} [cache] - Cache configuration.
 * @property {boolean} [cache.enabled] - If true, caching is enabled for the request.
 * @property {number} [cache.ttl] - Time-to-live for the cache in seconds.
 * @property {(data: AxiosResponse) => void} [onSuccess] - Callback function on successful response.
 * @property {(err: AxiosError) => void} [onFailure] - Callback function on failed response.
 */
type CustomAxiosConfig = AxiosRequestConfig & {
  key: Array<unknown>;
  initialEnabled?: boolean;
  cache?: {
    enabled?: boolean;
    ttl?: number;
  };
  onSuccess?: (data: AxiosResponse) => void;
  onFailure?: (err: AxiosError) => void;
};

/**
 * Generates a unique string key by serializing each item in the `key` array.
 *
 * @param {Array<unknown>} key - Array of items to be used as cache key.
 * @returns {string} - Serialized and joined string key.
 */
function keyify(key: CustomAxiosConfig["key"]) {
  return key.map((item) => JSON.stringify(item)).join("-");
}

/**
 * Custom React hook to fetch data using Axios with caching and re-fetching capabilities.
 *
 * @template T
 * @param {CustomAxiosConfig} config - Configuration for the Axios request and hook behavior.
 * @returns {Readonly<{ loading: boolean, data: T | undefined, error: any, refetch: (hard?: boolean) => void, inValidate: (invalidationKey: Array<unknown>) => void }>} - An object containing the fetch status, data, and utility functions.
 */
export default function useFetch<T = any>({
  key,
  initialEnabled = true,
  cache,
  ...axiosConfig
}: CustomAxiosConfig) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any>();
  const { getCache, setCache, deleteCache } = useCacheContext();

  /**
   * Function to trigger a data fetch, optionally ignoring cached data.
   *
   * @param {boolean} [hard=false] - If true, the fetch will bypass the cache and request fresh data.
   */
  const refetch = (hard: boolean = false) => {
    setLoading(true);
    setError(undefined);
    const cacheKey = keyify(key);
    console.log("cacheKey:", cacheKey);

    if (cache?.enabled && getCache(cacheKey) !== undefined && !hard) {
      setData(getCache(cacheKey));
      setLoading(false);
      setError(undefined);
      return;
    }

    axios(axiosConfig)
      .then((data) => {
        setData(data as T);
        if (cache?.enabled) setCache(cacheKey, data, cache.ttl);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Invalidates the cached data for the provided key, forcing a fresh fetch on next use.
   *
   * @param {Array<unknown>} invalidationKey - The key corresponding to the cache entry that should be invalidated.
   */
  function inValidate(invalidationKey: CustomAxiosConfig["key"]) {
    console.log("invalidation key:", invalidationKey);
    deleteCache(keyify(invalidationKey));
  }

  useEffect(() => {
    if (initialEnabled) refetch();
  }, []);

  return { loading, data, error, refetch, inValidate } as const;
}
