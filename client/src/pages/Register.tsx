/**
 * Registration Page - MenoPause Unmasked
 * Full registration form with n8n webhook integration
 */

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Users,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const ASSETS = {
  elevatedLogo:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/YJuPGVLNybGhvOmI.png",
  juicyLogo:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/NWwwPvrVCErIWeJh.png",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 } as const,
  },
};

const SYMPTOM_OPTIONS = [
  "Sleep disruption",
  "Brain fog or memory changes",
  "Hot flashes or night sweats",
  "Mood changes",
  "Anxiety",
  "Weight gain",
  "Fatigue",
  "Frozen shoulder",
  "Depression",
  "None of the above",
  "Not sure",
];

const HOPE_OPTIONS = [
  "Greater awareness of how menopause can show up in daily life",
  "Language to name experiences I've been noticing",
  "Feeling less alone in this transition",
  "Insight from other women's lived experiences",
  "All of the above",
];

const REFERRAL_OPTIONS = [
  "Direct outreach from Shria",
  "Referral from someone affiliated with Elevated Movements",
  "Referral from a friend or colleague",
  "Juicy to 100 Nation",
  "Social media (Instagram, LinkedIn, etc.)",
  "Partner organization",
  "Other (please share)",
];

const AGE_RANGES = ["Under 40", "40-49", "50-54", "55-59", "60+"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ageRange: string;
  symptoms: string[];
  hopes: string[];
  referralSource: string;
  referralOther: string;
  additionalNotes: string;
  consentEducational: boolean;
  consentCommunity: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  ageRange: "",
  symptoms: [],
  hopes: [],
  referralSource: "",
  referralOther: "",
  additionalNotes: "",
  consentEducational: false,
  consentCommunity: false,
};

