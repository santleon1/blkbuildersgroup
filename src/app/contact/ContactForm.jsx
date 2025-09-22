"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("Message sent ");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus(`Failed: ${data.error || res.statusText}`);
      }
    } catch (err) {
      setStatus("Failed to send. Check console/server.");
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520, display: "grid", gap: 12 }}>
      <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
      <input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
      <textarea rows={6} placeholder="Tell us about your project…" value={message} onChange={e=>setMessage(e.target.value)} required />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  setStatus("sending"); setError("");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message: msg }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); }
    catch { throw new Error(`Server returned ${res.status}: ${text.slice(0,200)}…`); }

    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || `Failed with ${res.status}`);
    }

    setStatus("ok");
    setName(""); setEmail(""); setMsg("");
  } catch (err) {
    setStatus("error");
    setError(err.message);
  }
}

