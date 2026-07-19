import ServiceLayout from "@/components/ServiceLayout";

const DRIVEWAY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/driveway-clean-miGtpBbYzGprrMxfiHWwZF.webp";

export default function DrivewayCleaning() {
  return (
    <ServiceLayout
      title="Driveway & Concrete Cleaning"
      subtitle="Mexico, Missouri."
      metaDescription="Driveway and concrete cleaning for dirt, organic buildup, and common surface stains. Owner-operated service based in Mexico, Missouri."
      heroImg={DRIVEWAY_IMG}
      intro="G&S Exterior Restoration cleans concrete driveways and paved surfaces using a process selected for the material, buildup, staining, and current condition. Cleaning can address dirt, organic growth, and many common surface stains, while deep discoloration and existing damage may remain visible."
      benefits={[
        "Cleaning for dirt, algae, mold, mildew, and surface buildup",
        "Oil and grease stain treatment when appropriate",
        "Pressure and cleaning methods selected for the surface condition",
        "Surface cleaner used when appropriate for even coverage",
        "Realistic expectations based on age, staining, and previous damage",
        "Free estimate before any work begins",
        "Owner-operated service with direct communication",
        "Based in Mexico, Missouri",
      ]}
      process={[
        {
          step: "01",
          title: "Free On-Site Estimate",
          description:
            "We assess the driveway, identify stain types, and give you a clear, no-obligation quote before we start.",
        },
        {
          step: "02",
          title: "Pre-Treatment & Washing",
          description:
            "When needed, we apply an appropriate pre-treatment, then clean the surface using pressure and equipment selected for the concrete's condition.",
        },
        {
          step: "03",
          title: "Final Rinse & Inspection",
          description:
            "We rinse the surface, review the completed cleaning, and point out any deep staining or existing condition that remains visible.",
        },
      ]}
      faqs={[
        {
          question: "How long does driveway cleaning take?",
          answer:
            "Most residential driveways take 1–2 hours depending on size and the level of staining. We'll give you a time estimate when we assess the job.",
        },
        {
          question: "Will pressure washing damage my concrete?",
          answer:
            "Incorrect pressure or technique can etch concrete. We inspect the surface first and choose the pressure, equipment, and treatment for its condition. Existing cracks, scaling, repairs, or weak areas may affect what can be cleaned safely.",
        },
        {
          question: "Can you remove oil stains from my driveway?",
          answer:
            "We can treat many oil and grease stains. The final result depends on the stain's age, depth, previous treatments, and the porosity of the concrete, so complete removal cannot be promised.",
        },
        {
          question: "How often should I have my driveway cleaned?",
          answer:
            "Cleaning frequency depends on shade, drainage, traffic, tree coverage, and the type of buildup. We can recommend a practical interval after seeing the property.",
        },
      ]}
      relatedServices={[
        { title: "Deck & Patio Cleaning", href: "/deck-cleaning" },
        { title: "Walkway Cleaning", href: "/walkway-cleaning" },
        { title: "House & Siding Washing", href: "/siding-washing" },
        { title: "Vehicle & Fleet Washing", href: "/vehicle-washing" },
        { title: "Service Area", href: "/service-areas" },
      ]}
    />
  );
}