export default function Register() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const updateField = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleArrayItem = (
    field: "symptoms" | "hopes",
    item: string
  ) => {
    setForm((prev) => {
      const current = prev[field];
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [field]: updated };
    });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!form.ageRange) newErrors.ageRange = "Please select your age range";
    if (!form.consentEducational)
      newErrors.consentEducational =
        "You must acknowledge this is not medical advice";
    if (!form.consentCommunity)
      newErrors.consentCommunity =
        "You must agree to the community guidelines";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields");
      // Scroll to first error
      const firstError = document.querySelector("[data-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          ageRange: form.ageRange,
          symptoms: form.symptoms,
          hopes: form.hopes,
          referralSource: form.referralSource,
          referralOther: form.referralOther.trim(),
          additionalNotes: form.additionalNotes.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      // Store name for the thanks page
      sessionStorage.setItem("registrantName", form.firstName.trim());
      sessionStorage.setItem("registrantEmail", form.email.trim());
      navigate("/thanks");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-lavender">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="/" className="flex items-center gap-3">
            <img
              src={ASSETS.elevatedLogo}
              alt="Elevated Movements"
              className="h-10 md:h-12 w-auto"
              style={{ height: "57px" }}
            />
          </a>
          <Button
            asChild
            variant="outline"
            className="border-plum text-plum hover:bg-plum hover:text-white font-body font-semibold px-6 rounded-full"
          >
            <a href="/">Back to Event</a>
          </Button>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-12 bg-gradient-to-b from-lavender-light to-cream">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full font-body font-semibold text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Event Registration
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-plum text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4"
            >
              Meno-Pause
              <span className="block italic font-normal text-plum-light">
                Unmasked
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-display text-xl md:text-2xl text-slate italic mb-6"
            >
              Myths, Truths, and Solutions
            </motion.p>

            {/* Event Details */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 mb-6 text-slate"
            >
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Calendar className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">
                  Friday, February 14, 2026
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">
                  10:30 AM – 12:00 PM PT
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">Virtual</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Users className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">Zoom</span>
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-gold-dark font-semibold"
            >
              Your presence is the cost
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider my-0" />

      {/* Registration Form */}
      <section className="section-padding bg-cream">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Required Fields Section */}
              <motion.div variants={fadeInUp}>
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
                  <h2 className="font-display text-plum text-2xl font-semibold">
                    Your Information
                  </h2>

                  {/* First Name */}
                  <div
                    className="space-y-2"
                    data-error={!!errors.firstName || undefined}
                  >
                    <Label
                      htmlFor="firstName"
                      className="font-body text-slate font-medium"
                    >
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Your first name"
                      value={form.firstName}
                      onChange={(e) =>
                        updateField("firstName", e.target.value)
                      }
                      className={`font-body ${errors.firstName ? "border-red-500 ring-red-500/20" : ""}`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div
                    className="space-y-2"
                    data-error={!!errors.lastName || undefined}
                  >
                    <Label
                      htmlFor="lastName"
                      className="font-body text-slate font-medium"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Your last name"
                      value={form.lastName}
                      onChange={(e) =>
                        updateField("lastName", e.target.value)
                      }
                      className={`font-body ${errors.lastName ? "border-red-500 ring-red-500/20" : ""}`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className="space-y-2"
                    data-error={!!errors.email || undefined}
                  >
                    <Label
                      htmlFor="email"
                      className="font-body text-slate font-medium"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={`font-body ${errors.email ? "border-red-500 ring-red-500/20" : ""}`}
                    />
                    <p className="text-sm text-slate-light font-body">
                      We'll send your Zoom link and event reminders here
                    </p>
                    {errors.email && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div
                    className="space-y-2"
                    data-error={!!errors.phone || undefined}
                  >
                    <Label
                      htmlFor="phone"
                      className="font-body text-slate font-medium"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className={`font-body ${errors.phone ? "border-red-500 ring-red-500/20" : ""}`}
                    />
                    <p className="text-sm text-slate-light font-body">
                      We'll send SMS event reminders and info here
                    </p>
                    {errors.phone && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Age Range */}
                  <div
                    className="space-y-2"
                    data-error={!!errors.ageRange || undefined}
                  >
                    <Label className="font-body text-slate font-medium">
                      What's your age range?{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={form.ageRange}
                      onValueChange={(val) => updateField("ageRange", val)}
                    >
                      <SelectTrigger
                        className={`w-full font-body ${errors.ageRange ? "border-red-500 ring-red-500/20" : ""}`}
                      >
                        <SelectValue placeholder="Select your age range" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGE_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-slate-light font-body">
                      This helps us meet you where you are in your hormonal
                      journey.
                    </p>
                    {errors.ageRange && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.ageRange}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Optional Fields Section */}
              <motion.div variants={fadeInUp}>
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-8">
                  <h2 className="font-display text-plum text-2xl font-semibold">
                    Help Us Personalize Your Experience
                  </h2>

                  {/* Symptoms */}
                  <div className="space-y-3">
                    <Label className="font-body text-slate font-medium block">
                      Are you currently or have you noticed any of the following
                      experiences—either personally, or through conversations
                      with other women?{" "}
                      <span className="text-slate-light font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <p className="text-sm text-slate-light font-body">
                      Select all that apply
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {SYMPTOM_OPTIONS.map((symptom) => (
                        <label
                          key={symptom}
                          className="flex items-center gap-3 p-3 rounded-xl border border-lavender hover:border-teal/30 hover:bg-teal/5 transition-colors cursor-pointer"
                        >
                          <Checkbox
                            checked={form.symptoms.includes(symptom)}
                            onCheckedChange={() =>
                              toggleArrayItem("symptoms", symptom)
                            }
                            className="data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                          />
                          <span className="font-body text-sm text-slate">
                            {symptom}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Hopes */}
                  <div className="space-y-3">
                    <Label className="font-body text-slate font-medium block">
                      What are you hoping to leave this conversation with?{" "}
                      <span className="text-slate-light font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <p className="text-sm text-slate-light font-body">
                      Select all that apply
                    </p>
                    <div className="space-y-3">
                      {HOPE_OPTIONS.map((hope) => (
                        <label
                          key={hope}
                          className="flex items-start gap-3 p-3 rounded-xl border border-lavender hover:border-teal/30 hover:bg-teal/5 transition-colors cursor-pointer"
                        >
                          <Checkbox
                            checked={form.hopes.includes(hope)}
                            onCheckedChange={() =>
                              toggleArrayItem("hopes", hope)
                            }
                            className="mt-0.5 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                          />
                          <span className="font-body text-sm text-slate">
                            {hope}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* How did you hear about this event */}
                  <div className="space-y-2">
                    <Label className="font-body text-slate font-medium">
                      How did you hear about this event?{" "}
                      <span className="text-slate-light font-normal">
                        (Recommended)
                      </span>
                    </Label>
                    <Select
                      value={form.referralSource}
                      onValueChange={(val) =>
                        updateField("referralSource", val)
                      }
                    >
                      <SelectTrigger className="w-full font-body">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {REFERRAL_OPTIONS.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {form.referralSource === "Other (please share)" && (
                      <div className="mt-3">
                        <Input
                          type="text"
                          placeholder="Please share how you heard about us"
                          value={form.referralOther}
                          onChange={(e) =>
                            updateField("referralOther", e.target.value)
                          }
                          className="font-body"
                        />
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="additionalNotes"
                      className="font-body text-slate font-medium"
                    >
                      Anything else you'd like us to know?{" "}
                      <span className="text-slate-light font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Accommodations needed, questions you'd like addressed, or anything else on your mind..."
                      value={form.additionalNotes}
                      onChange={(e) =>
                        updateField("additionalNotes", e.target.value)
                      }
                      className="font-body min-h-[80px]"
                      rows={3}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Consent Section */}
              <motion.div variants={fadeInUp}>
                <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 space-y-6">
                  <h2 className="font-display text-plum text-2xl font-semibold">
                    Consent & Expectations
                  </h2>

                  <div
                    className="space-y-4"
                    data-error={
                      !!(errors.consentEducational || errors.consentCommunity) ||
                      undefined
                    }
                  >
                    {/* Consent 1 */}
                    <label className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${errors.consentEducational ? "border-red-500 bg-red-50/50" : "border-lavender hover:border-teal/30 hover:bg-teal/5"}`}>
                      <Checkbox
                        checked={form.consentEducational}
                        onCheckedChange={(checked) =>
                          updateField(
                            "consentEducational",
                            checked === true
                          )
                        }
                        className="mt-0.5 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                      />
                      <span className="font-body text-sm text-slate">
                        I understand this is an informational community
                        conversation centered on lived experience, not medical
                        advice or diagnosis.{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consentEducational && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1 ml-2">
                        <AlertCircle className="w-3 h-3" />
                        {errors.consentEducational}
                      </p>
                    )}

                    {/* Consent 2 */}
                    <label className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${errors.consentCommunity ? "border-red-500 bg-red-50/50" : "border-lavender hover:border-teal/30 hover:bg-teal/5"}`}>
                      <Checkbox
                        checked={form.consentCommunity}
                        onCheckedChange={(checked) =>
                          updateField("consentCommunity", checked === true)
                        }
                        className="mt-0.5 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                      />
                      <span className="font-body text-sm text-slate">
                        I agree to engage with care, curiosity, and respect in
                        this community space.{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consentCommunity && (
                      <p className="text-red-500 text-sm font-body flex items-center gap-1 ml-2">
                        <AlertCircle className="w-3 h-3" />
                        {errors.consentCommunity}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp} className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-12 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <>
                      Register Now <ArrowRight className="ml-2 w-6 h-6" />
                    </>
                  )}
                </Button>
                <p className="font-body text-sm text-slate-light mt-4">
                  Complementary event • You'll receive a confirmation email with
                  your Zoom link
                </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-plum to-purple-deep text-white py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
              <img
                src={ASSETS.elevatedLogo}
                alt="Elevated Movements"
                className="h-12 w-auto brightness-0 invert"
              />
              <span className="text-gold text-2xl font-display">&times;</span>
              <img
                src={ASSETS.juicyLogo}
                alt="Juicy 2 100 Nation"
                className="h-16 w-auto"
              />
            </div>
            <p className="font-body text-sm text-white/50 text-center">
              &copy; 2026 Elevated Movements &times; Juicy 2 100. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
