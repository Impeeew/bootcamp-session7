import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="page-title">Product not found</h1>
      <p className="page-sub">That product doesn’t exist or the link is wrong.</p>
      <Link href="/" className="btn">
        Back to Home
      </Link>
    </>
  );
}
