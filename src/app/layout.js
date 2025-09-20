import './globals.css'

export const metadata = {
  title: "BLK Builders Group — Wind Resistance",
  description:
    "Hurricane-resistant, thermally and acoustically insulated construction. Modular, energy-saving housing in Florida.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header style={{ borderBottom: "1px solid #eee", padding: "12px 16px" }}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src="/blk-bluelogo.png"
                alt="BLK Builders Group logo"
                style={{ height: "150px", width: "auto" }}
              />
            </a>
            <span style={{ marginLeft: "auto" }} />
            <a href="/projects" style={{ textDecoration: "none" }}>Projects</a>
            <a href="/contact" style={{ textDecoration: "none" }}>Contact</a>
          </nav>
        </header>

        <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid #eee",
            padding: "24px 16px",
            textAlign: "center",
            color: "#666",
          }}
        >
          <small>© {new Date().getFullYear()} BLK Builders Group — Wind Resistance</small>
        </footer>
      </body>
    </html>
  );
}
