import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { getProduct, idFromSlug } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(idFromSlug(slug));
  return { title: product ? `${product.title} | ImpeStore` : "Product not found" };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(idFromSlug(slug));
  if (!product) notFound();

  return (
    <>
      <Link href="/" className="back">
        ← Back to products
      </Link>
      <article className="detail">
        <div className="detail-image">
          <Image src={product.image} alt={product.title} width={400} height={400} priority />
        </div>
        <div className="detail-info">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="rating">
            Rated {product.rating.rate} / 5 by {product.rating.count} buyers
          </p>
          <p className="description">{product.description}</p>
          <FavoriteButton productId={product.id} />
        </div>
      </article>
    </>
  );
}
