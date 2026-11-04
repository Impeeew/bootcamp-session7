"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HOME_LIMIT = 5;

export default function ProductGrid({ products }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const visible = term
    ? products.filter((p) => p.title.toLowerCase().includes(term))
    : products.slice(0, HOME_LIMIT);

  return (
    <>
      <div className="search">
        <label htmlFor="search" className="sr-only">
          Search products
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search all products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <p className="empty">No products match “{query}”. Try a different word.</p>
      ) : (
        <ul className="grid">
          {visible.map((p) => (
            <li key={p.id} className="card">
              <div className="card-image">
                <Image src={p.image} alt={p.title} width={200} height={200} />
              </div>
              <h2 className="card-title">{p.title}</h2>
              <Link href={`/products/${p.slug}`} className="btn">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
