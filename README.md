# Storefront – Product Showcase (Next.js)

Simple product showcase built with Next.js (App Router) and the [Fake Store API](https://fakestoreapi.com/docs).

## Features
- `/` – 5 products, each with image, name and **View Details** button
- `/products/[slug]` – full product info (image, category, price, rating, description)
- Navigation with `<Link>`: Home, Contact
- **Add to Favorite** button using `useState` + `useEffect` (saved in `localStorage`)
- Optional: product search (searches the whole catalog) and responsive styling

## Slug
The API only has numeric ids, so the slug is `<title-words>-<id>`
(e.g. `/products/mens-casual-premium-slim-fit-t-shirts-2`). The id is read from the end of the slug.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy
Push to GitHub, then import the repo in Vercel (no env vars needed).
