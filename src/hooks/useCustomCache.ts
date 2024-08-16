// import { useEffect, useState } from "react";

// const useCustomCache = (url: string) => {
//   console.log("url:", url);

//   const [data, setData] = useState(null);
//   console.log("data:", data);

//   const [cache, setCache] = useState<{ [key: string]: any }>({});
//   console.log("cache:", cache);

//   useEffect(() => {
//     if (cache[url]) {
//       setData(cache[url]);
//     } else {
//       fetch(url)
//         // .then((response) => response.json())
//         .then((response) => {
//           console.log("response:", response);
//           return response.json();
//         })
//         .then((result) => {
//           console.log("result:", result);
//           //   setCache((prevCache) => ({ ...prevCache, [url]: result }));
//           setCache((prevCache) => {
//             console.log("prevCache:", prevCache);
//             return { ...prevCache, [url]: result };
//           });
//           setData(result);
//         });
//     }
//   }, [url, cache]);

//   return data;
// };

// export { useCustomCache };
