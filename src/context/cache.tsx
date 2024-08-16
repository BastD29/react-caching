import { FC, ReactNode, createContext } from "react";

type ContextType = {
  getCache: (key: string) => any;
  setCache: (key: string, value: any, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

type cacheBody = {
  expiry: Date;
  data: any;
};

export const CacheContext = createContext<ContextType | null>(null);

type CacheProviderPropsType = {
  children: ReactNode;
};

export const CacheProvider: FC<CacheProviderPropsType> = ({ children }) => {
  const map = new Map<string, cacheBody>();
  console.log("map:", map);

  function getCache(key: string) {
    const cacheValue = map.get(key);
    if (!cacheValue) return undefined;
    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return undefined;
    }
    return cacheValue.data;
  }

  function setCache(key: string, value: any, ttl: number = 10) {
    var t = new Date();
    t.setSeconds(t.getSeconds() + ttl);
    map.set(key, {
      expiry: t,
      data: value,
    });
  }

  function clearCache() {
    map.clear();
  }

  function deleteCache(key: string) {
    map.delete(key);
  }

  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};
