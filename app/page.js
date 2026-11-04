import ProductGrid from "@/components/ProductGrid";
import { getProducts, toSlug } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const all = await getProducts();
  const products = all.map((p) => ({
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
