import Navbar from "@/components/Navbar";
import CertificationBanner from "@/components/CertificationBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { localBusinessSchema, useSeo } from "@/lib/seo";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "wouter";

const CALENDAR_URL = "https://calendar.app.google/YmtAenZ1D6f8BQ8h9";
const CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3FmOoLJoY02j7ZELu4MQxepKxpasvsL4QaOdcvFZypGPC4pm08rsFiSA1VxZUlDR4ICF33AHav?gv=true";

const bookingCopy = {
  en: {
    back: "Back to Home",
    eyebrow: "On-Site Estimate",
    title: "Schedule a Free On-Site Estimate",
    intro:
      "Choose a time for Darren to inspect the project in person, discuss the requested work, and prepare an estimate.",
    clarification:
      "This appointment is for an estimate visit—not the cleaning service itself. The appointment is confirmed before arrival.",
    photoTitle: "Photos may be all you need",
    photoText:
      "For straightforward projects, the photo-quote form is usually the fastest way to get started.",
    photoButton: "Request a Photo Quote",
    beforeTitle: "Before you schedule",
    steps: [
      "Choose an available date and time.",
      "Add your name, property address, and the surface you need cleaned.",
      "Watch for confirmation before the estimate visit.",
    ],
    location:
      "Based in Mexico, Missouri. Estimate visits outside Mexico are available depending on project size, distance, and scheduling.",
    scheduleTitle: "Choose an Appointment Time",
    scheduleText:
      "Use the Google Calendar scheduler below. If it does not load, open the booking page directly.",
    openCalendar: "Open Google Calendar",
    callTitle: "Need help choosing?",
    callText:
      "Call or text before scheduling if you are unsure whether the project needs an on-site visit.",
    privacy:
      "Booking details are submitted through Google Calendar and used to arrange your estimate visit.",
  },
  es: {
    back: "Volver al Inicio",
    eyebrow: "Estimación en el Sitio",
    title: "Programe una Estimación Gratuita en el Sitio",
    intro:
      "Elija una hora para que Darren inspeccione el proyecto en persona, hable sobre el trabajo solicitado y prepare una estimación.",
    clarification:
      "Esta cita es para una visita de estimación, no para realizar el servicio de limpieza. Confirmaremos la cita antes de llegar.",
    photoTitle: "Las fotos pueden ser suficientes",
    photoText:
      "Para proyectos sencillos, el formulario de cotización por foto suele ser la forma más rápida de comenzar.",
    photoButton: "Solicitar Cotización por Foto",
    beforeTitle: "Antes de programar",
    steps: [
      "Elija una fecha y hora disponibles.",
      "Agregue su nombre, dirección y la superficie que necesita limpiar.",
      "Espere la confirmación antes de la visita de estimación.",
    ],
    location:
      "Con sede en México, Missouri. Las visitas de estimación fuera de México están disponibles según el tamaño del proyecto, la distancia y la disponibilidad.",
    scheduleTitle: "Elija una Hora para la Cita",
    scheduleText:
      "Use el calendario de Google a continuación. Si no carga, abra la página de reservaciones directamente.",
    openCalendar: "Abrir Calendario de Google",
    callTitle: "¿Necesita ayuda para elegir?",
    callText:
      "Llame o envíe un mensaje antes de programar si no sabe si el proyecto necesita una visita en el sitio.",
    privacy:
      "Los detalles de la reservación se envían por Google Calendar y se utilizan para coordinar su visita de estimación.",
  },
} as const;

