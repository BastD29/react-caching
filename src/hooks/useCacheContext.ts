import { useContext } from "react";
import { CacheContext } from "../context/cache";

export const useCacheContext = () => {
  const context = useContext(CacheContext);

  if (!context) {
    throw new Error("useCacheContext must be used within a ContextProvider");
  }

  return context;
};
