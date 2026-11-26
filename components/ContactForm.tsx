"use client";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
export function ContactForm() {
  const [status, setStatus] = useState(""),
    [sending, setSending] = useState(false);
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setSending(true);
    setStatus("Sending…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok || (await response.json()).saved !== true) throw Error();
      form.reset();
      setStatus(
        "Your message has been saved for Shashank. Thank you for reaching out.",
      );
    } catch {
      setStatus(
        "Your message could not be saved. Please retry or reach out on LinkedIn.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <section id="contact">
      <small>CONTACT</small>
      <h2>
        Let’s build something
        <br />
        <em>meaningful together.</em>
      </h2>
      <p>
        I’m open to software development and AI/ML internships, startup projects
        and technical collaborations.
      </p>
      <a href={profile.links.LinkedIn}>Connect on LinkedIn</a>
      <form onSubmit={send}>
        {[
          ["Full name", "name"],
          ["Email", "email"],
          ["Company (optional)", "company"],
          ["Subject", "subject"],
        ].map(([label, key]) => (
          <label key={key}>
            {label}
            <input
              required={key !== "company"}
              maxLength={240}
              type={key === "email" ? "email" : "text"}
              name={key}
            />
          </label>
        ))}
        <label>
          Message
          <textarea name="message" required maxLength={5000} rows={4} />
        </label>
        <button className="button" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
      </form>
      <p role="status">{status}</p>
    </section>
  );
}