export default function Booking() {
  const { language } = useLanguage();
  const copy = bookingCopy[language];
  const calendarEmbedUrl = `${CALENDAR_EMBED_URL}&hl=${language}`;

  useSeo({
    path: "/booking",
    schema: localBusinessSchema,
  });

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.98 0.015 80)" }}
    >
      <Navbar />

      <main>
        <section
          className="relative overflow-hidden py-20 sm:py-24"
          style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, oklch(0.72 0.12 75 / 0.35), transparent 34%)",
            }}
          />
          <div className="container relative z-10">
            <Link href="/">
              <a
                className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-80 transition hover:opacity-100"
                style={{ color: "oklch(0.82 0.10 75)" }}
              >
                <ArrowLeft size={14} /> {copy.back}
              </a>
            </Link>

            <div className="max-w-3xl">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  color: "oklch(0.82 0.10 75)",
                  borderColor: "oklch(0.72 0.12 75 / 0.45)",
                  backgroundColor: "oklch(0.72 0.12 75 / 0.1)",
                }}
              >
                <CalendarDays size={15} /> {copy.eyebrow}
              </div>
              <h1
                className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                style={{
                  color: "oklch(0.98 0.015 80)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {copy.title}
              </h1>
              <p
                className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
                style={{ color: "oklch(0.82 0.025 80)" }}
              >
                {copy.intro}
              </p>
              <div
                className="mt-6 flex max-w-2xl items-start gap-3 rounded-lg border p-4 text-sm leading-relaxed"
                style={{
                  color: "oklch(0.92 0.02 80)",
                  borderColor: "oklch(0.72 0.12 75 / 0.3)",
                  backgroundColor: "oklch(0.26 0.06 155)",
                }}
              >
                <Clock
                  className="mt-0.5 shrink-0"
                  size={19}
                  style={{ color: "oklch(0.82 0.10 75)" }}
                />
                <p>{copy.clarification}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container grid gap-8 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] lg:items-start">
            <aside className="space-y-6 lg:sticky lg:top-6">
              <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <Camera size={26} className="text-emerald-800" />
                <h2
                  className="mt-4 text-2xl font-bold text-emerald-950"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {copy.photoTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {copy.photoText}
                </p>
                <a
                  href="/#estimator"
                  className="btn-gold mt-5 block rounded-sm text-center"
                >
                  <Camera size={15} className="mr-2 inline" />
                  {copy.photoButton}
                </a>
              </div>

              <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
                <h2 className="text-xl font-bold text-emerald-950">
                  {copy.beforeTitle}
                </h2>
                <ol className="mt-5 space-y-4">
                  {copy.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{
                          color: "oklch(0.20 0.06 155)",
                          backgroundColor: "oklch(0.82 0.10 75)",
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="pt-1 text-sm leading-relaxed text-slate-700">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-start gap-2 border-t border-stone-200 pt-5 text-sm text-slate-600">
                  <MapPin
                    className="mt-0.5 shrink-0 text-emerald-800"
                    size={17}
                  />
                  <span>{copy.location}</span>
                </div>
              </div>

              <div
                className="rounded-xl p-6"
                style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
              >
                <h2 className="text-lg font-bold text-white">
                  {copy.callTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {copy.callText}
                </p>
                <a
                  href="tel:3144670332"
                  className="btn-outline-gold mt-5 block rounded-sm text-center"
                >
                  <Phone size={15} className="mr-2 inline" />
                  (314) 467-0332
                </a>
              </div>
            </aside>

            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl">
              <div className="border-b border-stone-200 p-6 sm:p-8">
                <h2
                  className="text-3xl font-bold text-emerald-950"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {copy.scheduleTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {copy.scheduleText}
                </p>
              </div>

              <iframe
                src={calendarEmbedUrl}
                title="G&S Exterior Restoration on-site estimate scheduler"
                className="block h-[760px] w-full border-0"
                loading="eager"
              />

              <div className="border-t border-stone-200 bg-stone-50 p-5 text-center">
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-emerald-900 underline decoration-amber-600 underline-offset-4"
                >
                  {copy.openCalendar} <ExternalLink size={15} />
                </a>
                <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-500">
                  {copy.privacy}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer
          className="border-t py-12"
          style={{
            borderColor: "oklch(0.35 0.08 155)",
            backgroundColor: "oklch(0.15 0.05 155)",
          }}
        >
          <div className="container">
            <CertificationBanner />

            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.72 0.12 75)" }}
                >
                  G&amp;S Exterior Restoration LLC
                </p>
                <p className="mt-1 text-sm text-white/60">Mexico, Missouri</p>
              </div>
              <div className="flex flex-wrap justify-center gap-5 text-sm">
                <a
                  href="tel:3144670332"
                  className="text-white/80 hover:text-white"
                >
                  (314) 467-0332
                </a>
                <Link href="/">
                  <a className="text-white/80 hover:text-white">Home</a>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
