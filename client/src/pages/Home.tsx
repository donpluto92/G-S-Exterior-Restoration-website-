/* GS Restoration — Home Page
   Design: Premium Trades Brand — dark forest green + gold
   Sections: Navbar, Hero, Trust Bar, Services, About, Why Us, Contact, Footer
   Fonts: Playfair Display (headlines) + Barlow (body) + Barlow Condensed (labels/CTAs)
*/
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AIEstimator from "@/components/AIEstimator";
import CertificationBanner from "@/components/CertificationBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
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
  Camera,
  UserRound,
  Footprints,
} from "lucide-react";
import { Link } from "wouter";
import { localBusinessSchema, useSeo, websiteSchema } from "@/lib/seo";

// Site-owned image assets avoid relying on expiring third-party URLs.
const HERO_IMG = "/images/hero-pressure-washing.webp";
const DRIVEWAY_IMG = "/images/driveway-cleaning.webp";
const DECK_IMG = "/images/deck-pressure-washing.webp";
const SIDING_IMG = "/images/siding-washing-before-after.webp";
const WALKWAY_IMG = "/images/walkway-cleaning.webp";
const VEHICLE_IMG = "/images/vehicle-wash.jpg";

const projectResults = [
  {
    title: "Siding Cleaning",
    description:
      "Organic growth and surface buildup removed from white siding.",
    image: "/images/siding-growth-before-after.webp",
    alt: "Before and after siding cleaning showing organic growth removed from white siding between two windows",
    width: 1371,
    height: 1148,
  },
  {
    title: "Composite Deck Cleaning",
    description:
      "Leaves, dirt, and surface buildup removed from gray composite decking.",
    image: "/images/deck-cleaning-before-after.webp",
    alt: "Before and after composite deck cleaning showing leaves, dirt, and surface buildup removed",
    width: 1200,
    height: 1200,
  },
  {
    title: "House Siding Wash",
    description:
      "Widespread organic growth removed from the rear exterior siding.",
    image: "/images/siding-washing-before-after.webp",
    alt: "Before and after house siding wash showing widespread organic growth removed from white siding",
    width: 1200,
    height: 1200,
  },
  {
    title: "Exterior Siding Cleaning",
    description:
      "Heavy organic growth removed from tan siding for a brighter, cleaner exterior.",
    image: "/images/tan-siding-before-after.webp",
    alt: "Before and after exterior cleaning showing heavy organic growth removed from tan house siding",
    width: 1080,
    height: 1350,
  },
];

// Scroll reveal hook inline
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
    icon: Home,
    href: "/siding-washing",
    titleKey: "sidingTitle",
    descKey: "sidingDesc",
    img: SIDING_IMG,
    tag: null,
  },
  {
    icon: Droplets,
    href: "/driveway-cleaning",
    titleKey: "drivewayTitle",
    descKey: "drivewayDesc",
    img: DRIVEWAY_IMG,
    tag: null,
  },
  {
    icon: Layers,
    href: "/deck-cleaning",
    titleKey: "deckTitle",
    descKey: "deckDesc",
    img: DECK_IMG,
    tag: null,
  },
  {
    icon: Footprints,
    href: "/walkway-cleaning",
    titleKey: "walkwayTitle",
    descKey: "walkwayDesc",
    img: WALKWAY_IMG,
    tag: null,
  },
  {
    icon: Car,
    href: "/vehicle-washing",
    titleKey: "vehicleTitle",
    descKey: "vehicleDesc",
    img: VEHICLE_IMG,
    tag: null,
  },
];

const trustItems = [
  { icon: UserRound, labelKey: "ownerOperatedTrust" },
  { icon: Star, labelKey: "freeEstimatesTrust" },
  { icon: ShieldCheck, labelKey: "surfaceMethodsTrust" },
  { icon: Camera, labelKey: "photoQuotesTrust" },
];

const estimateSteps = [
  {
    step: "01",
    titleKey: "chooseEstimateMethod",
    descKey: "chooseEstimateMethodDesc",
  },
  {
    step: "02",
    titleKey: "receiveWrittenEstimate",
    descKey: "receiveWrittenEstimateDesc",
  },
  {
    step: "03",
    titleKey: "confirmScopeSchedule",
    descKey: "confirmScopeScheduleDesc",
  },
  {
    step: "04",
    titleKey: "reviewCompletedWork",
    descKey: "reviewCompletedWorkDesc",
  },
];

