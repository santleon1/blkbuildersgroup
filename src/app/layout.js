"use client";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#f5f5f5",
          color: "#000",
          fontFamily: "sans-serif",
          margin: 0,
        }}
      >
        {/* --- HEADER --- */}
        <header
          style={{
            backgroundColor: "#0c1b45",
            padding: "16px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/blk-bluelogo.png"
              alt="BLK Builders Group"
              width={260}          // width gives Next.js a base size
              height={0}           // height 0 lets width & style control aspect
              style={{
                width: "260px",    // make the logo nice and big
                height: "auto",    // keep proper proportions
              }}
              priority
            />
          </Link>

          <nav style={{ display: "flex", gap: "28px" }}>
            <Link
              href="/projects"
              style={{ color: "#fff", fontWeight: "bold", textDecoration: "none" }}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              style={{ color: "#fff", fontWeight: "bold", textDecoration: "none" }}
            >
              Contact
            </Link>
          </nav>
        </header>

        {/* --- MAIN CONTENT --- */}
        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px" }}>
          {children}
  icons: {
    icon: "/sello BLK.PNG",   // or "/favicon.png" if you used PNG
  },

        </main>
      </body>
    </html>
  );
}
