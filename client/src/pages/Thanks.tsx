/**
 * Thank You Page - Shown after successful registration
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  Clock,
  Heart,
  Mail,
  MapPin,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

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
    transition: { staggerChildren: 0.12 } as const,
  },
};

function AddToCalendar() {
  const eventTitle = "Meno-Pause Unmasked: Myths, Truths, and Solutions";
  const eventDescription =
    "A community conversation designed to bring clarity, language, and support to a season that's too often experienced in silence. Hosted by Elevated Movements & Juicy 2 100.";
  const eventLocation = "Zoom (link will be sent via email)";
  const startDate = "2026-02-14T10:30:00";
  const endDate = "2026-02-14T12:00:00";
  const timezone = "America/Los_Angeles";

  const formatGoogleDate = (date: string) =>
    date.replace(/[-:]/g, "").replace("T", "T");
  const googleStart = formatGoogleDate(startDate);
  const googleEnd = formatGoogleDate(endDate);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${googleStart}/${googleEnd}&ctz=${timezone}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Elevated Movements//Meno-Pause Unmasked//EN
BEGIN:VEVENT
UID:menopause-unmasked-2026@elevatedmovements.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=${timezone}:${startDate.replace(/[-:]/g, "")}
DTEND;TZID=${timezone}:${endDate.replace(/[-:]/g, "")}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription.replace(/\n/g, "\\n")}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "menopause-unmasked.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="bg-white text-plum hover:bg-cream font-body font-semibold px-8 py-6 text-lg rounded-full flex items-center gap-2"
        >
          <CalendarPlus className="w-5 h-5" />
          Add to Calendar
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem asChild>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 cursor-pointer"
          >
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={outlookCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 cursor-pointer"
          >
            Outlook Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={generateICS}
          className="flex items-center gap-2 cursor-pointer"
        >
          Apple Calendar (.ics)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Thanks() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("registrantName");
    const storedEmail = sessionStorage.getItem("registrantEmail");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText =
    "I just registered for Meno-Pause Unmasked: Myths, Truths, and Solutions! Join me on February 14, 2026.";

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

      {/* Main Content */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Success Icon */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-14 h-14 text-teal" />
              </div>
            </motion.div>

            {/* Thank You Message */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-plum text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4"
            >
              You're In{name ? `, ${name}` : ""}!
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-body text-xl md:text-2xl text-slate mb-2"
            >
              Thank you for registering.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-body text-lg text-slate-light mb-8 max-w-lg mx-auto"
            >
              We're honored you're choosing to be part of this conversation.
              {email && (
                <>
                  {" "}
                  A confirmation email is on its way to{" "}
                  <strong className="text-slate">{email}</strong>.
                </>
              )}
            </motion.p>

            {/* Gold Divider */}
            <motion.div variants={fadeInUp}>
              <div className="gold-divider my-8" />
            </motion.div>

            {/* What to Expect Next */}
            <motion.div variants={fadeInUp} className="mb-10">
              <h2 className="font-display text-plum text-2xl md:text-3xl font-semibold mb-6">
                What Happens Next
              </h2>
              <div className="space-y-4 text-left max-w-md mx-auto">
                {[
                  {
                    icon: Mail,
                    title: "Check your inbox",
                    desc: "You'll receive a confirmation email with your Zoom link shortly.",
                  },
                  {
                    icon: Calendar,
                    title: "Save the date",
                    desc: "Friday, February 14, 2026 at 10:30 AM PT",
                  },
                  {
                    icon: Heart,
                    title: "Invite a friend",
                    desc: "Know someone who needs this conversation? Share the event with them.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <h3 className="font-display text-plum font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="font-body text-slate-light text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Event Details Reminder */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-10"
            >
              <h3 className="font-display text-plum text-xl font-semibold mb-4">
                Event Details
              </h3>
              <div className="flex flex-wrap justify-center gap-3 text-slate">
                <div className="flex items-center gap-2 bg-lavender-light px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">
                    Friday, February 14, 2026
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-lavender-light px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">
                    10:30 AM – 12:00 PM PT
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-lavender-light px-4 py-2 rounded-full">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">Virtual (Zoom)</span>
                </div>
                <div className="flex items-center gap-2 bg-lavender-light px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-teal" />
                  <span className="font-body text-sm">
                    Zoom link sent via email
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-plum to-purple-deep text-white rounded-3xl p-8 md:p-10"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                Help us spread the word
              </h2>
              <p className="font-body text-white/80 mb-6">
                Know someone who needs this conversation? Share the event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <AddToCalendar />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold px-8 py-6 text-lg rounded-full"
                >
                  <a href="/">
                    Back to Event Page <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/20">
                <span className="font-body text-sm text-white/60 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share:
                </span>
                <div className="flex gap-2">
                  {[
                    {
                      name: "Twitter",
                      icon: Twitter,
                      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
                    },
                    {
                      name: "Facebook",
                      icon: Facebook,
                      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    },
                    {
                      name: "LinkedIn",
                      icon: Linkedin,
                      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Meno-Pause Unmasked")}`,
                    },
                    {
                      name: "Email",
                      icon: Mail,
                      url: `mailto:?subject=${encodeURIComponent("Join me for Meno-Pause Unmasked")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
                    },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                      aria-label={`Share on ${link.name}`}
                    >
                      <link.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
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
