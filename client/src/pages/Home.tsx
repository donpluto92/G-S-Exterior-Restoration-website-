/* GS Restoration — Home Page
   Design: Premium Trades Brand — dark forest green + gold
   Sections: Navbar, Hero, Trust Bar, Services, About, Why Us, Contact, Footer
   Fonts: Playfair Display (headlines) + Barlow (body) + Barlow Condensed (labels/CTAs)
*/
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Star,
  CheckCircle,
  Droplets,
  Home,
  Car,
  Layers,
  ChevronDown,
  Facebook,
  Instagram,
  Clock,
  Quote,
} from "lucide-react";
import { Link } from "wouter";

// Image URLs from generated assets
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/hero-pressure-wash-5H7By3vYupAzNxdmLxcsg7.webp";
const DRIVEWAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/driveway-clean-miGtpBbYzGprrMxfiHWwZF.webp";
const DECK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/deck-clean-gknHjniPv6K2enyENyo566.webp";
const SIDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/siding-clean-dk8VDGPUe5sPbznsNs5D65.webp";
const VEHICLE_IMG = "/images/vehicle-wash.jpg";

// Scroll reveal hook inline
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".reveal");
            reveals.forEach((r, i) => {
              setTimeout(() => r.classList.add("visible"), i * 80);
            });
            if ((entry.target as HTMLElement).classList.contains("reveal")) {
              (entry.target as HTMLElement).classList.add("visible");
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const services = [
  {
    icon: Droplets,
    href: "/driveway-cleaning",
    title: "Driveway Cleaning Mexico, MO",
    description:
      "Professional driveway pressure washing in Mexico, Missouri and Mid-Missouri. Remove dirt, algae, grime, and oil stains from concrete. Free estimates. Fully insured.",
    img: DRIVEWAY_IMG,
    tag: "Most Popular",
  },
  {
    icon: Home,
    href: "/deck-cleaning",
    title: "Deck Cleaning Mexico, MO",
    description:
      "Expert deck cleaning and pressure washing in Mexico, Missouri. Remove algae, mildew, and weathering from wood and composite decks. Safe, professional service.",
    img: DECK_IMG,
    tag: null,
  },
  {
    icon: Layers,
    href: "/siding-washing",
    title: "House Washing & Siding Cleaning",
    description:
      "Professional house washing and siding cleaning in Mid-Missouri. Soft wash service removes mold, mildew, and algae safely from vinyl, brick, and stucco.",
    img: SIDING_IMG,
    tag: null,
  },
  {
    icon: Car,
    href: "/vehicle-washing",
    title: "Vehicle Pressure Washing",
    description:
      "Professional vehicle washing for cars and trucks in Mexico, MO. Remove road salt, grime, and buildup. Keep your fleet looking professional.",
    img: VEHICLE_IMG,
    tag: null,
  },
];

const trustItems = [
  { icon: Shield, label: "Fully Insured" },
  { icon: Star, label: "Free Estimates" },
  { icon: CheckCircle, label: "Satisfaction Guaranteed" },
  { icon: Clock, label: "Book Online 24/7" },
];

const whyUs = [
  {
    title: "Honest Pricing",
    description:
      "No hidden fees, no surprises. Every job starts with a free estimate so you know exactly what to expect before we begin.",
  },
  {
    title: "Local & Dependable",
    description:
      "We're your neighbors in Mexico, MO. We show up on time, do the job right, and stand behind our work every single time.",
  },
  {
    title: "Safe for Your Property",
    description:
      "We use the right pressure and techniques for each surface — no unnecessary force that could damage siding, wood, or paint.",
  },
  {
    title: "Results You Can See",
    description:
      "From the street to the backyard, we deliver a transformation you'll notice immediately. Clean exteriors, year-round.",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useReveal();
  const servicesRef = useReveal();
  const aboutRef = useReveal();
  const whyRef = useReveal();
  const contactRef = useReveal();

  // Parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const bg = heroRef.current.querySelector(".hero-bg") as HTMLElement;
        if (bg) bg.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.98 0.015 80)" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        {/* Background image with parallax */}
        <div
          className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.15 0.06 155 / 0.88) 0%, oklch(0.15 0.06 155 / 0.60) 55%, oklch(0.15 0.06 155 / 0.30) 100%)",
          }}
        />

        {/* Content */}
        <div className="container relative z-10 pt-24 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
              style={{
                borderColor: "oklch(0.72 0.12 75 / 0.5)",
                backgroundColor: "oklch(0.72 0.12 75 / 0.12)",
              }}
            >
              <MapPin size={13} style={{ color: "oklch(0.72 0.12 75)" }} />
              <span
                className="text-xs sm:text-sm tracking-widest uppercase font-bold"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                }}
              >
                Driveway • Deck • Siding • Vehicle Washing
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.98 0.015 80)",
              }}
            >
              Professional Pressure Washing in
              <span
                className="block italic"
                style={{ color: "oklch(0.82 0.10 75)" }}
              >
                Mexico, Missouri
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ color: "oklch(0.88 0.02 80)", fontFamily: "'Barlow', sans-serif" }}
            >
              We've been restoring homes and businesses across Mexico, Missouri for years. Whether your driveway needs cleaning, your deck has algae buildup, your siding looks weathered, or your vehicle needs a refresh—we handle it all with care. Fully insured, fully professional, and always honest about what we can do for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9" target="_blank" rel="noopener noreferrer" className="btn-gold rounded-sm">
                <Clock size={16} className="inline mr-2" />
                Book a Free Estimate
              </a>
              <button
                onClick={() => scrollTo("#services")}
                className="btn-outline-gold rounded-sm"
              >
                View Our Services
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo("#trust")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "oklch(0.82 0.10 75)" }}
          aria-label="Scroll down"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}
          >
            Scroll
          </span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ── TRUST BAR ── */}
      <section
        id="trust"
        ref={trustRef}
        style={{ backgroundColor: "oklch(0.72 0.12 75)", borderTop: "1px solid oklch(0.60 0.10 75)", borderBottom: "1px solid oklch(0.60 0.10 75)" }}
        className="py-5"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item, i) => (
              <div
                key={item.label}
                className="reveal flex items-center justify-center gap-3 py-2"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <item.icon
                  size={20}
                  style={{ color: "oklch(0.20 0.06 155)", flexShrink: 0 }}
                />
                <span
                  className="font-bold text-sm tracking-wide uppercase"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    color: "oklch(0.20 0.06 155)",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        ref={servicesRef}
        className="py-24"
        style={{ backgroundColor: "oklch(0.98 0.015 80)", borderTop: "1px solid oklch(0.92 0.004 286.32)", borderBottom: "1px solid oklch(0.92 0.004 286.32)" }}
      >
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16">
            <div
              className="reveal inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.72 0.12 75)",
                backgroundColor: "oklch(0.72 0.12 75 / 0.1)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              What We Do
            </div>
            <h2
              className="reveal text-4xl sm:text-5xl font-bold mt-2 mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.20 0.06 155)",
              }}
            >
              Pressure Washing &amp; Exterior Cleaning
            </h2>
            <p
              className="reveal text-base max-w-xl mx-auto"
              style={{ color: "oklch(0.45 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
            >
              Professional pressure washing and soft washing services in Mexico, MO and Mid-Missouri. Free estimates on all services. Fully insured and certified.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="reveal service-card rounded-lg overflow-hidden border flex flex-col"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderColor: "oklch(0.88 0.025 80)",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 12px rgba(26, 58, 42, 0.08)",
                }}
              >
                {/* Image or gradient fallback */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  {service.img ? (
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.28 0.07 155), oklch(0.20 0.06 155))",
                      }}
                    >
                      <service.icon size={48} style={{ color: "oklch(0.72 0.12 75)" }} />
                    </div>
                  )}
                  {service.tag && (
                    <div
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-bold tracking-wide uppercase"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        backgroundColor: "oklch(0.72 0.12 75)",
                        color: "oklch(0.20 0.06 155)",
                      }}
                    >
                      {service.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <service.icon size={18} style={{ color: "oklch(0.72 0.12 75)" }} />
                    <h3
                      className="font-bold text-base"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        color: "oklch(0.20 0.06 155)",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: "oklch(0.45 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                  >
                    {service.description}
                  </p>
                  <Link href={service.href}>
                    <a
                      className="mt-4 text-xs font-bold tracking-widest uppercase flex items-center gap-1 transition-colors duration-200"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.28 0.07 155)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "oklch(0.72 0.12 75)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "oklch(0.28 0.07 155)")
                      }
                    >
                      Learn More →
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Free estimate banner */}
          <div
            className="reveal mt-12 rounded-lg p-6 text-center border-2"
            style={{
              borderColor: "oklch(0.72 0.12 75)",
              backgroundColor: "oklch(0.72 0.12 75 / 0.06)",
            }}
          >
            <p
              className="text-xl font-bold"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "oklch(0.20 0.06 155)",
              }}
            >
              All Services Include a{" "}
              <span style={{ color: "oklch(0.55 0.10 75)" }}>Free Estimate</span>
              {" "}— No Obligation
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        ref={aboutRef}
        className="py-24"
        style={{ backgroundColor: "oklch(0.20 0.06 155)", borderTop: "1px solid oklch(0.35 0.08 155)", borderBottom: "1px solid oklch(0.35 0.08 155)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <div
                className="reveal inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  color: "oklch(0.72 0.12 75)",
                  borderColor: "oklch(0.72 0.12 75 / 0.4)",
                  backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
                }}
              >
                About Us
              </div>
              <h2
                className="reveal text-4xl sm:text-5xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.98 0.015 80)",
                }}
              >
                Honest Work.
                <span
                  className="block italic"
                  style={{ color: "oklch(0.82 0.10 75)" }}
                >
                  Dependable Service.
                </span>
              </h2>
              <p
                className="reveal text-base leading-relaxed mb-4"
                style={{
                  color: "oklch(0.80 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                G&S Exterior Restoration is a fully insured pressure washing
                business proudly serving Mexico, MO and the surrounding communities.
                We specialize in driveway cleaning, siding washing, deck cleaning,
                patio cleaning, vehicle washing, and more.
              </p>
              <p
                className="reveal text-base leading-relaxed mb-8"
                style={{
                  color: "oklch(0.80 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                We know how much of a difference clean concrete, siding, and
                outdoor spaces can make. Our exterior cleaning services are
                designed to improve curb appeal, refresh the look of your
                property, and help your home look well maintained year-round.
                At G&S, we believe in honest work, dependable service, and
                results you can see from the street.
              </p>
              <div className="reveal flex flex-wrap gap-4">
                <a href="tel:3144670332" className="btn-gold rounded-sm">
                  <Phone size={15} className="inline mr-2" />
                  Call Us Today
                </a>
                <a
                  href="mailto:contact@gsrestoration.net"
                  className="btn-outline-gold rounded-sm"
                >
                  <Mail size={15} className="inline mr-2" />
                  Send an Email
                </a>
              </div>
            </div>

            {/* Right: stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "100%", label: "Fully Insured", sub: "Every job, every time" },
                { value: "$0", label: "Estimate Cost", sub: "Free quotes always" },
                { value: "24/7", label: "Book Online", sub: "Anytime, any device" },
                { value: "MO", label: "Mexico & Beyond", sub: "Proudly local" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="reveal rounded-lg p-6 border"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    backgroundColor: "oklch(0.28 0.07 155)",
                    borderColor: "oklch(0.35 0.08 155)",
                  }}
                >
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "oklch(0.72 0.12 75)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm font-bold tracking-wide uppercase mb-1"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "oklch(0.98 0.015 80)",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.65 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(0.20 0.06 155)", borderTop: "1px solid oklch(0.35 0.08 155)", borderBottom: "1px solid oklch(0.35 0.08 155)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <div
              className="inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.72 0.12 75)",
                borderColor: "oklch(0.72 0.12 75 / 0.4)",
                backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
              }}
            >
              Customer Reviews
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mt-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.98 0.015 80)" }}
            >
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Mexico, MO",
                review: "G&S did an incredible job on our driveway. It looks brand new — I couldn't believe the difference. They were on time, professional, and the price was very fair. Will definitely use them again.",
                service: "Driveway Cleaning",
              },
              {
                name: "Tom R.",
                location: "Mexico, MO",
                review: "Our deck had years of algae and mildew buildup and I was worried it was beyond saving. G&S had it looking like new in a couple of hours. Highly recommend to anyone in the area.",
                service: "Deck Cleaning",
              },
              {
                name: "Linda K.",
                location: "Centralia, MO",
                review: "The siding on our house had black streaks all the way across the front. After G&S washed it, the whole house looked freshly painted. Fantastic work and great communication throughout.",
                service: "Siding Washing",
              },
            ].map((review, i) => (
              <div
                key={review.name}
                className="rounded-xl p-6 border flex flex-col"
                style={{
                  backgroundColor: "oklch(0.28 0.07 155)",
                  borderColor: "oklch(0.35 0.08 155)",
                  boxShadow: "0 8px 24px rgba(26, 58, 42, 0.12)",
                }}
              >
                <Quote size={28} className="mb-4 opacity-40" style={{ color: "oklch(0.72 0.12 75)" }} />
                <p
                  className="text-sm leading-relaxed flex-1 mb-6 italic"
                  style={{ color: "oklch(0.85 0.02 80)", fontFamily: "'Barlow', sans-serif" }}
                >
                  &ldquo;{review.review}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-bold text-sm"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.98 0.015 80)" }}
                    >
                      {review.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.65 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                    >
                      {review.location}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} fill="oklch(0.72 0.12 75)" style={{ color: "oklch(0.72 0.12 75)" }} />
                    ))}
                  </div>
                </div>
                <div
                  className="mt-3 pt-3 border-t text-xs"
                  style={{ borderColor: "oklch(0.35 0.08 155)", color: "oklch(0.55 0.04 155)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  {review.service}
                </div>
              </div>
            ))}
          </div>
          </div>

        </div>
      </section>

      {/* ── WHY US ── */}
      <section
        ref={whyRef}
        className="py-24"
        style={{ backgroundColor: "oklch(0.93 0.02 80)", borderTop: "1px solid oklch(0.92 0.004 286.32)", borderBottom: "1px solid oklch(0.92 0.004 286.32)" }}
      >
        <div className="container">
          <div className="text-center mb-14">
            <div
              className="reveal inline-block text-xs tracking-widest uppercase mb-3 px-3 py-1 rounded-full border"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                color: "oklch(0.55 0.10 75)",
                borderColor: "oklch(0.72 0.12 75 / 0.4)",
                backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
              }}
            >
              Why Choose Us
            </div>
            <h2
              className="reveal text-4xl sm:text-5xl font-bold mt-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.20 0.06 155)",
              }}
            >
              The G&S Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="reveal rounded-lg p-6 border"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: "#fff",
                  borderColor: "oklch(0.88 0.025 80)",
                  boxShadow: "0 4px 12px rgba(26, 58, 42, 0.08)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.72 0.12 75 / 0.15)" }}
                >
                  <CheckCircle size={20} style={{ color: "oklch(0.55 0.10 75)" }} />
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    color: "oklch(0.20 0.06 155)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24"
        style={{ backgroundColor: "oklch(0.20 0.06 155)", borderTop: "1px solid oklch(0.35 0.08 155)", borderBottom: "1px solid oklch(0.35 0.08 155)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: contact info */}
            <div>
              <div
                className="reveal inline-block text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full border"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  color: "oklch(0.72 0.12 75)",
                  borderColor: "oklch(0.72 0.12 75 / 0.4)",
                  backgroundColor: "oklch(0.72 0.12 75 / 0.08)",
                }}
              >
                Get In Touch
              </div>
              <h2
                className="reveal text-4xl sm:text-5xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.98 0.015 80)",
                }}
              >
                Ready for a
                <span
                  className="block italic"
                  style={{ color: "oklch(0.82 0.10 75)" }}
                >
                  Free Estimate?
                </span>
              </h2>
              <p
                className="reveal text-base leading-relaxed mb-10"
                style={{
                  color: "oklch(0.80 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                Call, text, email, or book online — we're available 24/7.
                We'll get back to you quickly with a no-obligation estimate
                for your project.
              </p>

              <div className="reveal flex flex-col gap-6">
                <a
                  href="tel:3144670332"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-opacity-100"
                    style={{ backgroundColor: "oklch(0.72 0.12 75 / 0.15)" }}
                  >
                    <Phone size={20} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-0.5"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        color: "oklch(0.65 0.04 155)",
                      }}
                    >
                      Phone / Text
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.98 0.015 80)",
                      }}
                    >
                      (314) 467-0332
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:contact@gsrestoration.net"
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.12 75 / 0.15)" }}
                  >
                    <Mail size={20} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-0.5"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        color: "oklch(0.65 0.04 155)",
                      }}
                    >
                      Email
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.98 0.015 80)",
                      }}
                    >
                      contact@gsrestoration.net
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.12 75 / 0.15)" }}
                  >
                    <MapPin size={20} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-widest uppercase mb-0.5"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 600,
                        color: "oklch(0.65 0.04 155)",
                      }}
                    >
                      Service Area
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.98 0.015 80)",
                      }}
                    >
                      Mexico, MO &amp; Surrounding Areas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Google Calendar booking */}
          <div
            className="reveal rounded-xl p-8 border flex flex-col"
            style={{
              backgroundColor: "oklch(0.20 0.06 155)",
              borderColor: "oklch(0.35 0.08 155)",
            }}
          >
            <h3
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.98 0.015 80)",
              }}
            >
              Book Your Free Estimate
            </h3>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: "oklch(0.75 0.025 80)", fontFamily: "'Barlow', sans-serif" }}
            >
              Pick a time that works for you and it goes straight to our calendar.
              We'll confirm and show up ready to work.
            </p>

            {/* Booking steps */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { step: "01", label: "Choose a date & time", sub: "Pick any available slot on our calendar" },
                { step: "02", label: "Add your details", sub: "Name, address, and service needed" },
                { step: "03", label: "We confirm & show up", sub: "You'll get a confirmation — we handle the rest" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div
                    className="text-2xl font-bold leading-none flex-shrink-0 w-10"
                    style={{ fontFamily: "'Playfair Display', serif", color: "oklch(0.72 0.12 75 / 0.4)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div
                      className="text-sm font-bold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "oklch(0.98 0.015 80)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "oklch(0.65 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold rounded-sm text-center block"
            >
              <Clock size={15} className="inline mr-2" />
              Schedule on Google Calendar
            </a>

            <div
              className="mt-4 pt-4 border-t text-center"
              style={{ borderColor: "oklch(0.35 0.08 155)" }}
            >
              <p
                className="text-xs"
                style={{ color: "oklch(0.55 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
              >
                Prefer to call or text?{" "}
                <a href="tel:3144670332" style={{ color: "oklch(0.72 0.12 75)" }}>
                  (314) 467-0332
                </a>
              </p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── INSTANT ESTIMATOR ── */}
      <section
        id="estimator"
        style={{ backgroundColor: "oklch(0.98 0.015 80)" }}
        className="py-20 border-t"
      >
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.15 0.05 155)",
                }}
              >
                Get Your Instant Estimate
              </h2>
              <p
                className="text-lg"
                style={{ color: "oklch(0.35 0.08 155)", fontFamily: "'Barlow', sans-serif" }}
              >
                Upload photos and get an instant estimate. Our system analyzes your surfaces and provides accurate pricing in seconds.
              </p>
            </div>

            {/* Estimator Widget */}
            <div
              className="rounded-lg overflow-hidden"
              style={{
                backgroundColor: "oklch(0.20 0.06 155)",
                border: "1px solid oklch(0.35 0.08 155)",
              }}
            >
              <iframe
                src="https://gsestimate-fdxeg6d2.manus.space/widget"
                width="100%"
                height="800"
                frameBorder="0"
                style={{ border: "none", borderRadius: "12px" }}
                title="G&S Exterior Restoration — Instant Estimate"
                allow="camera"
              />
            </div>

            {/* Disclaimer */}
            <div
              className="mt-6 text-center text-xs"
              style={{ color: "oklch(0.55 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
            >
              <p>
                <strong>Disclaimer:</strong> The estimate provided by this tool is an approximation based on the information and photos you provide. It is not a final estimate. Actual pricing may vary based on on-site inspection, surface condition, accessibility, and other factors. Please contact us for a detailed, binding quote.
              </p>
            </div>

            {/* Info Below Widget */}
            <div
              className="mt-12 p-8 rounded-lg border"
              style={{
                backgroundColor: "oklch(0.95 0.01 80)",
                borderColor: "oklch(0.35 0.08 155)",
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.15 0.05 155)",
                }}
              >
                How It Works
              </h3>
              <ol
                className="space-y-3 text-base"
                style={{ color: "oklch(0.35 0.08 155)", fontFamily: "'Barlow', sans-serif" }}
              >
                <li><strong>1. Upload Photos:</strong> Take clear photos of the area you want cleaned</li>
                <li><strong>2. AI Analysis:</strong> Our system analyzes surface type, size, and condition</li>
                <li><strong>3. Instant Quote:</strong> Get an accurate estimate immediately</li>
                <li><strong>4. Book or Contact:</strong> Schedule your service or reach out with questions</li>
              </ol>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(0.55 0.04 155)", fontFamily: "'Barlow', sans-serif" }}
              >
                Questions? Call us at{" "}
                <a href="tel:3144670332" style={{ color: "oklch(0.72 0.12 75)", fontWeight: "bold" }}>
                  (314) 467-0332
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{ backgroundColor: "oklch(0.15 0.05 155)" }}
        className="py-10"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="text-center md:text-left">
              <img
                src="/images/gs-logo.png"
                alt="G&S Exterior Restoration LLC"
                className="h-16 w-auto object-contain"
              />
              <div
                className="text-xs tracking-widest uppercase mt-1"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                Proudly Serving Mexico, MO &amp; Surrounding Areas
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.72 0.12 75)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.28 0.07 155)")
                }
                aria-label="Facebook"
              >
                <Facebook size={16} style={{ color: "oklch(0.98 0.015 80)" }} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.72 0.12 75)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.28 0.07 155)")
                }
                aria-label="Instagram"
              >
                <Instagram size={16} style={{ color: "oklch(0.98 0.015 80)" }} />
              </a>
            </div>

            {/* Copyright */}
            <div
              className="text-xs text-center md:text-right"
              style={{
                color: "oklch(0.55 0.04 155)",
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              © 2026 G&S Exterior Restoration, LLC. All rights reserved.
            </div>
          </div>

          {/* Gold divider */}
          <div className="gold-divider mt-8 opacity-40" />
        </div>
      </footer>
    </div>
  );
}
