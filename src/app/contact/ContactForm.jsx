"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); }
      catch { throw new Error(`Server returned ${res.status}: ${text.slice(0,200)}…`); }

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Failed with ${res.status}`);
      }

      setStatus("ok");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send");
      console.error(err);
    }
  }

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Contact Us</h1>

      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: 520, display: "grid", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 10 }}
        />
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10 }}
        />
        <textarea
          rows={6}
          placeholder="Tell us about your project…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ width: "100%", padding: 10 }}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          style={{ width: "100%", padding: "10px 16px" }}
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>

        {status === "ok" && (
          <p style={{ color: "green", marginTop: 8 }}>Message sent </p>
        )}
        {status === "error" && (
          <p style={{ color: "crimson", marginTop: 8 }}>{error}</p>
        )}
      </form>
    </main>
  );
}
