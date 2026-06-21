import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Step = "service" | "photos" | "info" | "estimate" | "success";

interface PhotoAnalysis {
  estimatedSquareFeet?: number;
  estimatedPrice: number;
  condition: string;
  notes: string;
}

export default function AIEstimator() {
  const [step, setStep] = useState<Step>("service");
  const [serviceType, setServiceType] = useState<
    "driveway" | "deck" | "siding" | "vehicle" | ""
  >("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    notes: "",
  });

  const analyzePhotosMutation = trpc.estimator.analyzePhotos.useMutation();
  const submitEstimateMutation = trpc.estimator.submitEstimate.useMutation();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 photos
    if (files.length + photos.length > 5) {
      toast.error("Maximum 5 photos allowed");
      return;
    }

    setPhotos([...photos, ...files]);

    // Upload photos to storage
    const uploadedUrls: string[] = [];
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error("Photo upload failed:", error);
        toast.error("Failed to upload photo");
      }
    }

    setPhotoUrls([...photoUrls, ...uploadedUrls]);
  };

  const handleAnalyzePhotos = async () => {
    if (photoUrls.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzePhotosMutation.mutateAsync({
        photoUrls,
        serviceType: serviceType as "driveway" | "deck" | "siding" | "vehicle",
      });

      setAnalysis(result);
      setStep("info");
    } catch (error) {
      toast.error("Failed to analyze photos. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!analysis) {
      toast.error("No estimate available");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEstimateMutation.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        propertyAddress: formData.propertyAddress,
        serviceType: serviceType as "driveway" | "deck" | "siding" | "vehicle",
        estimatedSquareFeet: analysis.estimatedSquareFeet,
        estimatedPrice: analysis.estimatedPrice,
        photoUrls,
        notes: formData.notes,
      });

      setStep("success");
      toast.success("Estimate submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit estimate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const priceInDollars = analysis
    ? (analysis.estimatedPrice / 100).toFixed(2)
    : "0.00";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step 1: Service Selection */}
      {step === "service" && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">What service do you need?</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "driveway", label: "Driveway Cleaning" },
              { id: "deck", label: "Deck Cleaning" },
              { id: "siding", label: "Siding Washing" },
              { id: "vehicle", label: "Vehicle Washing" },
            ].map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setServiceType(service.id as typeof serviceType);
                  setStep("photos");
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  serviceType === service.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-400"
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Step 2: Photo Upload */}
      {step === "photos" && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Upload photos</h2>
          <p className="text-gray-600 mb-6">
            Upload up to 5 clear photos of the area. Our AI will analyze them
            to estimate the size and provide a price.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <Upload className="mx-auto mb-4 text-gray-400" size={32} />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <span className="text-blue-600 font-semibold">Click to upload</span>
              <span className="text-gray-600"> or drag and drop</span>
            </label>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
          </div>

          {photos.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-3">
                {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
              </p>
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${i + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => {
                        setPhotos(photos.filter((_, idx) => idx !== i));
                        setPhotoUrls(photoUrls.filter((_, idx) => idx !== i));
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setStep("service");
                setPhotos([]);
                setPhotoUrls([]);
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleAnalyzePhotos}
              disabled={isAnalyzing || photoUrls.length === 0}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Analyzing...
                </>
              ) : (
                "Get Estimate"
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Estimate Review & Info */}
      {step === "info" && analysis && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Your Estimate</h2>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-green-700 mb-2">
              ${priceInDollars}
            </div>
            <p className="text-gray-600">
              Estimated price for your {serviceType} cleaning
            </p>
            {analysis.estimatedSquareFeet && (
              <p className="text-sm text-gray-500 mt-2">
                Estimated size: {analysis.estimatedSquareFeet} sq ft
              </p>
            )}
            <p className="text-sm text-gray-500">
              Condition: {analysis.condition}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">{analysis.notes}</p>
          </div>

          <h3 className="font-semibold mb-4">Your Information</h3>
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone *"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Property Address"
              value={formData.propertyAddress}
              onChange={(e) =>
                setFormData({ ...formData, propertyAddress: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Additional notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep("photos")}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Submitting...
                </>
              ) : (
                "Submit Estimate"
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Success */}
      {step === "success" && (
        <Card className="p-8 text-center">
          <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
          <h2 className="text-2xl font-bold mb-2">Estimate Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you! We've received your estimate request. We'll review your
            photos and contact you within 24 hours with a detailed quote.
          </p>
          <Button
            onClick={() => {
              setStep("service");
              setServiceType("");
              setPhotos([]);
              setPhotoUrls([]);
              setAnalysis(null);
              setFormData({
                fullName: "",
                email: "",
                phone: "",
                propertyAddress: "",
                notes: "",
              });
            }}
          >
            Submit Another Estimate
          </Button>
        </Card>
      )}
    </div>
  );
}
