import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "en" || saved === "es")) {
      setLanguage(saved);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    home: "HOME",
    services: "SERVICES",
    estimator: "ESTIMATOR",
    about: "ABOUT",
    contact: "CONTACT",
    bookEstimate: "BOOK A FREE ESTIMATE",
    viewServices: "VIEW OUR SERVICES",
    requestPhotoQuote: "REQUEST A PHOTO QUOTE",
    callOrText: "CALL OR TEXT",
    heroTitle: "Exterior Cleaning",
    heroSubtitle: "in Mexico, Missouri.",
    heroDesc:
      "Siding, concrete, decks, patios, walkways, and vehicles cleaned with a method selected for the surface and its condition.",
    whatWeDo: "What We Do",
    ourServices: "Exterior Cleaning Services",
    servicesDesc:
      "Choose the surface you need cleaned. Each project starts with a free estimate and a review of the material, buildup, access, and condition.",
    drivewayTitle: "Driveway & Concrete Cleaning",
    drivewayDesc:
      "Cleaning for concrete driveways, sidewalks, and common surface buildup, with stain treatment available when appropriate.",
    deckTitle: "Deck & Patio Cleaning",
    deckDesc:
      "Cleaning for wood, composite, and patio surfaces using an approach selected for the material and current condition.",
    sidingTitle: "House & Siding Washing",
    sidingDesc:
      "Lower-pressure cleaning for siding and exterior surfaces, adjusted for the material, organic growth, access, and condition.",
    vehicleTitle: "Vehicle Washing",
    vehicleDesc:
      "Exterior washing for cars, trucks, and work vehicles with attention to the finish, visible buildup, and existing condition.",
    learnMore: "Learn More →",
    freeEstimate: "All Services Include a Free Estimate — No Obligation",
    aboutUs: "About Us",
    honestWork: "Owner-Operated Exterior Cleaning",
    aboutDesc:
      "G&S Exterior Restoration is an owner-operated exterior-cleaning business based in Mexico, Missouri. Darren handles estimates, communicates directly with customers, and oversees the work on every project. Each surface is evaluated before cleaning so the approach can be adjusted for the material, buildup, access, and current condition.\n\nServices include siding washing, concrete cleaning, deck and patio cleaning, walkway cleaning, and exterior vehicle washing. We provide clear estimates and explain where oxidation, deep staining, age, or previous damage may affect the final result.",
    ownerOperatedTrust: "Owner-Operated",
    freeEstimatesTrust: "Free Estimates",
    surfaceMethodsTrust: "Surface-Specific Methods",
    photoQuotesTrust: "Photo Quotes Available",
    needHelpChoosing: "Not Sure Which Service Fits?",
    serviceSelectionHelp:
      "Send photos of the area and choose the closest service. We can confirm the right category after reviewing the project.",
    estimateProcess: "How Estimates and Service Work",
    chooseEstimateMethod: "Send Photos or Schedule a Visit",
    chooseEstimateMethodDesc:
      "Use the photo form or choose an on-site estimate when the project needs a closer look.",
    receiveWrittenEstimate: "Receive a Clear Estimate",
    receiveWrittenEstimateDesc:
      "We review the surface, access, condition, and requested work before outlining the scope and price.",
    confirmScopeSchedule: "Confirm the Work",
    confirmScopeScheduleDesc:
      "Approve the estimate, confirm property access, and choose the service appointment.",
    reviewCompletedWork: "Review the Result",
    reviewCompletedWorkDesc:
      "We inspect the cleaned areas and note any remaining staining, oxidation, wear, or previous damage.",
    customerReviews: "Real Project Results",
    whatOurCustomersSay: "Before-and-After Cleaning Results",
    whyChooseUs: "Why Choose Us",
    theGSDifference: "The G&S Difference",
    honestPricing: "Honest Pricing",
    honestPricingDesc:
      "Every job starts with a clear estimate. If site conditions change the scope, we discuss it with you before proceeding.",
    localDependable: "Local & Direct",
    localDependableDesc:
      "G&S is owner-operated in Mexico, Missouri, with direct communication from the estimate through the completed work.",
    safeForProperty: "Surface-Aware Cleaning",
    safeForPropertyDesc:
      "Pressure, cleaning method, and treatment are selected after considering the material, buildup, access, and existing condition.",
    resultsYouCanSee: "Realistic Expectations",
    resultsYouCanSeeDesc:
      "We explain what cleaning can address and where oxidation, staining, age, or previous damage may limit the final result.",
    getInTouch: "Get In Touch",
    readyForEstimate: "Ready for a Free Estimate?",
    readyForEstimateDesc:
      "Call, text, email, send project photos, or choose a time for an on-site estimate. We'll review the details and reply as soon as possible.",
    phone: "Phone / Text",
    email: "Email",
    serviceArea: "Service Area",
    mexicoMOAreas: "Mexico, Missouri",
    bookYourEstimate: "Book Your Free Estimate",
    pickTime:
      "Choose an available time for a free on-site estimate. We'll confirm the appointment before arriving.",
    chooseDateTime: "Choose a date & time",
    pickAnySlot: "Pick any available slot on our calendar",
    addYourDetails: "Add your details",
    nameAddressService: "Name, address, and service needed",
    weConfirm: "We confirm the estimate visit",
    youGetConfirmation: "You'll receive confirmation before the appointment",
    scheduleOnGoogle: "Schedule on Google Calendar",
    preferToCall: "Prefer to call or text?",
    getYourPhotoQuote: "Request a Fast Photo Quote",
    uploadPhotosEstimate:
      "Send photos and job details so we can review your surfaces and reply with a clean, accurate estimate.",
    disclaimer:
      "Photos help us quote faster. Final pricing may vary based on access, condition, and on-site details.",
    howItWorks: "How It Works",
    uploadPhotos:
      "Upload Photos: Take clear photos of the area you want cleaned",
    reviewStep: "Review: We check surface type, size, condition, and job notes",
    quoteReply:
      "Quote Reply: Get a practical estimate without unnecessary back-and-forth",
    bookOrContact:
      "Book or Contact: Schedule your service or ask any follow-up questions",
    questions: "Questions? Call us at",
    callUsToday: "Call Us Today",
    sendEmail: "Send an Email",
  },
  es: {
    home: "INICIO",
    services: "SERVICIOS",
    estimator: "ESTIMADOR",
    about: "ACERCA DE",
    contact: "CONTACTO",
    bookEstimate: "RESERVAR ESTIMACIÓN GRATUITA",
    viewServices: "VER NUESTROS SERVICIOS",
    requestPhotoQuote: "SOLICITAR COTIZACIÓN POR FOTO",
    callOrText: "LLAMAR O ENVIAR MENSAJE",
    heroTitle: "Limpieza Exterior",
    heroSubtitle: "en México, Missouri.",
    heroDesc:
      "Revestimiento, concreto, terrazas, patios, caminos y vehículos limpiados con un método elegido según la superficie y su condición.",
    whatWeDo: "Lo Que Hacemos",
    ourServices: "Servicios de Limpieza Exterior",
    servicesDesc:
      "Elija la superficie que necesita limpiar. Cada proyecto comienza con una estimación gratuita y una revisión del material, la acumulación, el acceso y la condición.",
    drivewayTitle: "Limpieza de Entradas y Concreto",
    drivewayDesc:
      "Limpieza de entradas, aceras y acumulación común en concreto, con tratamiento de manchas cuando sea apropiado.",
    deckTitle: "Limpieza de Terrazas y Patios",
    deckDesc:
      "Limpieza de madera, material compuesto y patios con un método elegido para el material y su condición actual.",
    sidingTitle: "Lavado de Casas y Revestimiento",
    sidingDesc:
      "Limpieza de menor presión para revestimiento y superficies exteriores, ajustada al material, crecimiento orgánico, acceso y condición.",
    vehicleTitle: "Lavado de Vehículos",
    vehicleDesc:
      "Lavado exterior de autos, camionetas y vehículos de trabajo con atención al acabado, acumulación visible y condición existente.",
    learnMore: "Aprende Más →",
    freeEstimate:
      "Todos los Servicios Incluyen una Estimación Gratuita — Sin Obligación",
    aboutUs: "Acerca de Nosotros",
    honestWork: "Limpieza Exterior Operada por el Propietario",
    aboutDesc:
      "G&S Exterior Restoration es una empresa de limpieza exterior operada por su propietario y ubicada en México, Missouri. Darren prepara las estimaciones, se comunica directamente con los clientes y supervisa el trabajo en cada proyecto. Evaluamos cada superficie antes de limpiar para ajustar el método al material, acumulación, acceso y condición actual.\n\nLos servicios incluyen lavado de revestimiento, limpieza de concreto, terrazas, patios y caminos, además de lavado exterior de vehículos. Damos estimaciones claras y explicamos cuando la oxidación, manchas profundas, edad o daños previos puedan limitar el resultado final.",
    ownerOperatedTrust: "Operada por el Propietario",
    freeEstimatesTrust: "Estimaciones Gratuitas",
    surfaceMethodsTrust: "Métodos Según la Superficie",
    photoQuotesTrust: "Cotizaciones por Foto",
    needHelpChoosing: "¿No Sabe Qué Servicio Elegir?",
    serviceSelectionHelp:
      "Envíe fotos del área y elija el servicio más cercano. Podemos confirmar la categoría después de revisar el proyecto.",
    estimateProcess: "Cómo Funcionan las Estimaciones y el Servicio",
    chooseEstimateMethod: "Envíe Fotos o Programe una Visita",
    chooseEstimateMethodDesc:
      "Use el formulario de fotos o elija una estimación en el sitio cuando el proyecto necesite una revisión más cercana.",
    receiveWrittenEstimate: "Reciba una Estimación Clara",
    receiveWrittenEstimateDesc:
      "Revisamos la superficie, el acceso, la condición y el trabajo solicitado antes de explicar el alcance y el precio.",
    confirmScopeSchedule: "Confirme el Trabajo",
    confirmScopeScheduleDesc:
      "Apruebe la estimación, confirme el acceso a la propiedad y elija la cita de servicio.",
    reviewCompletedWork: "Revise el Resultado",
    reviewCompletedWorkDesc:
      "Inspeccionamos las áreas limpiadas y señalamos manchas, oxidación, desgaste o daños previos que permanezcan.",
    customerReviews: "Resultados de Proyectos Reales",
    whatOurCustomersSay: "Resultados de Limpieza Antes y Después",
    whyChooseUs: "Por Qué Elegirnos",
    theGSDifference: "La Diferencia de G&S",
    honestPricing: "Precios Honestos",
    honestPricingDesc:
      "Cada trabajo comienza con una estimación clara. Si las condiciones cambian el alcance, lo hablamos con usted antes de continuar.",
    localDependable: "Local y Directa",
    localDependableDesc:
      "G&S es una empresa de México, Missouri operada por su propietario, con comunicación directa desde la estimación hasta el trabajo terminado.",
    safeForProperty: "Limpieza Según la Superficie",
    safeForPropertyDesc:
      "Elegimos la presión, el método y el tratamiento después de considerar el material, la acumulación, el acceso y la condición existente.",
    resultsYouCanSee: "Expectativas Realistas",
    resultsYouCanSeeDesc:
      "Explicamos lo que la limpieza puede tratar y dónde la oxidación, manchas, edad o daños previos pueden limitar el resultado final.",
    getInTouch: "Póngase en Contacto",
    readyForEstimate: "¿Listo para una Estimación Gratuita?",
    readyForEstimateDesc:
      "Llame, envíe un mensaje de texto o correo electrónico, mande fotos del proyecto o elija una hora para una estimación en el sitio. Revisaremos los detalles y responderemos lo antes posible.",
    phone: "Teléfono / Texto",
    email: "Correo Electrónico",
    serviceArea: "Área de Servicio",
    mexicoMOAreas: "México, Missouri",
    bookYourEstimate: "Reservar Su Estimación Gratuita",
    pickTime:
      "Elija una hora disponible para una estimación gratuita en el sitio. Confirmaremos la cita antes de llegar.",
    chooseDateTime: "Elige una fecha y hora",
    pickAnySlot: "Elige cualquier espacio disponible en nuestro calendario",
    addYourDetails: "Añade tus detalles",
    nameAddressService: "Nombre, dirección y servicio necesario",
    weConfirm: "Confirmamos la visita de estimación",
    youGetConfirmation: "Recibirá una confirmación antes de la cita",
    scheduleOnGoogle: "Programar en Calendario de Google",
    preferToCall: "¿Prefiere llamar o enviar un mensaje de texto?",
    getYourPhotoQuote: "Solicite una Cotización Rápida con Fotos",
    uploadPhotosEstimate:
      "Envíe fotos y detalles del trabajo para que podamos revisar sus superficies y responder con una estimación clara.",
    disclaimer:
      "Las fotos nos ayudan a cotizar más rápido. El precio final puede variar según acceso, condición y detalles en el sitio.",
    howItWorks: "Cómo Funciona",
    uploadPhotos: "Cargar Fotos: Tome fotos claras del área que desea limpiar",
    reviewStep:
      "Revisión: Revisamos el tipo de superficie, tamaño, condición y notas del trabajo",
    quoteReply:
      "Respuesta de Cotización: Reciba una estimación práctica sin mensajes innecesarios",
    bookOrContact:
      "Reservar o Contactar: Programe su servicio o haga preguntas de seguimiento",
    questions: "¿Preguntas? Llámenos al",
    callUsToday: "Llámenos Hoy",
    sendEmail: "Enviar un Correo Electrónico",
  },
};
