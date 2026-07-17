import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Camera,
  Car,
  CheckCircle,
  ClipboardList,
  Clock,
  Droplets,
  Footprints,
  Home,
  Images,
  Layers,
  Loader2,
  MailCheck,
  MapPin,
  MessageSquareText,
  Ruler,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Step = "service" | "details" | "photos" | "review" | "success";
type ServiceType =
  | "driveway"
  | "deck"
  | "siding"
  | "vehicle"
  | "patio"
  | "walkway";

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 8;
const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
const MAX_REQUEST_PHOTO_SIZE = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

function PhotoPreview({ photo, index }: { photo: File; index: number }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(photo);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  return previewUrl ? (
    <img
      src={previewUrl}
      alt={`Selected project photo ${index + 1}`}
      className="h-28 w-full object-cover"
    />
  ) : (
    <div className="h-28 w-full animate-pulse bg-slate-100" />
  );
}

async function preparePhotoForUpload(photo: File) {
  if (
    photo.size <= 350 * 1024 &&
    ["image/jpeg", "image/png", "image/webp"].includes(photo.type)
  ) {
    return photo;
  }

  const sourceUrl = URL.createObjectURL(photo);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.decoding = "async";
      element.onload = () => resolve(element);
      element.onerror = () =>
        reject(
          new Error(
            "One selected photo could not be prepared. Try a JPG, PNG, or WebP version."
          )
        );
      element.src = sourceUrl;
    });

    const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = Math.min(1, 1280 / longestSide);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not prepare the selected photos");
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        result =>
          result
            ? resolve(result)
            : reject(new Error("Could not prepare the selected photos")),
        "image/jpeg",
        0.72
      );
    });

    const baseName = photo.name.replace(/\.[^.]+$/, "") || "project-photo";
    return new File([blob], `${baseName}.jpg`, {
      type: "image/jpeg",
      lastModified: photo.lastModified,
    });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

const services: Array<{
  id: ServiceType;
  label: string;
  hint: string;
  icon: LucideIcon;
}> = [
  {
    id: "driveway",
    label: "Driveway Cleaning",
    hint: "Concrete, black streaks, oil spots",
    icon: Droplets,
  },
  {
    id: "deck",
    label: "Deck Cleaning",
    hint: "Wood, composite, prep for stain",
    icon: Layers,
  },
  {
    id: "siding",
    label: "Siding Washing",
    hint: "House wash, algae, mildew",
    icon: Home,
  },
  {
    id: "vehicle",
    label: "Vehicle Washing",
    hint: "Fleet, work trucks, personal vehicles",
    icon: Car,
  },
  {
    id: "patio",
    label: "Patio Cleaning",
    hint: "Back patios, pads, outdoor spaces",
    icon: Sparkles,
  },
  {
    id: "walkway",
    label: "Walkway Cleaning",
    hint: "Sidewalks, paths, entrances",
    icon: Footprints,
  },
];

const steps: Array<{
  id: "service" | "details" | "send";
  label: string;
  icon: LucideIcon;
}> = [
  { id: "service", label: "Service", icon: ClipboardList },
  { id: "details", label: "Details", icon: Ruler },
  { id: "send", label: "Send", icon: MailCheck },
];

const conditions = [
  "Light dirt",
  "Moderate buildup",
  "Heavy staining",
  "Not sure",
];

const trustCues = [
  { icon: ShieldCheck, label: "Owner-operated service" },
  { icon: Camera, label: "Photos reviewed by hand" },
  { icon: MessageSquareText, label: "Clear reply, no pressure" },
];

