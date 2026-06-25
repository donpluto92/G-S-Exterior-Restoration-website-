import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLanguage(saved);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    home: 'HOME',
    services: 'SERVICES',
    estimator: 'ESTIMATOR',
    about: 'ABOUT',
    contact: 'CONTACT',
    bookEstimate: 'BOOK A FREE ESTIMATE',
    viewServices: 'VIEW OUR SERVICES',
    heroTitle: 'Professional Pressure Washing',
    heroSubtitle: 'in Mexico, Missouri.',
    heroDesc: 'G&S Exterior Restoration is your trusted local pressure washing company serving Mexico, MO and all of Mid-Missouri. We specialize in professional driveway cleaning, deck washing, siding restoration, and vehicle washing. Every job is fully insured, backed by free estimates, and guaranteed to deliver results you can see from the street. Whether you\'re in Audrain County or the surrounding communities, we bring professional-grade equipment and years of expertise to restore your property\'s curb appeal.',
    whatWeDo: 'What We Do',
    ourServices: 'Our Services',
    servicesDesc: 'Every service includes a free estimate. We use the right equipment and technique for each surface — no guesswork, no damage.',
    drivewayTitle: 'Driveway Cleaning Mexico, MO',
    drivewayDesc: 'Professional pressure washing for concrete driveways in Mexico, MO and Mid-Missouri. We remove dirt, algae, oil stains, and grime to restore your driveway to like-new condition and dramatically boost curb appeal.',
    deckTitle: 'Deck Cleaning Mexico, MO',
    deckDesc: 'Professional deck washing for wood and composite surfaces in Mexico, MO. We remove dirt, algae, mildew, and slippery buildup — leaving your outdoor space cleaner, safer, and better looking.',
    sidingTitle: 'Siding Washing Mexico, MO',
    sidingDesc: 'Safe, effective soft washing for vinyl siding and exterior surfaces in Mexico, MO. We remove mold, mildew, algae, and built-up dirt without harsh, unnecessary pressure.',
    vehicleTitle: 'Vehicle Washing Mexico, MO',
    vehicleDesc: 'Professional exterior vehicle washing in Mexico, MO to remove road grime, dirt, salt, and everyday buildup. Keep your cars, trucks, and vehicles looking clean and well maintained.',
    learnMore: 'Learn More →',
    freeEstimate: 'All Services Include a Free Estimate — No Obligation',
    aboutUs: 'About Us',
    honestWork: 'Quality. Local. Dependable.',
    aboutDesc: 'G&S Exterior Restoration is a fully insured professional pressure washing company proudly serving Mexico, MO and all of Mid-Missouri. We specialize in driveway pressure washing, professional siding washing, deck cleaning, patio cleaning, vehicle washing, and comprehensive exterior restoration services. With years of experience in the pressure washing industry and a commitment to quality, we\'ve become the trusted choice for homeowners and property managers throughout Audrain County and surrounding communities who demand professional results.\n\nWe understand how much of a difference professional pressure washing makes to your property. Our exterior cleaning services are designed to remove years of dirt, algae, mold, and grime — improving curb appeal, refreshing your property\'s appearance, and helping your home or business look well maintained year-round. At G&S, we believe in honest work, dependable service, and delivering pressure washing results you can see from the street. Whether it\'s concrete driveway cleaning, soft washing for delicate siding, or professional vehicle washing, we bring professional-grade equipment and expertise to every job.',
    fullyInsured: 'Fully Insured',
    everyJobEveryTime: 'Every job, every time',
    estimateCost: 'Estimate Cost',
    freeQuotes: 'Free quotes always',
    bookOnline: 'Book Online',
    anytimeAnyDevice: 'Anytime, any device',
    mexicoAndBeyond: 'Mexico & Beyond',
    proudlyLocal: 'Proudly local',
    customerReviews: 'Customer Reviews',
    whatOurCustomersSay: 'What Our Customers Say',
    whyChooseUs: 'Why Choose Us',
    theGSDifference: 'The G&S Difference',
    honestPricing: 'Honest Pricing',
    honestPricingDesc: 'No hidden fees, no surprises. Every job starts with a free estimate so you know exactly what to expect before we begin.',
    localDependable: 'Local & Dependable',
    localDependableDesc: 'We\'re your neighbors in Mexico, MO. We show up on time, do the job right, and stand behind our work every single time.',
    safeForProperty: 'Safe for Your Property',
    safeForPropertyDesc: 'We use the right pressure and techniques for each surface — no unnecessary force that could damage siding, wood, or paint.',
    resultsYouCanSee: 'Results You Can See',
    resultsYouCanSeeDesc: 'From the street to the backyard, we deliver a transformation you\'ll notice immediately. Clean exteriors, year-round.',
    getInTouch: 'Get In Touch',
    readyForEstimate: 'Ready for a Free Estimate?',
    readyForEstimateDesc: 'Call, text, email, or book online — we\'re available 24/7. We\'ll get back to you quickly with a no-obligation estimate for your project.',
    phone: 'Phone / Text',
    email: 'Email',
    serviceArea: 'Service Area',
    mexicoMOAreas: 'Mexico, MO & Surrounding Areas',
    bookYourEstimate: 'Book Your Free Estimate',
    pickTime: 'Pick a time that works for you and it goes straight to our calendar. We\'ll confirm and show up ready to work.',
    chooseDateTime: 'Choose a date & time',
    pickAnySlot: 'Pick any available slot on our calendar',
    addYourDetails: 'Add your details',
    nameAddressService: 'Name, address, and service needed',
    weConfirm: 'We confirm & show up',
    youGetConfirmation: 'You\'ll get a confirmation — we handle the rest',
    scheduleOnGoogle: 'Schedule on Google Calendar',
    preferToCall: 'Prefer to call or text?',
    getYourPhotoQuote: 'Request a Fast Photo Quote',
    uploadPhotosEstimate: 'Send photos and job details so we can review your surfaces and reply with a clean, accurate estimate.',
    disclaimer: 'Photos help us quote faster. Final pricing may vary based on access, condition, and on-site details.',
    howItWorks: 'How It Works',
    uploadPhotos: 'Upload Photos: Take clear photos of the area you want cleaned',
    reviewStep: 'Review: We check surface type, size, condition, and job notes',
    quoteReply: 'Quote Reply: Get a practical estimate without unnecessary back-and-forth',
    bookOrContact: 'Book or Contact: Schedule your service or ask any follow-up questions',
    questions: 'Questions? Call us at',
    callUsToday: 'Call Us Today',
    sendEmail: 'Send an Email',
  },
  es: {
    home: 'INICIO',
    services: 'SERVICIOS',
    estimator: 'ESTIMADOR',
    about: 'ACERCA DE',
    contact: 'CONTACTO',
    bookEstimate: 'RESERVAR ESTIMACIÓN GRATUITA',
    viewServices: 'VER NUESTROS SERVICIOS',
    heroTitle: 'Limpieza Profesional con Presión',
    heroSubtitle: 'en México, Missouri.',
    heroDesc: 'G&S Exterior Restoration es su empresa local de confianza en limpieza con presión que sirve a México, MO y todo Mid-Missouri. Nos especializamos en limpieza profesional de entradas, lavado de terrazas, restauración de revestimiento y lavado de vehículos. Cada trabajo está completamente asegurado, respaldado por estimaciones gratuitas y garantizado para entregar resultados que pueda ver desde la calle. Ya sea que esté en el condado de Audrain o en las comunidades circundantes, traemos equipos de grado profesional y años de experiencia para restaurar el atractivo de su propiedad.',
    whatWeDo: 'Lo Que Hacemos',
    ourServices: 'Nuestros Servicios',
    servicesDesc: 'Cada servicio incluye una estimación gratuita. Utilizamos el equipo y la técnica correcta para cada superficie — sin conjeturas, sin daño.',
    drivewayTitle: 'Limpieza de Entradas México, MO',
    drivewayDesc: 'Limpieza profesional con presión para entradas de concreto en México, MO y Mid-Missouri. Eliminamos suciedad, algas, manchas de aceite y mugre para restaurar su entrada a condición como nueva y aumentar dramáticamente el atractivo.',
    deckTitle: 'Limpieza de Terrazas México, MO',
    deckDesc: 'Lavado profesional de terrazas para superficies de madera y compuestas en México, MO. Eliminamos suciedad, algas, moho y acumulación resbaladiza — dejando su espacio al aire libre más limpio, seguro y de mejor aspecto.',
    sidingTitle: 'Lavado de Revestimiento México, MO',
    sidingDesc: 'Lavado suave y efectivo para revestimiento de vinilo y superficies exteriores en México, MO. Eliminamos moho, hongos, algas y suciedad acumulada sin presión dura e innecesaria.',
    vehicleTitle: 'Lavado de Vehículos México, MO',
    vehicleDesc: 'Lavado exterior profesional de vehículos en México, MO para eliminar suciedad de carretera, polvo, sal y acumulación diaria. Mantenga sus autos, camiones y vehículos limpios y bien mantenidos.',
    learnMore: 'Aprende Más →',
    freeEstimate: 'Todos los Servicios Incluyen una Estimación Gratuita — Sin Obligación',
    aboutUs: 'Acerca de Nosotros',
    honestWork: 'Calidad. Local. Confiable.',
    aboutDesc: 'G&S Exterior Restoration es una empresa profesional de limpieza con presión completamente asegurada que sirve con orgullo a México, MO y todo Mid-Missouri. Nos especializamos en limpieza con presión de entradas, lavado profesional de revestimiento, limpieza de terrazas, limpieza de patios, lavado de vehículos y servicios integrales de restauración exterior. Con años de experiencia en la industria de limpieza con presión y un compromiso con la calidad, nos hemos convertido en la opción confiable para propietarios y administradores de propiedades en todo el condado de Audrain y comunidades circundantes que exigen resultados profesionales.\n\nEntendemos cuánta diferencia hace la limpieza profesional con presión en su propiedad. Nuestros servicios de limpieza exterior están diseñados para eliminar años de suciedad, algas, moho y mugre — mejorando el atractivo, refrescando la apariencia de su propiedad y ayudando a que su hogar o negocio se vea bien mantenido todo el año. En G&S, creemos en el trabajo honesto, el servicio confiable y la entrega de resultados de limpieza con presión que pueda ver desde la calle. Ya sea limpieza con presión de concreto, lavado suave de revestimiento delicado o lavado profesional de vehículos, traemos equipos de grado profesional y experiencia a cada trabajo.',
    fullyInsured: 'Completamente Asegurado',
    everyJobEveryTime: 'Cada trabajo, cada vez',
    estimateCost: 'Costo de Estimación',
    freeQuotes: 'Presupuestos gratuitos siempre',
    bookOnline: 'Reservar en Línea',
    anytimeAnyDevice: 'En cualquier momento, cualquier dispositivo',
    mexicoAndBeyond: 'México y Más Allá',
    proudlyLocal: 'Orgullosamente local',
    customerReviews: 'Reseñas de Clientes',
    whatOurCustomersSay: 'Lo Que Dicen Nuestros Clientes',
    whyChooseUs: 'Por Qué Elegirnos',
    theGSDifference: 'La Diferencia de G&S',
    honestPricing: 'Precios Honestos',
    honestPricingDesc: 'Sin tarifas ocultas, sin sorpresas. Cada trabajo comienza con una estimación gratuita para que sepa exactamente qué esperar antes de que comencemos.',
    localDependable: 'Local y Confiable',
    localDependableDesc: 'Somos sus vecinos en México, MO. Llegamos a tiempo, hacemos el trabajo bien y respaldamos nuestro trabajo cada vez.',
    safeForProperty: 'Seguro para Su Propiedad',
    safeForPropertyDesc: 'Utilizamos la presión y técnicas correctas para cada superficie — sin fuerza innecesaria que pudiera dañar revestimiento, madera o pintura.',
    resultsYouCanSee: 'Resultados Que Pueda Ver',
    resultsYouCanSeeDesc: 'De la calle al patio, entregamos una transformación que notará inmediatamente. Exteriores limpios, todo el año.',
    getInTouch: 'Póngase en Contacto',
    readyForEstimate: '¿Listo para una Estimación Gratuita?',
    readyForEstimateDesc: 'Llame, envíe un mensaje de texto, correo electrónico o reserve en línea — estamos disponibles 24/7. Nos comunicaremos con usted rápidamente con una estimación sin obligación para su proyecto.',
    phone: 'Teléfono / Texto',
    email: 'Correo Electrónico',
    serviceArea: 'Área de Servicio',
    mexicoMOAreas: 'México, MO y Áreas Circundantes',
    bookYourEstimate: 'Reservar Su Estimación Gratuita',
    pickTime: 'Elija una hora que le funcione y va directamente a nuestro calendario. Confirmaremos y llegaremos listos para trabajar.',
    chooseDateTime: 'Elige una fecha y hora',
    pickAnySlot: 'Elige cualquier espacio disponible en nuestro calendario',
    addYourDetails: 'Añade tus detalles',
    nameAddressService: 'Nombre, dirección y servicio necesario',
    weConfirm: 'Confirmamos y llegamos',
    youGetConfirmation: 'Recibirá una confirmación — nos encargamos del resto',
    scheduleOnGoogle: 'Programar en Calendario de Google',
    preferToCall: '¿Prefiere llamar o enviar un mensaje de texto?',
    getYourPhotoQuote: 'Solicite una Cotización Rápida con Fotos',
    uploadPhotosEstimate: 'Envíe fotos y detalles del trabajo para que podamos revisar sus superficies y responder con una estimación clara.',
    disclaimer: 'Las fotos nos ayudan a cotizar más rápido. El precio final puede variar según acceso, condición y detalles en el sitio.',
    howItWorks: 'Cómo Funciona',
    uploadPhotos: 'Cargar Fotos: Tome fotos claras del área que desea limpiar',
    reviewStep: 'Revisión: Revisamos el tipo de superficie, tamaño, condición y notas del trabajo',
    quoteReply: 'Respuesta de Cotización: Reciba una estimación práctica sin mensajes innecesarios',
    bookOrContact: 'Reservar o Contactar: Programe su servicio o haga preguntas de seguimiento',
    questions: '¿Preguntas? Llámenos al',
    callUsToday: 'Llámenos Hoy',
    sendEmail: 'Enviar un Correo Electrónico',
  },
};
