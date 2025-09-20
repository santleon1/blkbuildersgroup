import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "BLK Builders Group — Wind Resistance",
  description:
    "Hurricane-resistant, thermally and acoustically insulated construction. Modular, energy-saving housing in Florida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ margin: 0, fontFamily: "system-ui, sans-serif", color: "#111" }}>
        <header style={{ borderBottom: "1px solid #eee", padding: "12px 16px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
            {/* Home link */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
              {/* You can keep <img>, but <Image> is preferred */}
              <Image
                src="/blk-logo.jpg"
                alt="BLK Builders Group logo"
                width={180}
                height={48}
                priority
                style={{ height: "48px", width: "auto" }}
              />
            </Link>

            <span style={{ marginLeft: "auto" }} />

            {/* Internal links */}
            <Link href="/projects" style={{ textDecoration: "none", color: "inherit" }}>
              Projects
            </Link>
            <Link href="/contact" style={{ textDecoration: "none", color: "inherit" }}>
              Contact
            </Link>
          </nav>
        </header>

        <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>{children}</main>

        <footer style={{ borderTop: "1px solid #eee", padding: "24px 16px", textAlign: "center", color: "#666" }}>
          <small>© {new Date().getFullYear()} BLK Builders Group — Wind Resistance</small>
        </footer>
      </body>
    </html>
  );
}
