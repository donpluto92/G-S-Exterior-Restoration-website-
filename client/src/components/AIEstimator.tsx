import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  Clock,
  Loader2,
  MailCheck,
  MapPin,
  Ruler,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Step = "service" | "details" | "photos" | "review" | "success";
type ServiceType = "driveway" | "deck" | "siding" | "vehicle" | "patio" | "walkway";

const services: Array<{ id: ServiceType; label: string; hint: string }> = [
  { id: "driveway", label: "Driveway Cleaning", hint: "Concrete, black streaks, oil spots" },
  { id: "deck", label: "Deck Cleaning", hint: "Wood, composite, prep for stain" },
  { id: "siding", label: "Siding Washing", hint: "House wash, algae, mildew" },
  { id: "vehicle", label: "Vehicle Washing", hint: "Fleet, work trucks, personal vehicles" },
  { id: "patio", label: "Patio Cleaning", hint: "Back patios, pads, outdoor spaces" },
  { id: "walkway", label: "Walkway Cleaning", hint: "Sidewalks, paths, entrances" },
];

const conditions = ["Light dirt", "Moderate buildup", "Heavy staining", "Not sure"];

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
    () => services.find((service) => service.id === serviceType),
    [serviceType],
  );

  const canSubmit =
    serviceType &&
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.propertyAddress;

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.length + photos.length > 8) {
      toast.error("You can upload up to 8 photos");
      return;
    }

    const oversized = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversized) {
      toast.error("Each photo needs to be under 10MB");
      return;
    }

    setPhotos((current) => [...current, ...files]);
    e.target.value = "";
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please fill in the required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("serviceType", serviceType);
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      photos.forEach((photo) => {
        payload.append("photos", photo);
      });

      const response = await fetch("/api/quote-request", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setStep("success");
      toast.success("Quote request sent");
    } catch (error) {
      console.error("Quote request failed:", error);
      toast.error("Could not send your request. Please call or text us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full px-4 py-16"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.28 0.07 155) 0%, oklch(0.23 0.06 155) 48%, oklch(0.28 0.07 155) 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-6 text-center text-white">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold">
            <Clock size={16} />
            Fast photo quote
          </div>
          <h2 className="text-3xl font-bold tracking-normal md:text-4xl">
            Get a clean, accurate quote without the back-and-forth
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
            Send the details and a few photos. Darren reviews the job and replies with a real
            estimate instead of a generic calculator number.
          </p>
        </div>

        <Card className="overflow-hidden border-white/15 bg-white shadow-2xl">
          <div className="grid grid-cols-3 border-b bg-slate-50 text-center text-xs font-semibold uppercase tracking-normal text-slate-500">
            <div className={`py-3 ${step === "service" ? "bg-emerald-50 text-emerald-800" : ""}`}>
              Service
            </div>
            <div
              className={`py-3 ${
                step === "details" || step === "photos" ? "bg-emerald-50 text-emerald-800" : ""
              }`}
            >
              Details
            </div>
            <div className={`py-3 ${step === "review" ? "bg-emerald-50 text-emerald-800" : ""}`}>
              Send
            </div>
          </div>

          {step === "service" && (
            <div className="p-6 md:p-8">
              <h3 className="mb-2 text-2xl font-bold text-slate-950">What needs cleaned?</h3>
              <p className="mb-6 text-sm text-slate-600">
                Choose the closest match. You can add special notes before sending.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setServiceType(service.id);
                      setStep("details");
                    }}
                    className="rounded-lg border border-slate-200 p-4 text-left transition hover:border-emerald-600 hover:bg-emerald-50"
                  >
                    <span className="block font-bold text-slate-950">{service.label}</span>
                    <span className="mt-1 block text-sm text-slate-600">{service.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    {selectedService?.label}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-950">Job details</h3>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep("service")}>
                  <ArrowLeft className="mr-2" size={16} />
                  Back
                </Button>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Full name *</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="John Smith"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="(573) 555-0100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <MapPin size={16} />
                    Property address *
                  </label>
                  <input
                    value={formData.propertyAddress}
                    onChange={(e) => updateField("propertyAddress", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="123 Main St, Mexico, MO 65265"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Ruler size={16} />
                      Approximate size
                    </label>
                    <input
                      value={formData.approximateSize}
                      onChange={(e) => updateField("approximateSize", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                      placeholder="2-car driveway, 20x20 patio..."
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-800">Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => updateField("condition", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    >
                      {conditions.map((condition) => (
                        <option key={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Preferred timeline</label>
                  <input
                    value={formData.timeline}
                    onChange={(e) => updateField("timeline", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="This week, before a party, flexible..."
                  />
                </div>

                <Button onClick={() => setStep("photos")} className="mt-2">
                  Continue to photos
                </Button>
              </div>
            </div>
          )}

          {step === "photos" && (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Photos help tighten the quote
                  </p>
                  <h3 className="text-2xl font-bold text-slate-950">Add job photos</h3>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep("details")}>
                  <ArrowLeft className="mr-2" size={16} />
                  Back
                </Button>
              </div>

              <label
                htmlFor="photo-upload"
                className="block cursor-pointer rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-emerald-600 hover:bg-emerald-50"
              >
                <Upload className="mx-auto mb-3 text-emerald-700" size={34} />
                <span className="block font-bold text-slate-950">Upload clear photos</span>
                <span className="mt-1 block text-sm text-slate-600">
                  Wide shot, close-up stains, and any tricky areas. Up to 8 photos.
                </span>
                <input
                  id="photo-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {photos.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-4">
                  {photos.map((photo, index) => (
                    <div key={`${photo.name}-${index}`} className="relative overflow-hidden rounded-lg border">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="h-28 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setPhotos((current) => current.filter((_, i) => i !== index))}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-white"
                        aria-label="Remove photo"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <textarea
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3"
                rows={4}
                placeholder="Gate codes, water access, problem areas, best time to contact you..."
              />

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep("details")}>
                  Back
                </Button>
                <Button onClick={() => setStep("review")} className="flex-1">
                  Review request
                </Button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <Sparkles className="mt-1 text-emerald-700" size={22} />
                <div>
                  <h3 className="text-xl font-bold text-slate-950">Ready to send</h3>
                  <p className="mt-1 text-sm text-slate-700">
                    This goes straight to G&S with your contact info, job notes, and photos attached.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-700">
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Service:</span> {selectedService?.label}
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Contact:</span> {formData.fullName} ·{" "}
                  {formData.phone} · {formData.email}
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Address:</span>{" "}
                  {formData.propertyAddress}
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <span className="font-bold text-slate-950">Photos:</span>{" "}
                  {photos.length > 0 ? `${photos.length} attached` : "No photos attached"}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep("photos")}>
                  <ArrowLeft className="mr-2" size={16} />
                  Edit
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting || !canSubmit} className="flex-1">
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
            <div className="p-8 text-center">
              <CheckCircle className="mx-auto mb-4 text-emerald-700" size={52} />
              <h3 className="text-2xl font-bold text-slate-950">Request sent</h3>
              <p className="mx-auto mt-3 max-w-lg text-slate-600">
                Thanks. Your details are in the G&S inbox now. You will get a real quote after the
                photos and job notes are reviewed.
              </p>
              <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-lg bg-slate-50 p-4 text-left text-sm text-slate-700">
                <Camera className="text-emerald-700" size={22} />
                <span>Need to add another area? Start a second request and include fresh photos.</span>
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
