/* GS Restoration Navbar
   Design: Sticky dark-green nav with gold accents, compresses on scroll
   Font: Barlow Condensed for nav items, Playfair Display for logo text
*/
import { useState, useEffect } from "react";
import { Camera, Phone, Menu, X } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Photo Quote", href: "#estimator" },
    { label: "Booking", href: "/booking" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = `/${href}`;
  };

  return (
    <header
      className={`relative z-50 transition-all duration-300 ${
        scrolled ? "py-0 shadow-2xl" : "py-1"
      }`}
      style={{
        backgroundColor: scrolled ? "oklch(0.20 0.06 155)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center group"
        >
          <img
            src="/images/gs-logo.png"
            alt="G&S Exterior Restoration LLC"
            className="h-32 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map(link =>
            link.href.startsWith("/") ? (
              <a
                key={link.label}
                href={link.href}
                className="text-base tracking-widest uppercase transition-colors duration-200 hover:opacity-100"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                  opacity: 0.85,
                }}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-base tracking-widest uppercase transition-colors duration-200 hover:opacity-100"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                  opacity: 0.85,
                }}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Language Toggle + conversion actions */}
        <div className="hidden items-center gap-3 xl:flex">
          <LanguageToggle />
          <a
            href="tel:3144670332"
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: "oklch(0.82 0.10 75)" }}
          >
            <Phone size={15} />
            (314) 467-0332
          </a>
          <button
            onClick={() => scrollTo("#estimator")}
            className="btn-gold rounded flex items-center gap-2"
          >
            <Camera size={15} />
            Request Photo Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="relative z-10 ml-3 flex size-12 shrink-0 items-center justify-center rounded-lg border-2 shadow-lg transition-transform active:scale-95 xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          onClick={() => setMenuOpen(open => !open)}
          style={{
            color: "oklch(0.88 0.13 82)",
            backgroundColor: "oklch(0.20 0.06 155)",
            borderColor: "oklch(0.72 0.12 75)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
          }}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X size={28} strokeWidth={2.75} aria-hidden="true" />
          ) : (
            <Menu size={30} strokeWidth={2.75} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden transition-all duration-300 xl:hidden ${
          menuOpen ? "max-h-[48rem] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        <div className="container py-4 flex flex-col gap-4">
          {navLinks.map(link =>
            link.href.startsWith("/") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b py-2 text-left text-lg uppercase tracking-widest"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                  borderColor: "oklch(0.35 0.08 155)",
                }}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="border-b py-2 text-left text-lg uppercase tracking-widest"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  color: "oklch(0.82 0.10 75)",
                  borderColor: "oklch(0.35 0.08 155)",
                }}
              >
                {link.label}
              </button>
            )
          )}
          <div className="py-2">
            <LanguageToggle />
          </div>
          <button
            onClick={() => scrollTo("#estimator")}
            className="btn-gold rounded text-center mt-2"
          >
            <Camera size={15} className="inline mr-2" />
            Request Photo Quote
          </button>
          <a
            href="tel:3144670332"
            className="btn-outline-gold rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={15} className="inline mr-2" />
            Call or Text
          </a>
        </div>
      </div>
    </header>
  );
}
