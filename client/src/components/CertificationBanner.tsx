const CERTIFICATION_URL = "https://www.locallyownedandoperated.org/";

export default function CertificationBanner() {
  return (
    <a
      href={CERTIFICATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Verify G&S Exterior Restoration's Locally Owned and Operated certification"
      className="mx-auto mb-8 block max-w-4xl overflow-hidden rounded-md border transition-transform hover:scale-[1.005] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 motion-reduce:transition-none motion-reduce:hover:transform-none"
      style={{
        borderColor: "oklch(0.72 0.12 75 / 0.35)",
        backgroundColor: "#efede8",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        src="/images/locally-owned-operated-certified.png"
        alt="Locally Owned and Operated — Certified by American Operator"
        width={1194}
        height={202}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
    </a>
  );
}
