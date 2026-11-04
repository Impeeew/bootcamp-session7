const API = (process.env.API_URL || "https://fakestoreapi.com").replace(/\/+$/, "");
const REQUEST_TIMEOUT = 3000;
export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, and lightweight fabric.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring and Autumn, suitable for many occasions.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description: "The color could be slightly different between the screen and actual product.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/5.jpg",
    rating: { rate: 4.6, count: 400 },
  },
];

async function requestProducts(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const res = await fetch(`${API}/products${path}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Product API returned ${res.status}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

export function toSlug(product) {
  return `${slugify(product.title)}-${product.id}`;
}

export function idFromSlug(slug) {
  return Number(slug.split("-").pop());
}

export async function getProducts() {
  try {
    const products = await requestProducts("");
    if (!Array.isArray(products)) {
      throw new Error("Product API returned an invalid catalog");
    }
    const validProducts = products.filter(
      (product) =>
        product &&
        Number.isInteger(product.id) &&
        typeof product.title === "string" &&
        typeof product.image === "string"
    );
    if (validProducts.length === 0) {
      throw new Error("Product API returned no valid products");
    }
    return validProducts;
  } catch (error) {
    console.error("Unable to load products:", error);
    return FALLBACK_PRODUCTS;
  }
}

export async function getProduct(id) {
  if (!Number.isInteger(id) || id < 1) return null;
  try {
    const product = await requestProducts(`/${id}`);
    return product && typeof product === "object" ? product : null;
  } catch (error) {
    console.error(`Unable to load product ${id}:`, error);
    return FALLBACK_PRODUCTS.find((product) => product.id === id) || null;
  }
}
