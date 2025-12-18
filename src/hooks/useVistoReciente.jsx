import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "recentlyViewed";
const MAX_ITEMS = 5;

export const useVistoReciente = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const storageRef = useRef(null);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem(STORAGE_KEY);
      const items = stored ? JSON.parse(stored) : [];
      storageRef.current = items;
      setRecentlyViewed(items);
    } catch (error) {
      console.error("Error al cargar recentlyViewed:", error);
      setRecentlyViewed([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveToStorage = useCallback((items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      storageRef.current = items;
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  }, []);

  const addViewed = useCallback(
    (id) => {
      if (!id) return;

      setRecentlyViewed((prevItems) => {
        let updatedItems = prevItems.filter((item) => item !== id);
        updatedItems = [...updatedItems, id];

        if (updatedItems.length > MAX_ITEMS) {
          updatedItems = updatedItems.slice(-MAX_ITEMS);
        }

        saveToStorage(updatedItems);
        return updatedItems;
      });
    },
    [saveToStorage]
  );

  const clearViewed = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      storageRef.current = [];
      setRecentlyViewed([]);
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
  }, []);

  const removeViewed = useCallback(
    (id) => {
      setRecentlyViewed((prevItems) => {
        const updatedItems = prevItems.filter((item) => item !== id);
        saveToStorage(updatedItems);
        return updatedItems;
      });
    },
    [saveToStorage]
  );

  return {
    recentlyViewed,
    addViewed,
    clearViewed,
    removeViewed,
    isLoaded,
  };
};
