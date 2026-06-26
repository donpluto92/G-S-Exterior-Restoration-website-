/* GS Restoration — ServiceLayout
   Shared layout for all individual service pages.
   Design: dark green + gold, Playfair Display headlines, Barlow body
*/
import { useEffect } from "react";
import Navbar from "./Navbar";
import { Phone, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import { faqSchema, localBusinessSchema, serviceSchema, useSeo } from "@/lib/seo";

interface ServiceLayoutProps {
  title: string;
  subtitle: string;
  metaDescription: string;
  heroImg: string;
  intro: string;
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { title: string; href: string }[];
  heroFeature?: {
    title: string;
    image: string;
    alt: string;
  };
}

export default function ServiceLayout({
  title,
  subtitle,
  metaDescription,
  heroImg,
  intro,
  benefits,
  process,
  faqs,
  relatedServices,
  heroFeature,
}: ServiceLayoutProps) {
  useEffect(() => {
    document.title = `${title} | G&S Exterior Restoration — Mexico, MO`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", metaDescription);
  }, [title, metaDescription]);

  const [path] = useLocation();

  useSeo({
    title: `${title} in Mexico, MO | G&S Exterior Restoration`,
    description: metaDescription,
    path,
    image: heroImg,
    schema: [
      localBusinessSchema,
      serviceSchema(title, metaDescription, path, heroImg),
      faqSchema(faqs, path),
    ],
  });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
            reveals.forEach((r, i) => {
              setTimeout(() => r.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.015 80)" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, oklch(0.15 0.06 155 / 0.95) 40%, oklch(0.15 0.06 155 / 0.6) 100%)" }}
        />
        <div className="container relative z-10">
          <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link href="/">
              <a
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-opacity hover:opacity-100 opacity-70"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.72 0.12 75)" }}
              >
                <ArrowLeft size={14} /> Back to Home
              </a>
            </Link>
            <div
              className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.72 0.12 75)",
                borderColor: "oklch(0.72 0.12 75 / 0.4)",
                backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
              }}
            >
              Mexico, MO &amp; Surrounding Areas
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] gap-10 items-end">
            <div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-2xl"
                style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.98 0.015 80)" }}
              >
                {title}
                <span className="block italic" style={{ color: "oklch(0.82 0.10 75)" }}>
                  {subtitle}
                </span>
              </h1>
              <p
                className="text-base max-w-xl mb-8 leading-relaxed"
                style={{ color: "oklch(0.80 0.025 80)", fontFamily: "'Barlow', sans-serif" }}
              >
                {intro}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold rounded-sm"
                >
                  <Clock size={15} className="inline mr-2" />
                  Book a Free Estimate
                </a>
                <a href="tel:3144670332" className="btn-outline-gold rounded-sm">
                  <Phone size={15} className="inline mr-2" />
                  (314) 467-0332
                </a>
              </div>
            </div>

            {heroFeature && (
              <figure
                className="rounded-lg overflow-hidden border shadow-2xl"
                style={{
                  backgroundColor: "oklch(0.12 0.04 155)",
                  borderColor: "oklch(0.72 0.12 75 / 0.35)",
                  boxShadow: "0 28px 80px oklch(0.08 0.03 155 / 0.45)",
                }}
              >
                <img
                  src={heroFeature.image}
                  alt={heroFeature.alt}
                  className="w-full aspect-[4/3] object-cover"
                />
                <figcaption
                  className="px-4 py-3 text-xs tracking-widest uppercase border-t"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    color: "oklch(0.82 0.10 75)",
                    borderColor: "oklch(0.72 0.12 75 / 0.25)",
                  }}
                >
                  {heroFeature.title}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 reveal-section" style={{ backgroundColor: "oklch(0.98 0.015 80)" }}>
        <div className="container">
          <h2
            className="reveal text-3xl sm:text-4xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.20 0.06 155)" }}
          >
            What's Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="reveal flex items-start gap-3 p-4 rounded-lg border"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  borderColor: "oklch(0.88 0.025 80)",
                  backgroundColor: "#fff",
                }}
              >
                <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "oklch(0.55 0.10 75)" }} />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.30 0.05 155)", fontFamily: "'Barlow', sans-serif" }}
                >
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 reveal-section" style={{ backgroundColor: "oklch(0.28 0.07 155)" }}>
        <div className="container">
          <h2
            className="reveal text-3xl sm:text-4xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.98 0.015 80)" }}
          >
            Our Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {process.map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="text-5xl font-bold mb-3 leading-none"
                  style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.72 0.12 75 / 0.35)" }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.98 0.015 80)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.75 0.025 80)", fontFamily: "'Barlow', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 reveal-section" style={{ backgroundColor: "oklch(0.93 0.02 80)" }}>
        <div className="container max-w-3xl">
          <h2
            className="reveal text-3xl sm:text-4xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.20 0.06 155)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="reveal rounded-lg p-6 border"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  backgroundColor: "#fff",
                  borderColor: "oklch(0.88 0.025 80)",
                }}
              >
                <h3
                  className="font-bold text-base mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.20 0.06 155)" }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.20 0.06 155)" }}>
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.98 0.015 80)",
              }}
            >
              Ready for an Estimate?
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "oklch(0.88 0.02 80)", fontFamily: "'Barlow', sans-serif" }}
            >
              Send a fast photo quote request on the homepage or book a free consultation directly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/#estimator"
                className="btn-gold rounded-sm"
              >
                Request Photo Quote
              </a>
              <a
                href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold rounded-sm"
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12" style={{ backgroundColor: "oklch(0.15 0.05 155)" }}>
        <div className="container">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, color: "oklch(0.65 0.04 155)" }}
          >
            Other Services
          </p>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link key={s.href} href={s.href}>
                <a
                  className="px-4 py-2 rounded border text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    borderColor: "oklch(0.35 0.08 155)",
                    color: "oklch(0.80 0.025 80)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.72 0.12 75)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.72 0.12 75)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.35 0.08 155)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.80 0.025 80)";
                  }}
                >
                  {s.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "oklch(0.15 0.05 155)", borderTop: "1px solid oklch(0.25 0.06 155)" }} className="py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/images/gs-logo.png"
            alt="G&S Exterior Restoration LLC"
            className="h-12 w-auto object-contain"
          />
          <div
            className="text-xs"
            style={{ color: "oklch(0.55 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
          >
            © 2026 G&S Exterior Restoration, LLC · Mexico, MO
          </div>
        </div>
      </footer>
    </div>
  );
}
