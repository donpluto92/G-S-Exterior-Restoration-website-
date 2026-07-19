import ServiceLayout from "@/components/ServiceLayout";

const DECK_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/deck-clean-gknHjniPv6K2enyENyo566.webp";

export default function DeckCleaning() {
  return (
    <ServiceLayout
      title="Deck & Patio Cleaning"
      subtitle="Mexico, Missouri."
      metaDescription="Deck and patio cleaning for wood, composite, concrete, and other outdoor surfaces. Methods are selected for the material and current condition."
      heroImg={DECK_IMG}
      heroFeature={{
        title: "Deck Cleaning Results",
        image: "/images/deck-cleaning-before-after.webp",
        alt: "Before and after deck cleaning result showing leaves, dirt, and buildup removed from gray composite decking",
      }}
      intro="Algae, mildew, dirt, and organic buildup can collect on decks and patios. G&S Exterior Restoration evaluates the material and existing condition before selecting the pressure, treatment, and cleaning approach for wood, composite, concrete, pavers, or other outdoor surfaces."
      benefits={[
        "Cleaning methods selected for deck and patio materials",
        "Treatment for algae, mildew, mold, and organic buildup",
        "Cleaning for dirt, pollen, and common surface discoloration",
        "Controlled lower-pressure options for older or delicate materials",
        "Cleaning available as one step in stain or sealer preparation",
        "Realistic expectations for weathering, wear, and previous coatings",
        "Free estimate — no obligation",
        "Owner-operated service based in Mexico, Missouri",
      ]}
      process={[
        {
          step: "01",
          title: "Surface Assessment",
          description:
            "We inspect the deck or patio material, condition, nearby property, and level of buildup before choosing the cleaning approach.",
        },
        {
          step: "02",
          title: "Treatment & Cleaning",
          description:
            "Depending on the material and condition, we use a lower-pressure wash, an appropriate cleaning treatment, or controlled pressure to address dirt and organic buildup.",
        },
        {
          step: "03",
          title: "Rinse & Walk-Through",
          description:
            "We rinse the deck or patio and surrounding work area, then review the completed cleaning and any remaining wear, staining, or coating issues.",
        },
      ]}
      faqs={[
        {
          question: "Is pressure washing safe for composite decking?",
          answer:
            "Composite decking requires attention to the manufacturer's guidance, surface condition, pressure, and nozzle distance. We inspect the material first and select a controlled method for the specific deck.",
        },
        {
          question: "Will cleaning my deck prepare it for staining?",
          answer:
            "Cleaning is an important preparation step before staining or sealing. Drying time, previous coatings, wood condition, and the coating manufacturer's instructions also need to be considered before application.",
        },
        {
          question: "How long does deck cleaning take?",
          answer:
            "A standard residential deck typically takes 1–3 hours depending on size, condition, and whether it has railings, stairs, or built-in features.",
        },
        {
          question: "How often should I have my deck cleaned?",
          answer:
            "Frequency depends on shade, moisture, tree coverage, deck material, and the type of buildup. We can recommend an interval after inspecting the surface.",
        },
        {
          question: "What types of patios can you clean?",
          answer:
            "We review concrete, pavers, composite surfaces, and other patio materials individually. Joint condition, sealers, coatings, drainage, and nearby landscaping can affect the recommended method.",
        },
      ]}
      relatedServices={[
        {
          title: "Driveway & Concrete Cleaning",
          href: "/driveway-cleaning",
        },
        { title: "Walkway Cleaning", href: "/walkway-cleaning" },
        { title: "House & Siding Washing", href: "/siding-washing" },
        { title: "Vehicle & Fleet Washing", href: "/vehicle-washing" },
        { title: "Service Area", href: "/service-areas" },
      ]}
    />
  );
}
