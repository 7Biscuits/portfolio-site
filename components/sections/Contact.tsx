"use client";

import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GITHUB_USERNAME, LINKEDIN_URL, EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/data";
import ScrollReveal from "../ui/ScrollReveal";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (!formData.name.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your email.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please write a message.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMessage(
          data.mock
            ? "Message logged to development console! (Mock mode)"
            : "Thank you! Your message has been sent successfully."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-3xl font-black text-brutal-coral leading-none mb-2">
            #07
          </span>
          <h2 className="text-4xl font-black tracking-tight uppercase text-[var(--text-primary)]">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Brutalist Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0}>
              <div className="bg-[var(--card)] border-4 border-black dark:border-white p-6 md:p-8 shadow-neo hover-brutal transition-all duration-150 text-left">
                <h3 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-6">
                  // dispatch message
                </h3>

                <div className="space-y-5">
              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name-input" className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Rudransh Srivastava"
                  className="w-full bg-[var(--canvas)] border-2 border-black dark:border-white rounded-none px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brutal-coral transition-all duration-150"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email-input" className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full bg-[var(--canvas)] border-2 border-black dark:border-white rounded-none px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brutal-coral transition-all duration-150"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message-input" className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message-input"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hey, let's build something cool..."
                  className="w-full bg-[var(--canvas)] border-2 border-black dark:border-white rounded-none px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brutal-coral transition-all duration-150 resize-none"
                  required
                />
              </div>

              {/* Status Alert Block */}
              {status !== "idle" && (
                <div
                  className={`flex items-start gap-3 p-4 border-2 ${
                    status === "success"
                      ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400"
                      : "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                  }`}
                >
                  {status === "success" ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs sm:text-sm font-bold">{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full font-mono text-xs font-bold tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white px-6 py-4 shadow-neo hover-brutal disabled:bg-neutral-700 disabled:text-neutral-400 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brutal-coral transition-all duration-150"
              >
                {loading ? "Transmitting..." : "Send Message"}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Right Column: Brutalist Coordinates Card */}
      <div className="lg:col-span-5">
        <ScrollReveal delay={150}>
          <div className="space-y-6">
            <h3 className="font-mono text-xs font-black tracking-widest text-brutal-coral uppercase mb-4">
              // direct coordinates
            </h3>

            <div className="bg-[var(--card)] border-4 border-black dark:border-white p-6 md:p-8 space-y-6 shadow-neo hover-brutal transition-all duration-150 text-left">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Feel free to drop a message in the contact form, reach out via direct coordinates, or explore my developer socials below.
              </p>

              <div className="space-y-4">
                {/* Email link */}
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-4 group p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-[var(--canvas)] transition-all duration-150"
                >
                  <div className="p-2.5 border-2 border-black dark:border-white bg-[var(--canvas)] group-hover:bg-brutal-coral group-hover:text-black text-[var(--text-primary)] transition-all duration-150 shadow-neo-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Email
                    </span>
                    <span className="block text-sm font-bold text-[var(--text-primary)] group-hover:text-brutal-coral transition-colors duration-150 break-all">
                      {EMAIL_ADDRESS}
                    </span>
                  </div>
                </a>

                {/* Phone Link */}
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}
                  className="flex items-center gap-4 group p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-[var(--canvas)] transition-all duration-150"
                >
                  <div className="p-2.5 border-2 border-black dark:border-white bg-[var(--canvas)] group-hover:bg-green-500 group-hover:text-black text-[var(--text-primary)] transition-all duration-150 shadow-neo-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      Mobile
                    </span>
                    <span className="block text-sm font-bold text-[var(--text-primary)] group-hover:text-brutal-coral transition-colors duration-150">
                      {PHONE_NUMBER}
                    </span>
                  </div>
                </a>
              </div>

              {/* Social links row */}
              <div className="border-t-2 border-black dark:border-white pt-6 flex gap-4">
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-white bg-[var(--canvas)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-neo-sm hover:bg-gray-500 hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-neo-sm transition-all duration-150"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-white bg-[var(--canvas)] text-xs font-mono font-bold text-[var(--text-primary)] shadow-neo-sm hover:bg-brutal-cyan hover:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_var(--border)] active:translate-x-0 active:translate-y-0 active:shadow-neo-sm transition-all duration-150"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

        </div>
      </div>
    </section>
  );
}
