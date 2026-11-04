import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "ImpeStore",
  description: "A simple product showcase built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
