import ServiceLayout from "@/components/ServiceLayout";

const VEHICLE_IMG = "/images/vehicle-wash.jpg";

export default function VehicleWashing() {
  return (
    <ServiceLayout
      title="Vehicle Washing"
      subtitle="Mexico, MO."
      metaDescription="Professional exterior vehicle washing in Mexico, MO. Remove road grime, dirt, salt, and buildup from cars, trucks, and more. Free estimates. G&S Exterior Restoration."
      heroImg={VEHICLE_IMG}
      intro="Road salt, mud, grime, and everyday buildup take a toll on your vehicle's finish. G&S Exterior Restoration provides professional exterior vehicle washing to keep your cars, trucks, and other vehicles looking clean and well maintained — right at your home or property."
      benefits={[
        "Removes road grime, dirt, salt, and seasonal buildup",
        "Safe pressure levels appropriate for vehicle paint and finishes",
        "Exterior wash for cars, trucks, SUVs, and work vehicles",
        "Convenient — we come to your location",
        "Helps prevent rust and long-term paint damage from salt",
        "Quick turnaround — most vehicles done in under an hour",
        "Free estimate — no obligation",
        "Fully insured service in Mexico, MO and surrounding areas",
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
            "We wash the exterior using appropriate pressure and technique for vehicle paint — removing dirt, salt, and buildup from all panels, wheels, and lower body areas.",
        },
        {
          step: "03",
          title: "Final Rinse & Inspection",
          description:
            "We do a thorough final rinse and inspect the vehicle with you to make sure every panel is clean and you're satisfied with the results.",
        },
      ]}
      faqs={[
        {
          question: "Will pressure washing damage my car's paint?",
          answer:
            "No — we use pressure levels and nozzle distances that are safe for automotive paint. We never use high-pressure wands at close range on vehicle panels.",
        },
        {
          question: "Do you come to my location?",
          answer:
            "Yes. We bring all the equipment we need and can wash your vehicle at your home, driveway, or property. No need to take it anywhere.",
        },
        {
          question: "What types of vehicles do you wash?",
          answer:
            "We wash cars, trucks, SUVs, vans, and other standard vehicles. Contact us if you have a specialty vehicle or equipment you'd like cleaned and we'll let you know if we can accommodate it.",
        },
        {
          question: "Is this an interior detail service too?",
          answer:
            "No — we focus on exterior washing only. We don't offer interior detailing at this time.",
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
