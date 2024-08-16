import { useEffect, useState } from "react";

const useCustomCache = (url: string, ttl: number) => {
  console.log("url:", url);

  const [data, setData] = useState(null);
  console.log("data:", data);

  const [cache, setCache] = useState<{ [key: string]: any }>({});
  console.log("cache:", cache);

  useEffect(() => {
    const cachedData = cache[url];
    console.log("cachedData:", cachedData);

    // ! there is a problem with timeStamp - to be fixed
    if (cachedData && Date.now() - cachedData.timeStamp < ttl) {
      setData(cachedData.data);
    } else {
      fetch(url)
        .then((response) => {
          console.log("response:", response);
          return response.json();
        })
        .then((result) => {
          console.log("result:", result);
          setCache((prevCache) => {
            console.log("prevCache:", prevCache);
            return {
              ...prevCache,
              [url]: { data: result, timestamp: Date.now() },
            };
          });
          setData(result);
        });
    }
  }, [url, cache, ttl]);

  return data;
};

export { useCustomCache };
