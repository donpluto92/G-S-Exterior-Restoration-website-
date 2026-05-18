import ServiceLayout from "@/components/ServiceLayout";

const SIDING_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663635557924/ZNUNRNhUogzMzaRUqgDaXD/siding-clean-dk8VDGPUe5sPbznsNs5D65.webp";

export default function SidingWashing() {
  return (
    <ServiceLayout
      title="Siding & Exterior Washing"
      subtitle="Mexico, MO."
      metaDescription="Professional house washing and siding cleaning in Mexico, MO. Safe soft washing removes mold, mildew, algae, and dirt from vinyl siding and exterior surfaces. Free estimates. G&S Exterior Restoration."
      heroImg={SIDING_IMG}
      intro="Black streaks, green algae, and mildew on your siding make even a well-maintained home look neglected. G&S Exterior Restoration uses safe soft washing techniques to remove mold, mildew, algae, and built-up dirt from vinyl siding and other exterior surfaces — without the harsh pressure that can force water behind panels or damage paint."
      benefits={[
        "Safe soft washing — no harsh pressure that damages siding",
        "Removes mold, mildew, algae, and black streaks",
        "Cleans vinyl, wood, brick, stucco, and painted surfaces",
        "Biodegradable cleaning solutions safe for landscaping",
        "Improves curb appeal and protects your home's exterior",
        "Prevents long-term damage from organic growth",
        "Free estimate before any work begins",
        "Fully insured — serving Mexico, MO and surrounding areas",
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
            "We apply a biodegradable cleaning solution that kills mold, mildew, and algae at the root — then rinse with low pressure to safely remove all residue without forcing water behind panels.",
        },
        {
          step: "03",
          title: "Final Rinse & Review",
          description:
            "We rinse the entire exterior and review the results with you to ensure every section is clean and you're fully satisfied.",
        },
      ]}
      faqs={[
        {
          question:
            "What's the difference between pressure washing and soft washing for siding?",
          answer:
            "Pressure washing uses high-force water to blast away dirt, which can damage vinyl siding, force water behind panels, and strip paint. Soft washing uses low pressure combined with a cleaning solution that kills organic growth at the root — it's safer and more effective for siding.",
        },
        {
          question: "Will the cleaning solution harm my plants or lawn?",
          answer:
            "We use biodegradable cleaning solutions and take care to pre-wet surrounding landscaping before and after washing. We haven't had issues with plant damage using our current process.",
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
        { title: "Driveway Cleaning", href: "/driveway-cleaning" },
        { title: "Deck Cleaning", href: "/deck-cleaning" },
        { title: "Vehicle Washing", href: "/vehicle-washing" },
        { title: "Service Areas", href: "/service-areas" },
      ]}
    />
  );
}
