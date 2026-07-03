import ServiceLayout from "@/components/ServiceLayout";

const DECK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/deck-clean-gknHjniPv6K2enyENyo566.webp";

export default function DeckCleaning() {
  return (
    <ServiceLayout
      title="Deck Cleaning"
      subtitle="Mexico, MO."
      metaDescription="Professional deck cleaning services in Mexico, MO. Safe pressure washing for wood and composite decks — removes algae, mildew, and slippery buildup. Free estimates. G&S Exterior Restoration."
      heroImg={DECK_IMG}
      heroFeature={{
        title: "Deck Cleaning Results",
        image: "/images/deck-before-after.png",
        alt: "Before and after deck cleaning result showing leaves, dirt, and buildup removed from gray composite decking",
      }}
      intro="A dirty, slippery deck is both an eyesore and a safety hazard. G&S Exterior Restoration cleans wood and composite decks using the right pressure and technique for each surface — removing algae, mildew, dirt, and buildup without damaging the wood fibers or composite material."
      benefits={[
        "Safe cleaning for wood, composite, and Trex decking",
        "Removes algae, mildew, mold, and slippery green buildup",
        "Eliminates dirt, pollen, and weathered gray discoloration",
        "Low-pressure soft wash option for older or delicate wood",
        "Prepares surface for staining or sealing",
        "Improves safety by removing slippery organic growth",
        "Free estimate — no obligation",
        "Fully insured service in Mexico, MO and surrounding areas",
      ]}
      process={[
        {
          step: "01",
          title: "Surface Assessment",
          description: "We inspect the deck material, condition, and level of buildup to determine the safest and most effective cleaning approach.",
        },
        {
          step: "02",
          title: "Soft Wash or Pressure Wash",
          description: "Depending on the material, we either soft wash with a biodegradable cleaning solution or use controlled pressure washing to lift and remove all organic growth and grime.",
        },
        {
          step: "03",
          title: "Rinse & Walk-Through",
          description: "We thoroughly rinse the deck and surrounding area, then walk the job with you to confirm you're happy with the results.",
        },
      ]}
      faqs={[
        {
          question: "Is pressure washing safe for composite decking?",
          answer: "Yes, when done correctly. We use lower pressure settings and appropriate nozzles for composite materials like Trex to avoid surface damage. We never use high-pressure wands directly on composite boards.",
        },
        {
          question: "Will cleaning my deck prepare it for staining?",
          answer: "Absolutely — a clean deck is essential before staining or sealing. Our cleaning removes all the grime, mildew, and gray weathering that would prevent stain from penetrating evenly.",
        },
        {
          question: "How long does deck cleaning take?",
          answer: "A standard residential deck typically takes 1–3 hours depending on size, condition, and whether it has railings, stairs, or built-in features.",
        },
        {
          question: "How often should I have my deck cleaned?",
          answer: "Once a year is recommended for most decks in Missouri, especially those with tree coverage. Regular cleaning extends the life of the wood and prevents permanent staining.",
        },
      ]}
      relatedServices={[
        { title: "Driveway Cleaning", href: "/driveway-cleaning" },
        { title: "Siding & Exterior Washing", href: "/siding-washing" },
        { title: "Vehicle Washing", href: "/vehicle-washing" },
        { title: "Service Areas", href: "/service-areas" },
      ]}
    />
  );
}
