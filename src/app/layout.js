// src/app/layout.js
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "BLK Builders Group — Wind Resistance",
  description: "Hurricane-resistant homes for Florida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="logo" aria-label="BLK Builders Group home">
            <Image
              src="/blk-bluelogo.png"         // ← use the PNG
              alt="BLK Builders Group — Wind Resistance"
              width={220}                      // ← increase size as needed
              height={72}
              priority
            />
          </Link>

          <nav className="main-nav" aria-label="Primary">
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}