export default function AIEstimator() {
  const [step, setStep] = useState<Step>("service");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    approximateSize: "",
    condition: "Not sure",
    timeline: "",
    notes: "",
  });

  const selectedService = useMemo(
    () => services.find(service => service.id === serviceType),
    [serviceType]
  );

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const phoneIsValid = formData.phone.replace(/\D/g, "").length >= 10;
  const detailsAreValid = Boolean(
    formData.fullName.trim() &&
      emailIsValid &&
      phoneIsValid &&
      formData.propertyAddress.trim()
  );
  const canSubmit = Boolean(
    serviceType && detailsAreValid && photos.length >= MIN_PHOTOS
  );

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(current => ({ ...current, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.length + photos.length > MAX_PHOTOS) {
      toast.error(`You can upload up to ${MAX_PHOTOS} photos`);
      return;
    }

    const unsupported = files.find(file => !ALLOWED_PHOTO_TYPES.has(file.type));
    if (unsupported) {
      toast.error("Use JPG, PNG, WebP, HEIC, or HEIF photos");
      return;
    }

    const oversized = files.find(file => file.size > MAX_PHOTO_SIZE);
    if (oversized) {
      toast.error("Each photo needs to be under 10MB");
      return;
    }

    setPhotos(current => [...current, ...files]);
    e.target.value = "";
  };

  const continueToPhotos = () => {
    if (!detailsAreValid) {
      toast.error(
        "Enter your name, a valid email, a 10-digit phone number, and the property address"
      );
      return;
    }
    setStep("photos");
  };

  const continueToReview = () => {
    if (photos.length < MIN_PHOTOS) {
      toast.error(`Add at least ${MIN_PHOTOS} clear project photos`);
      return;
    }
    setStep("review");
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const preparedPhotos: File[] = [];
      for (const photo of photos) {
        preparedPhotos.push(await preparePhotoForUpload(photo));
      }
      const preparedSize = preparedPhotos.reduce(
        (total, photo) => total + photo.size,
        0
      );
      if (preparedSize > MAX_REQUEST_PHOTO_SIZE) {
        throw new Error(
          "The prepared photos are still too large. Remove one or use simpler JPG images."
        );
      }

      const payload = new FormData();
      payload.append("serviceType", serviceType);
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      preparedPhotos.forEach(photo => {
        payload.append("photos", photo);
      });

      const response = await fetch("/api/quote-request", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const responseBody = await response
          .json()
          .catch(() => ({ error: "Could not send the quote request" }));
        throw new Error(
          typeof responseBody.error === "string"
            ? responseBody.error
            : "Could not send the quote request"
        );
      }

      setStep("success");
      toast.success("Quote request sent");
    } catch (error) {
      console.error("Quote request failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not send your request. Please call or text us."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="estimator-shell w-full px-4 py-16"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.28 0.07 155) 0%, oklch(0.23 0.06 155) 48%, oklch(0.28 0.07 155) 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-7 text-center text-white">
          <div className="estimator-eyebrow mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <Clock size={16} />
            Fast photo quote
          </div>
          <h2 className="text-3xl font-bold tracking-normal md:text-4xl">
            Request a Photo Quote
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
            Send the project details and a few clear photos. Darren reviews the
            surface and replies with an estimate or requests an on-site look
            when photos are not enough.
          </p>
          <div className="estimator-trust mx-auto mt-5 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
            {trustCues.map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <item.icon size={17} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="estimator-card overflow-hidden border-white/15 bg-white shadow-2xl">
          <div className="estimator-stepbar grid grid-cols-3 border-b bg-slate-50 text-center text-xs font-semibold uppercase tracking-normal text-slate-500">
            {steps.map(stepItem => {
              const isActive =
                stepItem.id === "service"
                  ? step === "service"
                  : stepItem.id === "details"
                    ? step === "details" || step === "photos"
                    : step === "review";
              return (
                <div
                  key={stepItem.id}
                  className={`estimator-step py-3 ${isActive ? "is-active" : ""}`}
                >
                  <span className="estimator-step-label">
                    <stepItem.icon size={15} />
                    {stepItem.label}
                  </span>
                </div>
              );
            })}
          </div>

          {step === "service" && (
            <div className="estimator-form-panel p-6 md:p-8">
              <h3 className="estimator-slide-title mb-2 text-2xl font-bold text-slate-950">
                <ClipboardList size={22} />
                What needs cleaned?
              </h3>
              <p className="mb-6 text-sm text-slate-600">
                Choose the closest match. You can add special notes before
                sending.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setServiceType(service.id);
                      setStep("details");
                    }}
                    className="estimator-service-option rounded-lg border border-slate-200 p-4 text-left transition hover:border-emerald-600 hover:bg-emerald-50"
                  >
                    <span className="estimator-service-icon" aria-hidden="true">
                      <service.icon size={20} />
                    </span>
                    <span className="block font-bold text-slate-950">
                      {service.label}
                    </span>
                    <span className="mt-1 block text-sm text-slate-600">
                      {service.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="estimator-form-panel p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {selectedService?.label}
                  </p>
                  <h3 className="estimator-slide-title text-2xl font-bold text-slate-950">
                    <Ruler size={22} />
                    Job details
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("service")}
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Back
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="quote-full-name"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Full name *
                  </label>
                  <input
                    id="quote-full-name"
                    name="fullName"
                    autoComplete="name"
                    required
                    maxLength={120}
                    value={formData.fullName}
                    onChange={e => updateField("fullName", e.target.value)}
                    className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Email *
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={formData.email}
                      onChange={e => updateField("email", e.target.value)}
                      className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Phone *
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      maxLength={40}
                      value={formData.phone}
                      onChange={e => updateField("phone", e.target.value)}
                      className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="(573) 555-0100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-address"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                  >
                    <MapPin size={16} />
                    Property address *
                  </label>
                  <input
                    id="quote-address"
                    name="propertyAddress"
                    autoComplete="street-address"
                    required
                    maxLength={300}
                    value={formData.propertyAddress}
                    onChange={e =>
                      updateField("propertyAddress", e.target.value)
                    }
                    className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="123 Main St, Mexico, Missouri 65265"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quote-size"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                    >
                      <Ruler size={16} />
                      Approximate size
                    </label>
                    <input
                      id="quote-size"
                      name="approximateSize"
                      maxLength={200}
                      value={formData.approximateSize}
                      onChange={e =>
                        updateField("approximateSize", e.target.value)
                      }
                      className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="2-car driveway, 20x20 patio..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quote-condition"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Condition
                    </label>
                    <select
                      id="quote-condition"
                      name="condition"
                      value={formData.condition}
                      onChange={e => updateField("condition", e.target.value)}
                      className="estimator-input estimator-select w-full rounded-lg border border-slate-300 px-4 py-3"
                    >
                      {conditions.map(condition => (
                        <option key={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-timeline"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Preferred timeline
                  </label>
                  <input
                    id="quote-timeline"
                    name="timeline"
                    maxLength={200}
                    value={formData.timeline}
                    onChange={e => updateField("timeline", e.target.value)}
                    className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="This week, before a party, flexible..."
                  />
                </div>

                <Button onClick={continueToPhotos} className="mt-2">
                  Continue to photos
                </Button>
              </div>
            </div>
          )}

          {step === "photos" && (
            <div className="estimator-form-panel p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Add 3–8 photos for a usable quote
                  </p>
                  <h3 className="estimator-slide-title text-2xl font-bold text-slate-950">
                    <Images size={22} />
                    Add job photos
                  </h3>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStep("details")}
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Back
                </Button>
              </div>

              <label
                htmlFor="photo-upload"
                className="estimator-upload block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-emerald-600 hover:bg-emerald-50"
              >
                <Upload className="mx-auto mb-3 text-emerald-700" size={34} />
                <span className="block font-bold text-slate-950">
                  Upload clear photos
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Include the full area, close-ups of heavy buildup, and access
                  around the surface.
                </span>
                <span className="mt-2 block text-xs text-slate-500">
                  JPG, PNG, WebP, HEIC, or HEIF · 10MB per original · Photos are
                  resized before sending
                </span>
                <input
                  id="photo-upload"
                  name="photos"
                  type="file"
                  multiple
                  required
                  accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {photos.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  {photos.map((photo, index) => (
                    <div
                      key={`${photo.name}-${index}`}
                      className="relative overflow-hidden rounded-lg border"
                    >
                      <PhotoPreview photo={photo} index={index} />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos(current =>
                            current.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-white"
                        aria-label="Remove photo"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <label
                  htmlFor="quote-notes"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Project notes
                </label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  maxLength={2000}
                  value={formData.notes}
                  onChange={e => updateField("notes", e.target.value)}
                  className="estimator-input w-full rounded-lg border border-slate-300 px-4 py-3"
                  rows={4}
                  placeholder="Gate codes, water access, problem areas, best time to contact you..."
                />
              </div>

              <div className="mt-5 space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-slate-700">
                <p>
                  <strong>What happens next:</strong> Darren reviews the details
                  and replies with an estimate or asks for an on-site look when
                  photos are not enough. Response timing depends on the current
                  work schedule; call or text if the request is time-sensitive.
                </p>
                <p>
                  A photo quote is based on the information submitted. If site
                  conditions change the scope or price, G&amp;S discusses that
                  with you before work begins.
                </p>
                <p>
                  Your contact details, address, and photos are submitted to
                  prepare and respond to this estimate request. Submission does
                  not authorize publication of your photos.
                </p>
              </div>

              <div className="estimator-button-row mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")}>
                  Back
                </Button>
                <Button onClick={continueToReview} className="flex-1">
                  Review request
                </Button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="estimator-form-panel p-6 md:p-8">
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <Sparkles className="mt-1 text-emerald-700" size={22} />
                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    Ready to send
                  </h3>
                  <p className="mt-1 text-sm text-slate-700">
                    This goes straight to G&S with your contact info, job notes,
                    and photos attached.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-700">
                <div className="estimator-summary rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Service:</span>{" "}
                  {selectedService?.label}
                </div>
                <div className="estimator-summary rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Contact:</span>{" "}
                  {formData.fullName} · {formData.phone} · {formData.email}
                </div>
                <div className="estimator-summary rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Address:</span>{" "}
                  {formData.propertyAddress}
                </div>
                <div className="estimator-summary rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Photos:</span>{" "}
                  {photos.length > 0
                    ? `${photos.length} attached`
                    : "No photos attached"}
                </div>
              </div>

              <div className="estimator-button-row mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep("photos")}>
                  <ArrowLeft className="mr-2" size={16} />
                  Edit
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canSubmit}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MailCheck className="mr-2" size={16} />
                      Send quote request
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="estimator-form-panel p-8 text-center">
              <CheckCircle
                className="mx-auto mb-4 text-emerald-700"
                size={52}
              />
              <h3 className="text-2xl font-bold text-slate-950">
                Request sent
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-slate-600">
                Thanks. Your details are in the G&S inbox now. You will get a
                real quote after the photos and job notes are reviewed.
              </p>
              <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-lg bg-slate-50 p-4 text-left text-sm text-slate-700">
                <Camera className="text-emerald-700" size={22} />
                <span>
                  Need to add another area? Start a second request and include
                  fresh photos.
                </span>
              </div>
              <Button
                className="mt-6"
                onClick={() => {
                  setStep("service");
                  setServiceType("");
                  setPhotos([]);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    propertyAddress: "",
                    approximateSize: "",
                    condition: "Not sure",
                    timeline: "",
                    notes: "",
                  });
                }}
              >
                Start another request
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
