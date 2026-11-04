"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "favorites";

function readIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function FavoriteButton({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    setIsFavorite(readIds().includes(productId));
    setLoaded(true);
  }, [productId]);

  useEffect(() => {
    if (!loaded) return;
    const ids = new Set(readIds());
    if (isFavorite) ids.add(productId);
    else ids.delete(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  }, [isFavorite, loaded, productId]);

  return (
    <button
      type="button"
      className={isFavorite ? "btn btn-fav active" : "btn btn-fav"}
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite((prev) => !prev)}
    >
      {isFavorite ? "In your favorites" : "Add to Favorite"}
    </button>
  );
}
