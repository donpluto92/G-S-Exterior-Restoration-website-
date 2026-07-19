import ServiceLayout from "@/components/ServiceLayout";

const VEHICLE_IMG = "/images/vehicle-wash.jpg";

export default function VehicleWashing() {
  return (
    <ServiceLayout
      title="Vehicle & Fleet Washing"
      subtitle="Mexico, Missouri."
      metaDescription="Exterior washing for cars, trucks, work vehicles, and small fleets. Mobile, owner-operated service based in Mexico, Missouri."
      heroImg={VEHICLE_IMG}
      intro="Road salt, mud, grime, and everyday buildup collect on personal and work vehicles. G&S Exterior Restoration provides exterior washing for cars, trucks, work vehicles, and small fleets at the customer's property when access and site conditions are suitable."
      benefits={[
        "Removes road grime, dirt, salt, and seasonal buildup",
        "Pressure, nozzle distance, and wash method selected for the finish",
        "Exterior washing for cars, trucks, SUVs, vans, and work vehicles",
        "Individual vehicles and small fleet groups reviewed by estimate",
        "Mobile service when the property has suitable access and conditions",
        "Cleaning focused on visible exterior road and seasonal buildup",
        "Service time based on vehicle size and condition",
        "Free estimate — no obligation",
        "Owner-operated service with direct communication",
      ]}
      process={[
        {
          step: "01",
          title: "Pre-Rinse",
          description:
            "We pre-rinse the entire vehicle to loosen surface dirt and road grime before applying any cleaning solution.",
        },
        {
          step: "02",
          title: "Exterior Wash",
          description:
            "We wash the exterior using pressure, nozzle distance, and technique selected for the finish and visible condition of the vehicle.",
        },
        {
          step: "03",
          title: "Final Rinse & Inspection",
          description:
            "We complete a final rinse and inspect the exterior with you, noting any bonded contamination, oxidation, chips, or staining outside the scope of an exterior wash.",
        },
      ]}
      faqs={[
        {
          question: "Will pressure washing damage my car's paint?",
          answer:
            "Incorrect pressure or nozzle distance can damage paint, trim, decals, or loose finishes. We inspect the visible condition and adjust the washing method, but pre-existing chips, peeling clear coat, loose decals, and damaged trim require special care.",
        },
        {
          question: "Do you come to my location?",
          answer:
            "Yes. We bring all the equipment we need and can wash your vehicle at your home, driveway, or property. No need to take it anywhere.",
        },
        {
          question: "What types of vehicles do you wash?",
          answer:
            "We wash cars, trucks, SUVs, vans, and common work vehicles. Contact us about specialty vehicles, equipment, or multiple-vehicle work so we can review the surfaces, access, and scope.",
        },
        {
          question: "Can you wash a small business fleet?",
          answer:
            "Small fleet and multi-vehicle washing can be estimated based on vehicle count, size, condition, property access, water management, and scheduling. Send the vehicle details and location for review.",
        },
        {
          question: "Is this an interior detail service too?",
          answer:
            "No — we focus on exterior washing only. We don't offer interior detailing at this time.",
        },
      ]}
      relatedServices={[
        {
          title: "Driveway & Concrete Cleaning",
          href: "/driveway-cleaning",
        },
        { title: "Deck & Patio Cleaning", href: "/deck-cleaning" },
        { title: "Walkway Cleaning", href: "/walkway-cleaning" },
        { title: "House & Siding Washing", href: "/siding-washing" },
        { title: "Service Area", href: "/service-areas" },
      ]}
    />
  );
}
