import ServiceLayout from "@/components/ServiceLayout";

const WALKWAY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/driveway-clean-miGtpBbYzGprrMxfiHWwZF.webp";

export default function WalkwayCleaning() {
  return (
    <ServiceLayout
      title="Walkway & Sidewalk Cleaning"
      subtitle="Mexico, Missouri."
      metaDescription="Walkway and sidewalk cleaning for dirt, organic buildup, and common concrete discoloration. Free estimates from owner-operated G&S Exterior Restoration."
      heroImg={WALKWAY_IMG}
      intro="Walkways and sidewalks collect dirt, organic growth, leaf marks, and other surface buildup. G&S Exterior Restoration evaluates the material, drainage, nearby landscaping, staining, and existing condition before selecting the cleaning process."
      benefits={[
        "Cleaning for concrete sidewalks, walkways, and entry paths",
        "Treatment for dirt, algae, mildew, and organic buildup",
        "Methods selected for the surface material and condition",
        "Attention to nearby siding, landscaping, doors, and entry areas",
        "Care around cracks, repairs, scaling, and deteriorated sections",
        "Realistic expectations for deep stains and existing discoloration",
        "Free estimate before work begins",
        "Owner-operated service with direct communication",
      ]}
      process={[
        {
          step: "01",
          title: "Surface Review & Estimate",
          description:
            "We review the walkway material, buildup, drainage, access, and existing condition before outlining the work and price.",
        },
        {
          step: "02",
          title: "Treatment & Cleaning",
          description:
            "When appropriate, we apply a treatment for the visible buildup and clean with pressure and equipment selected for the surface.",
        },
        {
          step: "03",
          title: "Rinse & Final Review",
          description:
            "We rinse the walkway and nearby work area, then review the result and any staining or surface condition that remains visible.",
        },
      ]}
      faqs={[
        {
          question: "Can walkway cleaning remove green or black buildup?",
          answer:
            "Many common types of organic growth and surface buildup respond well to treatment and cleaning. Deep staining, embedded discoloration, and existing surface damage may remain visible.",
        },
        {
          question: "Can you clean a walkway with cracks or repairs?",
          answer:
            "We inspect cracks, patches, scaling, loose material, and repaired sections before cleaning. Those conditions may require reduced pressure or limits on what can be cleaned safely.",
        },
        {
          question: "Can walkway cleaning be combined with another service?",
          answer:
            "Yes. Walkways can be reviewed with driveway, patio, siding, or other exterior-cleaning work and included in one estimate when the services are a good fit for the property.",
        },
        {
          question: "Do you clean walkways outside Mexico, Missouri?",
          answer:
            "G&S is based in Mexico, Missouri. Travel availability depends on project size, distance, and scheduling, so send the property address with your quote request.",
        },
      ]}
      relatedServices={[
        {
          title: "Driveway & Concrete Cleaning",
          href: "/driveway-cleaning",
        },
        { title: "Deck & Patio Cleaning", href: "/deck-cleaning" },
        { title: "House & Siding Washing", href: "/siding-washing" },
        { title: "Vehicle & Fleet Washing", href: "/vehicle-washing" },
        { title: "Service Area", href: "/service-areas" },
      ]}
    />
  );
}
