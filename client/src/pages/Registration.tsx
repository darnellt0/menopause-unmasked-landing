/**
 * Registration Page for MenoPause Unmasked Event
 * Multi-step form with validation and n8n webhook integration
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { useState, FormEvent } from "react";

const ASSETS = {
  elevatedLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/YJuPGVLNybGhvOmI.png",
  juicyLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/NWwwPvrVCErIWeJh.png",
};

const WEBHOOK_URL = "https://nonlevel-promilitarism-lorita.ngrok-free.dev/webhook/menopause-unmasked-registration";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age_range: "",
    experiences: [] as string[],
    hopes: [] as string[],
    referral_source: "",
    referral_other: "",
    additional_info: "",
    consent_acknowledgment: false,
    community_agreement: false,
  });

  // Track UTM parameters and metadata
  const getMetadata = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      referrer: document.referrer || '',
      page_url: window.location.href,
      submitted_at_iso: new Date().toISOString(),
    };
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field: 'experiences' | 'hopes', value: string) => {
    setFormData(prev => {
      const currentArray = prev[field];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep1 = () => {
    setErrorMessage("");

    if (!formData.first_name.trim()) {
      setErrorMessage("Please enter your first name.");
      return false;
    }
    if (!formData.last_name.trim()) {
      setErrorMessage("Please enter your last name.");
      return false;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return false;
    }
    if (!formData.age_range) {
      setErrorMessage("Please select your age range.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    setErrorMessage("");

    if (!formData.consent_acknowledgment) {
      setErrorMessage("Please confirm the consent & expectations checkbox.");
      return false;
    }
    if (!formData.community_agreement) {
      setErrorMessage("Please confirm the community participation acknowledgment.");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare form data for submission
      const metadata = getMetadata();
      const submissionData = {
        ...formData,
        experiences: formData.experiences.join(', '),
        hopes: formData.hopes.join(', '),
        ...metadata,
      };

      // Convert to URL-encoded format
      const formBody = Object.entries(submissionData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      // Success!
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Something went wrong submitting the form. Please try again, or refresh and try once more.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-lavender">
          <div className="container flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-10 md:h-12 w-auto" style={{height: '57px'}} />
            </div>
            <Button asChild className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-6">
              <a href="/">Back to Home</a>
            </Button>
          </div>
        </nav>

        {/* Success Message */}
        <section className="pt-32 pb-20">
          <div className="container">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-8">
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-teal" />
                </div>
                <h1 className="font-display text-plum text-4xl md:text-5xl font-semibold mb-4">
                  You're registered!
                </h1>
                <p className="font-body text-lg text-slate mb-6">
                  Check your inbox for a confirmation email with the Zoom link and event details.
                </p>
                <p className="font-body text-slate-light">
                  If you don't see it within a few minutes, check your spam/promotions folder.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="font-display text-plum text-2xl font-semibold mb-6">Event Details</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-teal mt-1" />
                    <div>
                      <p className="font-body font-semibold text-slate">Friday, February 14, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal mt-1" />
                    <div>
                      <p className="font-body font-semibold text-slate">10:30 AM – 12:00 PM PT</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-teal mt-1" />
                    <div>
                      <p className="font-body font-semibold text-slate">Virtual (Zoom)</p>
                      <p className="font-body text-sm text-slate-light">Link will be sent via email and SMS</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <Button asChild size="lg" className="bg-plum hover:bg-plum-light text-white font-body font-semibold px-8 py-6 text-lg rounded-full">
                  <a href="/">Return to Home</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-lavender">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-10 md:h-12 w-auto" style={{height: '57px'}} />
            <span className="text-gold-dark text-xl font-display">&</span>
            <img src={ASSETS.juicyLogo} alt="Juicy 2 100" className="h-10 md:h-12 w-auto" style={{height: '92px'}} />
          </div>
          <Button asChild variant="outline" className="border-plum text-plum hover:bg-plum hover:text-white font-body font-semibold px-6">
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </nav>

      {/* Registration Form */}
      <section className="pt-32 pb-20">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h1 className="font-display text-plum text-4xl md:text-5xl font-semibold mb-4">
                MenoPause Unmasked: Truths, Myths, and Solutions
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mb-4 text-slate">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">Friday, February 14, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">10:30 AM – 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">Virtual</span>
                </div>
              </div>
              <p className="font-body text-lg text-teal font-semibold">✨ Your presence is the cost</p>
            </motion.div>

            {/* Form Card */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              <form onSubmit={handleSubmit}>
                {/* Step 1 */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-plum text-2xl font-semibold mb-6">Register to Join the Conversation</h2>

                    {/* First and Last Name */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="first_name" className="block font-body text-sm font-medium text-slate mb-2">
                          First Name <span className="text-teal">*</span>
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) => updateFormData('first_name', e.target.value)}
                          className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block font-body text-sm font-medium text-slate mb-2">
                          Last Name <span className="text-teal">*</span>
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) => updateFormData('last_name', e.target.value)}
                          className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-body text-sm font-medium text-slate mb-2">
                        Email Address <span className="text-teal">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                        required
                      />
                      <p className="mt-2 text-sm text-slate-light font-body">We'll send your Zoom link and event reminders here</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block font-body text-sm font-medium text-slate mb-2">
                        Phone Number <span className="text-teal">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                        required
                      />
                      <p className="mt-2 text-sm text-slate-light font-body">We'll send SMS event reminders and info here</p>
                    </div>

                    {/* Age Range */}
                    <div>
                      <label htmlFor="age_range" className="block font-body text-sm font-medium text-slate mb-2">
                        What's your age range? <span className="text-teal">*</span>
                      </label>
                      <select
                        id="age_range"
                        value={formData.age_range}
                        onChange={(e) => updateFormData('age_range', e.target.value)}
                        className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all bg-white"
                        required
                      >
                        <option value="">Select your age range</option>
                        <option value="Under 40">Under 40</option>
                        <option value="40-49">40-49</option>
                        <option value="50-54">50-54</option>
                        <option value="55-59">55-59</option>
                        <option value="60+">60+</option>
                      </select>
                      <p className="mt-2 text-sm text-slate-light font-body italic">This helps us meet you where you are in your hormonal journey.</p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="bg-rose/10 border border-rose rounded-xl p-4">
                        <p className="text-sm text-plum font-body">{errorMessage}</p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-slate-light font-body">Step 1 of 2</span>
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="bg-plum hover:bg-plum-light text-white font-body font-semibold px-8 py-6 rounded-full"
                      >
                        Continue <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-display text-plum text-2xl font-semibold mb-6">Tell Us More (Optional)</h2>

                    {/* Experiences */}
                    <div>
                      <label className="block font-body text-sm font-medium text-slate mb-3">
                        Are you currently or have you noticed any of the following experiences—either personally, or through conversations with other women?
                        <span className="text-slate-light font-normal"> (Optional)</span>
                      </label>
                      <div className="border border-lavender rounded-xl p-4 space-y-3">
                        {[
                          'Sleep disruption',
                          'Brain fog or memory changes',
                          'Hot flashes or night sweats',
                          'Mood changes',
                          'Anxiety',
                          'Weight gain',
                          'Fatigue',
                          'Frozen shoulder',
                          'Depression',
                          'None of the above',
                          'Not sure'
                        ].map((exp) => (
                          <label key={exp} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.experiences.includes(exp)}
                              onChange={() => toggleCheckbox('experiences', exp)}
                              className="mt-1 w-4 h-4 text-teal border-lavender rounded focus:ring-teal accent-teal"
                            />
                            <span className="font-body text-slate group-hover:text-plum transition-colors">{exp}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Hopes */}
                    <div>
                      <label className="block font-body text-sm font-medium text-slate mb-3">
                        What are you hoping to leave this conversation with?
                        <span className="text-slate-light font-normal"> (Optional)</span>
                      </label>
                      <div className="border border-lavender rounded-xl p-4 space-y-3">
                        {[
                          "Greater awareness of how menopause can show up in daily life",
                          "Language to name experiences I've been noticing",
                          "Feeling less alone in this transition",
                          "Insight from other women's lived experiences",
                          "All of the above"
                        ].map((hope) => (
                          <label key={hope} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.hopes.includes(hope)}
                              onChange={() => toggleCheckbox('hopes', hope)}
                              className="mt-1 w-4 h-4 text-teal border-lavender rounded focus:ring-teal accent-teal"
                            />
                            <span className="font-body text-slate group-hover:text-plum transition-colors">{hope}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Referral Source */}
                    <div>
                      <label htmlFor="referral_source" className="block font-body text-sm font-medium text-slate mb-2">
                        How did you hear about this event?
                        <span className="text-slate-light font-normal"> (Recommended but not required)</span>
                      </label>
                      <select
                        id="referral_source"
                        value={formData.referral_source}
                        onChange={(e) => updateFormData('referral_source', e.target.value)}
                        className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="Direct outreach from Shria">Direct outreach from Shria</option>
                        <option value="Referral from someone affiliated with Elevated Movements">Referral from someone affiliated with Elevated Movements</option>
                        <option value="Referral from a friend or colleague">Referral from a friend or colleague</option>
                        <option value="Juicy to 100 Nation">Juicy to 100 Nation</option>
                        <option value="Social media (Instagram, LinkedIn, etc.)">Social media (Instagram, LinkedIn, etc.)</option>
                        <option value="Partner organization">Partner organization</option>
                        <option value="Other">Other (please share)</option>
                      </select>
                    </div>

                    {/* Conditional Other Field */}
                    {formData.referral_source === 'Other' && (
                      <div>
                        <label htmlFor="referral_other" className="block font-body text-sm font-medium text-slate mb-2">
                          Please share:
                        </label>
                        <input
                          type="text"
                          id="referral_other"
                          value={formData.referral_other}
                          onChange={(e) => updateFormData('referral_other', e.target.value)}
                          className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all"
                        />
                      </div>
                    )}

                    {/* Additional Info */}
                    <div>
                      <label htmlFor="additional_info" className="block font-body text-sm font-medium text-slate mb-2">
                        Anything else you'd like us to know?
                        <span className="text-slate-light font-normal"> (Optional)</span>
                      </label>
                      <textarea
                        id="additional_info"
                        value={formData.additional_info}
                        onChange={(e) => updateFormData('additional_info', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-lavender rounded-xl font-body focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all resize-none"
                      />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-lavender my-6"></div>

                    {/* Consent & Expectations */}
                    <div>
                      <h3 className="font-display text-plum text-lg font-semibold mb-4">Consent & Expectations</h3>
                      <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.consent_acknowledgment}
                            onChange={(e) => updateFormData('consent_acknowledgment', e.target.checked)}
                            className="mt-1 w-4 h-4 text-teal border-lavender rounded focus:ring-teal accent-teal"
                            required
                          />
                          <span className="font-body text-slate group-hover:text-plum transition-colors">
                            I understand this is an informational community conversation centered on lived experience, not medical advice or diagnosis. <span className="text-teal">*</span>
                          </span>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.community_agreement}
                            onChange={(e) => updateFormData('community_agreement', e.target.checked)}
                            className="mt-1 w-4 h-4 text-teal border-lavender rounded focus:ring-teal accent-teal"
                            required
                          />
                          <span className="font-body text-slate group-hover:text-plum transition-colors">
                            I agree to engage with care, curiosity, and respect in this community space. <span className="text-teal">*</span>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="bg-rose/10 border border-rose rounded-xl p-4">
                        <p className="text-sm text-plum font-body">{errorMessage}</p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4">
                      <Button
                        type="button"
                        onClick={handlePrevStep}
                        variant="outline"
                        className="border-plum text-plum hover:bg-plum hover:text-white font-body font-semibold px-8 py-6 rounded-full"
                      >
                        <ArrowLeft className="mr-2 w-5 h-5" /> Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-8 py-6 rounded-full"
                      >
                        {isSubmitting ? 'Submitting...' : 'Register Now'}
                      </Button>
                    </div>

                    <p className="text-xs text-slate-light font-body text-center mt-4">
                      Full community agreements will be reviewed at the start of the event.
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-plum to-purple-deep text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-8 w-auto brightness-0 invert" />
              <span className="text-gold text-xl">×</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100" className="h-10 w-auto" />
            </div>
            <p className="font-body text-sm opacity-70">
              © 2026 Elevated Movements × Juicy 2 100. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
