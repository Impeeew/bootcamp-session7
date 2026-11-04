export const metadata = { title: "Contact | ImpeStore" };

export default function ContactPage() {
  return (
    <>
      <h1 className="page-title">Contact</h1>
      <p className="page-sub">Questions about a product? Reach us here.</p>
      <dl className="contact">
        <dt>Email</dt>
        <dd>Imperium@impeStore.com</dd>
        <dt>Hours</dt>
        <dd>Monday to Friday, 09:00–17:00 (WIB)</dd>
      </dl>
    </>
  );
}
