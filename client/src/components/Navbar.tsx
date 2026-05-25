/* GS Restoration Navbar
   Design: Sticky dark-green nav with gold accents, compresses on scroll
   Font: Barlow Condensed for nav items, Playfair Display for logo text
*/
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

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
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`relative z-50 transition-all duration-300 ${
        scrolled
          ? "py-1 shadow-2xl"
          : "py-2"
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
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm tracking-widest uppercase transition-colors duration-200 hover:opacity-100"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                color: "oklch(0.82 0.10 75)",
                opacity: 0.85,
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA Phone */}
        <a
          href="tel:3144670332"
          className="hidden md:flex items-center gap-2 btn-gold rounded"
          style={{ fontSize: "1.05rem" }}
        >
          <Phone size={15} />
          (314) 467-0332
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "oklch(0.98 0.015 80)" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
      >
        <div className="container py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left text-base tracking-widest uppercase py-2 border-b"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                color: "oklch(0.82 0.10 75)",
                borderColor: "oklch(0.35 0.08 155)",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:3144670332"
            className="btn-gold rounded text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            <Phone size={15} className="inline mr-2" />
            (314) 467-0332
          </a>
        </div>
      </div>
    </header>
  );
}
