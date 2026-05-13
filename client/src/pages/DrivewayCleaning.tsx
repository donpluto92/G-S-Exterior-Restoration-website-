import ServiceLayout from "@/components/ServiceLayout";

const DRIVEWAY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/driveway-clean-miGtpBbYzGprrMxfiHWwZF.webp";

export default function DrivewayCleaning() {
  return (
    <ServiceLayout
      title="Driveway Cleaning"
      subtitle="Mexico, MO."
      metaDescription="Professional driveway cleaning and concrete pressure washing in Mexico, MO. Remove dirt, algae, oil stains, and grime. Free estimates. Fully insured. Call G&S Exterior Restoration."
      heroImg={DRIVEWAY_IMG}
      intro="Your driveway is the first thing people see. G&S Exterior Restoration uses professional-grade pressure washing equipment to remove years of dirt, algae, oil stains, and grime from concrete and paved surfaces — restoring your driveway to like-new condition."
      benefits={[
        "Removal of dirt, algae, mold, mildew, and surface stains",
        "Oil and grease stain treatment for concrete driveways",
        "Safe pressure levels that won't damage concrete or pavers",
        "Surface cleaner attachment for streak-free, even results",
        "Improves curb appeal and property value",
        "Free estimate before any work begins",
        "Fully insured — your property is protected",
        "Serving Mexico, MO and all surrounding Audrain County communities",
      ]}
      process={[
        {
          step: "01",
          title: "Free On-Site Estimate",
          description: "We assess the driveway, identify stain types, and give you a clear, no-obligation quote before we start.",
        },
        {
          step: "02",
          title: "Pre-Treatment & Washing",
          description: "We apply a biodegradable pre-treatment to break down oil and organic growth, then pressure wash with a surface cleaner for even, streak-free results.",
        },
        {
          step: "03",
          title: "Final Rinse & Inspection",
          description: "We rinse the entire surface and walk the job with you to make sure you're completely satisfied before we leave.",
        },
      ]}
      faqs={[
        {
          question: "How long does driveway cleaning take?",
          answer: "Most residential driveways take 1–2 hours depending on size and the level of staining. We'll give you a time estimate when we assess the job.",
        },
        {
          question: "Will pressure washing damage my concrete?",
          answer: "No — we use the correct pressure levels and a surface cleaner attachment designed for concrete. We never use excessive pressure that could etch or pit the surface.",
        },
        {
          question: "Can you remove oil stains from my driveway?",
          answer: "Yes. We use a degreasing pre-treatment specifically for oil and grease stains. Results depend on how deep the stain has penetrated, but we can significantly reduce or fully remove most oil stains.",
        },
        {
          question: "How often should I have my driveway cleaned?",
          answer: "Once a year is a good rule of thumb for most driveways in Missouri. If you have heavy tree coverage or significant algae growth, every 6–12 months keeps it looking its best.",
        },
      ]}
      relatedServices={[
        { title: "Deck Cleaning", href: "/deck-cleaning" },
        { title: "Siding & Exterior Washing", href: "/siding-washing" },
        { title: "Vehicle Washing", href: "/vehicle-washing" },
        { title: "Service Areas", href: "/service-areas" },
      ]}
    />
  );
}