const whyUs = [
  {
    titleKey: "honestPricing",
    descKey: "honestPricingDesc",
  },
  {
    titleKey: "localDependable",
    descKey: "localDependableDesc",
  },
  {
    titleKey: "safeForProperty",
    descKey: "safeForPropertyDesc",
  },
  {
    titleKey: "resultsYouCanSee",
    descKey: "resultsYouCanSeeDesc",
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useReveal();
  const servicesRef = useReveal();
  const aboutRef = useReveal();
  const whyRef = useReveal();
  const contactRef = useReveal();

  useSeo({ path: "/", schema: [localBusinessSchema, websiteSchema] });

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
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.98 0.015 80)" }}
    >
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
                className="text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                }}
              >
                {t("mexicoMOAreas")}
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.98 0.015 80)",
              }}
            >
              {t("heroTitle")}
              <span
                className="block italic"
                style={{ color: "oklch(0.82 0.10 75)" }}
              >
                {t("heroSubtitle")}
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
              style={{
                color: "oklch(0.88 0.02 80)",
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              {t("heroDesc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#estimator")}
                className="btn-gold rounded-sm"
              >
                <Camera size={16} className="inline mr-2" />
                {t("requestPhotoQuote")}
              </button>
              <a href="tel:3144670332" className="btn-outline-gold rounded-sm">
                <Phone size={16} className="inline mr-2" />
                {t("callOrText")}
              </a>
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
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
            }}
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
        style={{
          backgroundColor: "oklch(0.72 0.12 75)",
          borderTop: "1px solid oklch(0.60 0.10 75)",
          borderBottom: "1px solid oklch(0.60 0.10 75)",
        }}
        className="py-5"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item, i) => (
              <div
                key={item.labelKey}
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
                  {t(item.labelKey)}
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
        style={{
          backgroundColor: "oklch(0.98 0.015 80)",
          borderTop: "1px solid oklch(0.92 0.004 286.32)",
          borderBottom: "1px solid oklch(0.92 0.004 286.32)",
        }}
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
              {t("whatWeDo")}
            </div>
            <h2
              className="reveal text-4xl sm:text-5xl font-bold mt-2 mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.20 0.06 155)",
              }}
            >
              {t("ourServices")}
            </h2>
            <p
              className="reveal text-base max-w-xl mx-auto"
              style={{
                color: "oklch(0.45 0.04 155)",
                fontFamily: "'Barlow', sans-serif",
              }}
            >
              {t("servicesDesc")}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, i) => (
              <Link
                key={service.titleKey}
                href={service.href}
                aria-label={`Learn more about ${t(service.titleKey)}`}
                className="reveal service-card rounded-lg overflow-hidden border flex flex-col no-underline"
                style={{
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* Image or gradient fallback */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  {service.img ? (
                    <img
                      src={service.img}
                      alt={t(service.titleKey)}
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
                      <service.icon
                        size={48}
                        style={{ color: "oklch(0.72 0.12 75)" }}
                      />
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
                    <service.icon
                      size={18}
                      style={{ color: "oklch(0.72 0.12 75)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                        color: "oklch(0.20 0.06 155)",
                      }}
                    >
                      {t(service.titleKey)}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{
                      color: "oklch(0.45 0.04 155)",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {t(service.descKey)}
                  </p>
                  <span
                    className="mt-4 text-xs font-bold tracking-widest uppercase flex items-center gap-1 transition-colors duration-200"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "oklch(0.28 0.07 155)",
                    }}
                  >
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Service selection CTA */}
          <div
            className="reveal mt-12 rounded-lg p-6 border-2 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              borderColor: "oklch(0.72 0.12 75)",
              backgroundColor: "oklch(0.72 0.12 75 / 0.06)",
            }}
          >
            <div className="text-center md:text-left">
              <h3
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.20 0.06 155)",
                }}
              >
                {t("needHelpChoosing")}
              </h3>
              <p
                className="text-sm"
                style={{
                  color: "oklch(0.45 0.04 155)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {t("serviceSelectionHelp")}
              </p>
            </div>
            <button
              onClick={() => scrollTo("#estimator")}
              className="btn-gold rounded-sm flex-shrink-0"
            >
              <Camera size={16} className="inline mr-2" />
              {t("requestPhotoQuote")}
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        ref={aboutRef}
        className="py-24"
        style={{
          backgroundColor: "oklch(0.20 0.06 155)",
          borderTop: "1px solid oklch(0.35 0.08 155)",
          borderBottom: "1px solid oklch(0.35 0.08 155)",
        }}
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
                {t("aboutUs")}
              </div>
              <h2
                className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.98 0.015 80)",
                }}
              >
                {t("honestWork")}
              </h2>
              <p
                className="reveal text-base leading-relaxed mb-4"
                style={{
                  color: "oklch(0.80 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                {t("aboutDesc")}
              </p>
              <div className="reveal flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("#estimator")}
                  className="btn-gold rounded-sm"
                >
                  <Camera size={15} className="inline mr-2" />
                  {t("requestPhotoQuote")}
                </button>
                <a
                  href="tel:3144670332"
                  className="btn-outline-gold rounded-sm"
                >
                  <Phone size={15} className="inline mr-2" />
                  {t("callOrText")}
                </a>
              </div>
            </div>

            {/* Right: estimate-to-completion process */}
            <div>
              <div
                className="reveal text-xs tracking-widest uppercase mb-4"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                {t("estimateProcess")}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {estimateSteps.map((item, i) => (
                  <div
                    key={item.step}
                    className="reveal rounded-lg p-5 border"
                    style={{
                      transitionDelay: `${i * 80}ms`,
                      backgroundColor: "oklch(0.28 0.07 155)",
                      borderColor: "oklch(0.35 0.08 155)",
                      boxShadow:
                        "0 8px 24px rgba(26, 58, 42, 0.12), 0 2px 8px rgba(201, 168, 76, 0.08)",
                    }}
                  >
                    <div
                      className="text-3xl font-bold mb-3"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "oklch(0.72 0.12 75)",
                      }}
                    >
                      {item.step}
                    </div>
                    <h3
                      className="text-sm font-bold uppercase tracking-wide mb-2"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.98 0.015 80)",
                      }}
                    >
                      {t(item.titleKey)}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "oklch(0.70 0.03 80)",
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {t(item.descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL PROJECT RESULTS ── */}
      <section
        className="py-24"
        style={{
          backgroundColor: "oklch(0.20 0.06 155)",
          borderTop: "1px solid oklch(0.35 0.08 155)",
          borderBottom: "1px solid oklch(0.35 0.08 155)",
        }}
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
              {t("customerReviews")}
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mt-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "oklch(0.98 0.015 80)",
              }}
            >
              {t("whatOurCustomersSay")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {projectResults.map(project => (
              <figure
                key={project.image}
                className="rounded-xl overflow-hidden border flex flex-col"
                style={{
                  backgroundColor: "oklch(0.28 0.07 155)",
                  borderColor: "oklch(0.35 0.08 155)",
                  boxShadow:
                    "0 8px 24px rgba(26, 58, 42, 0.12), 0 2px 8px rgba(201, 168, 76, 0.08)",
                }}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <figcaption
                  className="p-5 border-t"
                  style={{ borderColor: "oklch(0.35 0.08 155)" }}
                >
                  <h3
                    className="font-bold text-base mb-1"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: "oklch(0.98 0.015 80)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "oklch(0.75 0.025 80)",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {project.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => scrollTo("#estimator")}
              className="btn-gold rounded-sm"
            >
              <Camera size={16} className="inline mr-2" />
              {t("requestPhotoQuote")}
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section
        ref={whyRef}
        className="py-24"
        style={{
          backgroundColor: "oklch(0.93 0.02 80)",
          borderTop: "1px solid oklch(0.92 0.004 286.32)",
          borderBottom: "1px solid oklch(0.92 0.004 286.32)",
        }}
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
                key={item.titleKey}
                className="reveal rounded-lg p-6 border"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: "#fff",
                  borderColor: "oklch(0.88 0.025 80)",
                  boxShadow:
                    "0 8px 24px rgba(26, 58, 42, 0.08), 0 2px 8px rgba(201, 168, 76, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 240, 0.5))",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "oklch(0.72 0.12 75 / 0.15)" }}
                >
                  <CheckCircle
                    size={20}
                    style={{ color: "oklch(0.55 0.10 75)" }}
                  />
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
                  {t(item.titleKey)}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "oklch(0.45 0.04 155)",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO QUOTE REQUEST ── */}
      <section
        id="estimator"
        className="py-12"
        style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
      >
        <AIEstimator />
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        ref={contactRef}
        className="py-24"
        style={{
          backgroundColor: "oklch(0.20 0.06 155)",
          borderTop: "1px solid oklch(0.35 0.08 155)",
          borderBottom: "1px solid oklch(0.35 0.08 155)",
        }}
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
                Other Ways to Reach Us
              </div>
              <h2
                className="reveal text-4xl sm:text-5xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "oklch(0.98 0.015 80)",
                }}
              >
                Call, Text, or Schedule
                <span
                  className="block italic"
                  style={{ color: "oklch(0.82 0.10 75)" }}
                >
                  an On-Site Estimate
                </span>
              </h2>
              <p
                className="reveal text-base leading-relaxed mb-10"
                style={{
                  color: "oklch(0.80 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                The photo-quote form above is the main online estimate option.
                If the project needs an in-person look, choose an available time
                or call or text to discuss it first.
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
                    <MapPin
                      size={20}
                      style={{ color: "oklch(0.72 0.12 75)" }}
                    />
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
                      Home Base
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        color: "oklch(0.98 0.015 80)",
                      }}
                    >
                      Mexico, Missouri
                    </div>
                    <Link href="/service-areas">
                      <a
                        className="mt-1 block text-xs underline-offset-4 hover:underline"
                        style={{ color: "oklch(0.72 0.12 75)" }}
                      >
                        Check out-of-town project availability
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: secondary on-site estimate path */}
            <div
              className="reveal flex flex-col rounded-xl border p-8"
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
                Need an In-Person Estimate?
              </h3>
              <p
                className="text-sm mb-6 leading-relaxed"
                style={{
                  color: "oklch(0.75 0.025 80)",
                  fontFamily: "'Barlow', sans-serif",
                }}
              >
                Use the separate booking page when the project needs a closer
                look. Choose an available time for a free estimate visit and
                wait for confirmation before the appointment.
              </p>

              <div className="mb-8 flex flex-col gap-4">
                {[
                  {
                    label: "For an estimate visit",
                    sub: "The scheduled appointment is not the cleaning service itself.",
                  },
                  {
                    label: "Property details required",
                    sub: "Add the address and surface you need inspected.",
                  },
                  {
                    label: "Confirmation follows",
                    sub: "We confirm the appointment before arriving.",
                  },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle
                      className="mt-0.5 shrink-0"
                      size={17}
                      style={{ color: "oklch(0.72 0.12 75)" }}
                    />
                    <div>
                      <div
                        className="text-sm font-bold"
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          color: "oklch(0.98 0.015 80)",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color: "oklch(0.65 0.04 155)",
                          fontFamily: "'Barlow', sans-serif",
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/booking">
                <a className="btn-gold block rounded-sm text-center">
                  <Clock size={15} className="mr-2 inline" />
                  View On-Site Estimate Times
                </a>
              </Link>

              <div
                className="mt-4 pt-4 border-t text-center"
                style={{ borderColor: "oklch(0.35 0.08 155)" }}
              >
                <p
                  className="text-xs"
                  style={{
                    color: "oklch(0.55 0.04 155)",
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  Prefer to call or text?{" "}
                  <a
                    href="tel:3144670332"
                    style={{ color: "oklch(0.72 0.12 75)" }}
                  >
                    (314) 467-0332
                  </a>
                </p>
              </div>
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
          <CertificationBanner />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div
                className="text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                Based in Mexico, Missouri
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61584880772273"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "oklch(0.72 0.12 75)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "oklch(0.28 0.07 155)")
                }
                aria-label="Facebook"
              >
                <Facebook size={16} style={{ color: "oklch(0.98 0.015 80)" }} />
              </a>
              <a
                href="https://instagram.com/gandrestoration"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: "oklch(0.28 0.07 155)" }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "oklch(0.72 0.12 75)")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "oklch(0.28 0.07 155)")
                }
                aria-label="Instagram"
              >
                <Instagram
                  size={16}
                  style={{ color: "oklch(0.98 0.015 80)" }}
                />
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
