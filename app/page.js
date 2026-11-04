import ProductGrid from "@/components/ProductGrid";
import { FALLBACK_PRODUCTS, toSlug } from "@/lib/products";

export default function HomePage() {
  const products = FALLBACK_PRODUCTS.map((p) => ({
    id: p.id,
    title: p.title,
    image: p.image,
    slug: toSlug(p),
  }));

  return (
    <>
      <h1 className="page-title">Featured products</h1>
      <p className="page-sub">Five picks from the catalog. Search to browse everything.</p>
      <ProductGrid products={products} />
    </>
  );
}
