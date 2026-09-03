import ServiceLayout from "@/components/ServiceLayout";

const SIDING_IMG = "/images/siding-washing-before-after.webp";

export default function SidingWashing() {
  return (
    <ServiceLayout
      title="House & Siding Washing"
      subtitle="Mexico, Missouri."
      metaDescription="House and siding washing with lower-pressure, surface-specific methods for dirt and organic buildup. Owner-operated service based in Mexico, Missouri."
      heroImg={SIDING_IMG}
      heroFeature={{
        title: "Siding Washing Results",
        image: "/images/siding-growth-before-after.webp",
        alt: "Before and after siding washing result showing algae and dirt removed from white house siding",
      }}
      intro="Black streaks, green algae, mildew, and dirt can collect on siding and exterior surfaces. G&S Exterior Restoration inspects the material and existing condition before using a lower-pressure washing approach and appropriate treatment for the buildup present."
      benefits={[
        "Lower-pressure washing methods selected for the surface",
        "Treatment for mold, mildew, algae, and common organic streaking",
        "Inspection of vinyl, wood, brick, stucco, and painted surfaces",
        "Landscaping pre-wetting and rinsing as conditions require",
        "Realistic expectations for oxidation, fading, stains, and existing damage",
        "Direct communication about sensitive or deteriorated areas",
        "Free estimate before any work begins",
        "Owner-operated service based in Mexico, Missouri",
      ]}
      process={[
        {
          step: "01",
          title: "Inspection & Quote",
          description:
            "We assess the siding material, staining type, and overall condition to recommend the right cleaning solution and pressure level.",
        },
        {
          step: "02",
          title: "Soft Wash Application",
          description:
            "We apply an appropriate cleaning treatment for the surface and buildup, allow the needed dwell time, and rinse using controlled lower pressure.",
        },
        {
          step: "03",
          title: "Final Rinse & Review",
          description:
            "We rinse the cleaned areas and review the result, including any oxidation, deep staining, fading, or previous damage that remains visible.",
        },
      ]}
      faqs={[
        {
          question:
            "What's the difference between pressure washing and soft washing for siding?",
          answer:
            "Soft washing relies on lower water pressure and a cleaning treatment selected for organic buildup. Siding condition, seams, paint, oxidation, and nearby openings are inspected before choosing the method.",
        },
        {
          question: "Will the cleaning solution harm my plants or lawn?",
          answer:
            "We identify nearby landscaping, pre-wet and rinse plants as conditions require, and manage the work area carefully. Please tell us about sensitive plants, gardens, ponds, or recent landscaping before service.",
        },
        {
          question: "How long does house washing take?",
          answer:
            "Most single-story homes take 2–3 hours. Two-story homes or larger properties may take 3–5 hours. We'll give you a time estimate during the free quote.",
        },
        {
          question: "How often should I have my siding washed?",
          answer:
            "Every 1–2 years is typical for most homes in Missouri. Homes with heavy tree coverage, north-facing walls, or high humidity may benefit from annual cleaning.",
        },
      ]}
      relatedServices={[
        {
          title: "Driveway & Concrete Cleaning",
          href: "/driveway-cleaning",
        },
        { title: "Deck & Patio Cleaning", href: "/deck-cleaning" },
        { title: "Walkway Cleaning", href: "/walkway-cleaning" },
        { title: "Vehicle & Fleet Washing", href: "/vehicle-washing" },
        { title: "Service Area", href: "/service-areas" },
      ]}
    />
  );
}
