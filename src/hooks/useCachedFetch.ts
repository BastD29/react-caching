import { useEffect, useState } from "react";

const useCachedFetch = <T>(url: string): [T | null, boolean, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  console.log("data:", data);

  const [loading, setLoading] = useState<boolean>(true); // loading state is initialized to true to handle cases where the useEffect might re-run due to changes in dependencies.
  console.log("loading:", loading);

  const [error, setError] = useState<Error | null>(null);
  console.log("error:", error);

  const cache: { [key: string]: T } = {}; // Simple cache object
  console.log("cache:", cache);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      if (cache[url]) {
        // Use cached data if available
        setData(cache[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        console.log("response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: T = await response.json();
        console.log("result:", result);
        cache[url] = result; // Cache the result
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
};

export { useCachedFetch };
