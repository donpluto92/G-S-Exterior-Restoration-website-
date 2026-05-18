/* GS Restoration — Service Areas Page
   Local SEO page targeting Mexico MO and surrounding Audrain County communities
*/
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { MapPin, Phone, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/hero-pressure-wash-5H7By3vYupAzNxdmLxcsg7.webp";

const areas = [
  {
    name: "Mexico, MO",
    description:
      "Our home base. We serve all neighborhoods in Mexico, MO for driveway cleaning, deck washing, siding washing, and vehicle washing.",
  },
  {
    name: "Audrain County, MO",
    description:
      "We cover all of Audrain County including rural properties, farms, and residential communities throughout the county.",
  },
  {
    name: "Centralia, MO",
    description:
      "Professional pressure washing services available in Centralia and surrounding Boone County communities.",
  },
  {
    name: "Vandalia, MO",
    description:
      "Serving Vandalia and the surrounding Audrain County area with exterior cleaning services.",
  },
  {
    name: "Fulton, MO",
    description:
      "We travel to Fulton and Callaway County for larger jobs and regular customers.",
  },
  {
    name: "Columbia, MO",
    description:
      "Available for select jobs in the Columbia area. Contact us to discuss your project.",
  },
];

const services = [
  { title: "Driveway Cleaning", href: "/driveway-cleaning" },
  { title: "Deck Cleaning", href: "/deck-cleaning" },
  { title: "Siding & Exterior Washing", href: "/siding-washing" },
  { title: "Vehicle Washing", href: "/vehicle-washing" },
];

export default function ServiceAreas() {
  useEffect(() => {
    document.title =
      "Service Areas | G&S Exterior Restoration — Mexico, MO & Surrounding Areas";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "G&S Exterior Restoration serves Mexico, MO and surrounding communities in Audrain County, Centralia, Vandalia, Fulton, and more. Professional pressure washing — free estimates."
      );
  }, []);

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
              Mexico, MO &amp; Beyond.
            </span>
          </h1>
          <p
            className="text-base max-w-xl mb-8 leading-relaxed"
            style={{
              color: "oklch(0.80 0.025 80)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            G&S Exterior Restoration is based in Mexico, MO and proudly serves
            homeowners and businesses throughout Audrain County and the
            surrounding communities. Not sure if we cover your area? Give us a
            call.
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
            Communities We Serve
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
              Don't see your city?{" "}
              <a href="tel:3144670332" style={{ color: "oklch(0.55 0.10 75)" }}>
                Call us at (314) 467-0332
              </a>{" "}
              — we may still be able to help.
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
            Services Available in All Areas
          </h2>
          <p
            className="reveal text-base mb-10"
            style={{
              color: "oklch(0.80 0.025 80)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            Every service we offer is available throughout our service area. All
            jobs include a free estimate.
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
            Book a free estimate online or give us a call. We'll get back to you
            quickly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-sm"
            >
              <Clock size={15} className="inline mr-2" />
              Book on Google Calendar
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
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src="/images/gs-logo.png"
            alt="G&S Exterior Restoration LLC"
            className="h-12 w-auto object-contain"
          />
          <div
            className="text-xs"
            style={{
              color: "oklch(0.55 0.04 155)",
              fontFamily: "'Barlow', sans-serif",
            }}
          >
            © 2026 G&S Exterior Restoration, LLC · Mexico, MO
          </div>
        </div>
      </footer>
    </div>
  );
}
