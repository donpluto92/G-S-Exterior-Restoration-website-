import ServiceLayout from "@/components/ServiceLayout";

const VEHICLE_IMG = "/images/vehicle-wash.jpg";

export default function VehicleWashing() {
  return (
    <ServiceLayout
      title="Vehicle Washing"
      subtitle="Mexico, Missouri."
      metaDescription="Owner-operated exterior vehicle washing in Mexico, Missouri for road grime, dirt, salt, and common buildup on cars, trucks, and work vehicles."
      heroImg={VEHICLE_IMG}
      intro="Road salt, mud, grime, and everyday buildup take a toll on your vehicle's finish. G&S Exterior Restoration provides professional exterior vehicle washing to keep your cars, trucks, and other vehicles looking clean and well maintained — right at your home or property."
      benefits={[
        "Removes road grime, dirt, salt, and seasonal buildup",
        "Pressure, nozzle distance, and wash method selected for the finish",
        "Exterior wash for cars, trucks, SUVs, and work vehicles",
        "Convenient — we come to your location",
        "Cleaning focused on visible exterior road and seasonal buildup",
        "Service time based on vehicle size and condition",
        "Free estimate — no obligation",
        "Owner-operated service based in Mexico, Missouri",
      ]}
      process={[
        {
          step: "01",
          title: "Pre-Rinse",
          description: "We pre-rinse the entire vehicle to loosen surface dirt and road grime before applying any cleaning solution.",
        },
        {
          step: "02",
          title: "Exterior Wash",
          description: "We wash the exterior using pressure, nozzle distance, and technique selected for the finish and visible condition of the vehicle.",
        },
        {
          step: "03",
          title: "Final Rinse & Inspection",
          description: "We complete a final rinse and inspect the exterior with you, noting any bonded contamination, oxidation, chips, or staining outside the scope of an exterior wash.",
        },
      ]}
      faqs={[
        {
          question: "Will pressure washing damage my car's paint?",
          answer: "Incorrect pressure or nozzle distance can damage paint, trim, decals, or loose finishes. We inspect the visible condition and adjust the washing method, but pre-existing chips, peeling clear coat, loose decals, and damaged trim require special care.",
        },
        {
          question: "Do you come to my location?",
          answer: "Yes. We bring all the equipment we need and can wash your vehicle at your home, driveway, or property. No need to take it anywhere.",
        },
        {
          question: "What types of vehicles do you wash?",
          answer: "We wash cars, trucks, SUVs, vans, and other standard vehicles. Contact us if you have a specialty vehicle or equipment you'd like cleaned and we'll let you know if we can accommodate it.",
        },
        {
          question: "Is this an interior detail service too?",
          answer: "No — we focus on exterior washing only. We don't offer interior detailing at this time.",
        },
      ]}
      relatedServices={[
        { title: "Driveway Cleaning", href: "/driveway-cleaning" },
        { title: "Deck Cleaning", href: "/deck-cleaning" },
        { title: "Siding & Exterior Washing", href: "/siding-washing" },
        { title: "Service Areas", href: "/service-areas" },
      ]}
    />
  );
}
