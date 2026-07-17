/* GS Restoration — Service Availability Page */
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  ArrowLeft,
  Camera,
} from "lucide-react";
import { Link } from "wouter";
import { localBusinessSchema, useSeo } from "@/lib/seo";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/hero-pressure-wash-5H7By3vYupAzNxdmLxcsg7.webp";

const areas = [
  {
    name: "Mexico, Missouri",
    description:
      "Our home base for siding washing, driveway and concrete cleaning, deck and patio cleaning, walkways, and exterior vehicle washing.",
  },
  {
    name: "Nearby Project Availability",
    description:
      "Travel outside Mexico depends on project size, distance, and scheduling. Contact us with the property address and project details to confirm availability.",
  },
];

const services = [
  { title: "Driveway Cleaning", href: "/driveway-cleaning" },
  { title: "Deck Cleaning", href: "/deck-cleaning" },
  { title: "Siding & Exterior Washing", href: "/siding-washing" },
  { title: "Vehicle Washing", href: "/vehicle-washing" },
];

export default function ServiceAreas() {
  useSeo({
    title: "Exterior Cleaning Service Availability | Mexico, Missouri",
    description:
      "G&S Exterior Restoration is an owner-operated exterior-cleaning company based in Mexico, Missouri. Travel availability depends on project size, distance, and scheduling.",
    path: "/service-areas",
    image: HERO_IMG,
    schema: localBusinessSchema,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
    document
      .querySelectorAll(".reveal-section")
      .forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.98 0.015 80)" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.15 0.06 155 / 0.95) 40%, oklch(0.15 0.06 155 / 0.6) 100%)",
          }}
        />
        <div className="container relative z-10">
          <Link href="/">
            <a
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-6 opacity-70 hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                color: "oklch(0.72 0.12 75)",
              }}
            >
              <ArrowLeft size={14} /> Back to Home
            </a>
          </Link>
          <div
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              color: "oklch(0.72 0.12 75)",
              borderColor: "oklch(0.72 0.12 75 / 0.4)",
              backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
            }}
          >
            <MapPin size={13} /> Where We Work
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-2xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.98 0.015 80)",
            }}
          >
            Service Areas
            <span
              className="block italic"
              style={{ color: "oklch(0.82 0.10 75)" }}
            >
              Based in Mexico, Missouri.
            </span>
          </h1>
          <p
            className="text-base max-w-xl mb-8 leading-relaxed"
            style={{
              color: "oklch(0.80 0.025 80)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            G&S Exterior Restoration provides owner-operated exterior cleaning
            in Mexico, Missouri. For projects outside Mexico, travel
            availability depends on the project size, distance, and schedule.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/#estimator" className="btn-gold rounded-sm">
              <Camera size={15} className="inline mr-2" />
              Request Photo Quote
            </a>
            <a href="tel:3144670332" className="btn-outline-gold rounded-sm">
              <Phone size={15} className="inline mr-2" />
              (314) 467-0332
            </a>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section
        className="py-20 reveal-section"
        style={{ backgroundColor: "oklch(0.98 0.015 80)" }}
      >
        <div className="container">
          <h2
            className="reveal text-3xl sm:text-4xl font-bold mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.20 0.06 155)",
            }}
          >
            Service Availability
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, i) => (
              <div
                key={area.name}
                className="reveal rounded-lg p-6 border"
                style={{
                  transitionDelay: `${i * 70}ms`,
                  backgroundColor: "#fff",
                  borderColor: "oklch(0.88 0.025 80)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} style={{ color: "oklch(0.55 0.10 75)" }} />
                  <h3
                    className="font-bold text-base"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: "oklch(0.20 0.06 155)",
                    }}
                  >
                    {area.name}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "oklch(0.45 0.04 155)",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          <div
            className="reveal mt-10 rounded-lg p-6 border-2 text-center"
            style={{
              borderColor: "oklch(0.72 0.12 75)",
              backgroundColor: "oklch(0.72 0.12 75 / 0.06)",
            }}
          >
            <p
              className="text-base font-bold"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.20 0.06 155)",
              }}
            >
              Have a project outside Mexico?{" "}
              <a href="tel:3144670332" style={{ color: "oklch(0.55 0.10 75)" }}>
                Call us at (314) 467-0332
              </a>{" "}
              — share the address and project details to check availability.
            </p>
          </div>
        </div>
      </section>

      {/* Services in these areas */}
      <section
        className="py-20 reveal-section"
        style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
      >
        <div className="container">
          <h2
            className="reveal text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.98 0.015 80)",
            }}
          >
            Exterior Cleaning Services
          </h2>
          <p
            className="reveal text-base mb-10"
            style={{
              color: "oklch(0.80 0.025 80)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Project availability is confirmed during the estimate. Every listed
            service includes a free estimate.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <Link key={s.href} href={s.href}>
                <a
                  className="reveal flex items-center gap-3 p-4 rounded-lg border transition-colors duration-200 group"
                  style={{
                    transitionDelay: `${i * 70}ms`,
                    backgroundColor: "oklch(0.20 0.06 155)",
                    borderColor: "oklch(0.35 0.08 155)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.72 0.12 75)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "oklch(0.35 0.08 155)";
                  }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: "oklch(0.72 0.12 75)", flexShrink: 0 }}
                  />
                  <span
                    className="text-sm font-bold"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      color: "oklch(0.98 0.015 80)",
                    }}
                  >
                    {s.title}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        <div className="container text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "oklch(0.98 0.015 80)",
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="text-base mb-8 max-w-lg mx-auto"
            style={{
              color: "oklch(0.80 0.025 80)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Request a photo quote, schedule an on-site estimate, or call or text
            to discuss the project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/booking" className="btn-gold rounded-sm">
              <Clock size={15} className="inline mr-2" />
              Schedule On-Site Estimate
            </a>
            <a href="tel:3144670332" className="btn-outline-gold rounded-sm">
              <Phone size={15} className="inline mr-2" />
              (314) 467-0332
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "oklch(0.15 0.05 155)",
          borderTop: "1px solid oklch(0.25 0.06 155)",
        }}
        className="py-8"
      >
        <div className="container flex items-center justify-center">
          <div
            className="text-xs"
            style={{
              color: "oklch(0.55 0.04 155)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            © 2026 G&S Exterior Restoration, LLC · Mexico, Missouri
          </div>
        </div>
      </footer>
    </div>
  );
}
