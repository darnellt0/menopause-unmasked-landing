/**
 * menoPause Unmasked Landing Page
 * Design: Joint Venture - Elevated Movements × Juicy 2 100
 * Blended brand colors: Deep plum, gold, teal, lavender
 * Features: Countdown timer, social sharing, testimonials
 */

import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ArrowRight, Check, Heart, MessageCircle, Sparkles, Shield, Share2, Twitter, Facebook, Linkedin, Mail, Quote, CalendarPlus, ChevronDown, UserPlus } from "lucide-react";
import { WaitlistModal } from "@/components/WaitlistModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// CDN URLs for uploaded assets
const ASSETS = {
  juicyLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/NWwwPvrVCErIWeJh.png",
  asaraPhoto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/QXxDlSCtsxlNrUIM.png",
  elevatedLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/YJuPGVLNybGhvOmI.png",
  shriaPhoto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/pcxxwfjmueLyhBtm.png",
  heroBackground: "https://private-us-east-1.manuscdn.com/sessionFile/TjFxtf1M3fwSTYypLEbba2/sandbox/1HLL51K8scVkWcgEpN4KKP-img-1_1770160430000_na1fn_aGVyby1hYnN0cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGpGeHRmMU0zZndTVFl5cExFYmJhMi9zYW5kYm94LzFITEw1MUs4c2NWa1djZ0VwTjRLS1AtaW1nLTFfMTc3MDE2MDQzMDAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ipD1uy4sQvXPv16SMyp2WlsezOG3y2pXvkoIAnIkMIT5K82pi8fMhVVNLPUPww9aOIpuVWNyn0QMHIWx7dYNXorBecuHOjnr3Nf~BraWbI8ycKCuXf~vjvcpD4bk1lmSWhPR6nKUkjdUSHxlI4CGShAcJ1iJpq1NRrx-2AaHRnJqa95A8WWMCyhT1Lo2VilUk9FVVp2AJqeSpRAO-JjgVwV8LZ-glOOY-vqZvB~-q12ToTMMyaN2mOTw3YVoVBO0iR37McbSvqz6jUut1B-ZExmdAu5cuQaiC0q-1Z027xGCujjsgaW1wui7zD-GzLHA9m3FNxAwwhrhGlhVeXMNfQ__",
  communityImage: "https://private-us-east-1.manuscdn.com/sessionFile/TjFxtf1M3fwSTYypLEbba2/sandbox/1HLL51K8scVkWcgEpN4KKP-img-2_1770160419000_na1fn_Y29tbXVuaXR5LWdhdGhlcmluZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGpGeHRmMU0zZndTVFl5cExFYmJhMi9zYW5kYm94LzFITEw1MUs4c2NWa1djZ0VwTjRLS1AtaW1nLTJfMTc3MDE2MDQxOTAwMF9uYTFmbl9ZMjl0YlhWdWFYUjVMV2RoZEdobGNtbHVady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pN1fWZGiRM5YyS8X73JIWhNS0pfmD9xzUQB7qjjvUjtgUE7g0FFtxh12CHqi6k740CFMeuWZmvKLtAw8-s2j5qTcCEN9OmEU4VBYUN6parMpsjBxRYvIetXCCPs1jP23bI0sxmekG293d7PR-gXB-lPCFiBukKuDsefWK~OtK8nx2~e1aG8U~ypKM31CpMoaDUoq8PmuIygjddyZ6VxmVwXFxx~3htR~~8hQkmda1ENlTsNOpNb~XhWhxZa8WaJVZVoUvK00MuiO~2pTZZtpdN7HbxTxDGTf~~qtFTAGXz~DUBBlccojYIuqE1JneskAT67S5Wiwde8izwIfXReppg__",
};

const REGISTRATION_URL = "/register";
const EVENT_DATE = new Date("2026-02-14T10:30:00-08:00"); // February 14, 2026 10:30 AM PT

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } as const
  }
};

// Countdown Timer Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// Countdown Timer Component
function CountdownTimer() {
  const timeLeft = useCountdown(EVENT_DATE);

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" }
      ].map((item, index) => (
        <div key={index} className="countdown-unit bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-sm">
          <span className="countdown-number text-plum">{String(item.value).padStart(2, '0')}</span>
          <span className="countdown-label text-slate-light">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// Social Share Component
function SocialShare() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = "Join me for Meno-Pause Unmasked: Myths, Truths, and Solutions - A community conversation on February 14, 2026";

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-[#1DA1F2] hover:text-white"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-[#4267B2] hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Meno-Pause Unmasked")}`,
      color: "hover:bg-[#0077B5] hover:text-white"
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent("Join me for Meno-Pause Unmasked")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      color: "hover:bg-teal hover:text-white"
    }
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-sm text-slate-light flex items-center gap-2">
        <Share2 className="w-4 h-4" /> Share:
      </span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-full bg-lavender-light flex items-center justify-center text-slate transition-all ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

// Add to Calendar Component
function AddToCalendar() {
  const eventTitle = "Meno-Pause Unmasked: Myths, Truths, and Solutions";
  const eventDescription = "A community conversation designed to bring clarity, language, and support to a season that's too often experienced in silence. Hosted by Elevated Movements × Juicy 2 100.";
  const eventLocation = "Zoom (link will be sent after registration)";
  const startDate = "2026-02-14T10:30:00";
  const endDate = "2026-02-14T12:00:00";
  const timezone = "America/Los_Angeles";

  // Format dates for different calendar services
  const formatGoogleDate = (date: string) => date.replace(/[-:]/g, '').replace('T', 'T');
  const googleStart = formatGoogleDate(startDate);
  const googleEnd = formatGoogleDate(endDate);

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${googleStart}/${googleEnd}&ctz=${timezone}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  // Outlook Web Calendar URL
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventTitle)}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

  // Generate ICS file content for Apple Calendar / download
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Elevated Movements//Meno-Pause Unmasked//EN
BEGIN:VEVENT
UID:menopause-unmasked-2026@elevatedmovements.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;TZID=${timezone}:${startDate.replace(/[-:]/g, '')}
DTEND;TZID=${timezone}:${endDate.replace(/[-:]/g, '')}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription.replace(/\n/g, '\\n')}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'menopause-unmasked.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-gold text-plum hover:bg-gold/10 font-body font-medium px-4 py-2 rounded-full flex items-center gap-2"
        >
          <CalendarPlus className="w-4 h-4" />
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
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V9h15v10.5zm0-12h-15v-3h15v3z"/>
            </svg>
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
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 3h-19C1.675 3 1 3.675 1 4.5v15c0 .825.675 1.5 1.5 1.5h19c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zM8 17H4v-4h4v4zm0-6H4V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4z"/>
            </svg>
            Outlook Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={generateICS}
          className="flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Apple Calendar (.ics)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Testimonials Data
const testimonials = [
  {
    quote: "Elevated Movements creates spaces where I can finally exhale. The conversations are real, the community is supportive, and I always leave feeling seen.",
    author: "Community Member",
    event: "Previous Elevated Movements Event"
  },
  {
    quote: "I didn't know how much I needed this until I was in the room. The way Shria holds space is unlike anything I've experienced.",
    author: "Workshop Participant",
    event: "Elevated Movements Workshop"
  },
  {
    quote: "Finally, a space where we can talk about what we're really going through without judgment. This is the community I've been searching for.",
    author: "Event Attendee",
    event: "Community Conversation"
  }
];

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-lavender">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img 
              src={ASSETS.elevatedLogo} 
              alt="Elevated Movements" 
              className="h-10 md:h-12 w-auto" style={{height: '57px'}}
            />
            <span className="text-gold-dark text-xl font-display" style={{display: 'none'}}>&</span>
            <img 
              src={ASSETS.juicyLogo} 
              alt="Juicy 2 100" 
              className="h-10 md:h-12 w-auto" style={{height: '92px', display: 'none'}}
            />
          </div>
          <Button
            asChild
            className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-6"
          >
            <a href={REGISTRATION_URL}>
              Register Now
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${ASSETS.heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream" />
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center py-12 md:py-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{paddingTop: '14px'}}
          >
            {/* Joint Venture Badge */}
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-6"
              style={{height: '169px'}}
            >
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-8 w-auto" style={{height: '123px'}} />
              <span className="text-gold-dark text-lg font-display" style={{width: '24px', height: '32px', paddingLeft: '11px', fontSize: '27px'}}>&</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100" className="h-10 w-auto" style={{height: '271px'}} />
            </motion.div>
            
            {/* Eyebrow */}
            <motion.p 
              variants={fadeInUp}
              className="text-gold-dark font-body font-semibold tracking-widest uppercase text-sm mb-4"
            >
              A Joint Presentation
            </motion.p>
            
            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="font-display text-plum text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-4"
            >
              Meno-Pause
              <span className="block italic font-normal text-plum-light">Unmasked</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="font-display text-2xl md:text-3xl text-slate italic mb-6"
            >
              Myths, Truths, and Solutions
            </motion.p>
            
            {/* Support Line */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-lg md:text-xl text-slate-light max-w-2xl mx-auto mb-8 leading-relaxed" style={{fontSize: '22px'}}
            >
              A community conversation designed to bring clarity, language, and support 
              to a season that's too often experienced in silence.
            </motion.p>
            
            {/* Countdown Timer */}
            <motion.div variants={fadeInUp} className="mb-8">
              <p className="font-body text-sm text-slate-light uppercase tracking-wider mb-4">Event starts in:</p>
              <CountdownTimer />
            </motion.div>
            
            {/* Event Details */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 text-slate"
            >
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">Virtual</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Calendar className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">February 14, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Clock className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">10:30 AM – 12:00 PM PT</span>
              </div>
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Users className="w-4 h-4 text-teal" />
                <span className="font-body text-sm">Zoom</span>
              </div>
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a href={REGISTRATION_URL}>
                  Register Now <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-plum text-plum hover:bg-plum hover:text-white font-body font-semibold px-8 py-6 text-lg rounded-full transition-all"
              >
                <a href="#what-to-expect">
                  What to Expect ↓
                </a>
              </Button>
              <Button 
                onClick={() => setWaitlistOpen(true)}
                variant="outline"
                size="lg"
                className="border-gold-dark text-gold-dark hover:bg-gold-dark hover:text-white font-body font-semibold px-8 py-6 text-lg rounded-full transition-all"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Join Waitlist
              </Button>
            </motion.div>
            
            {/* Social Share & Add to Calendar */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <SocialShare />
              <AddToCalendar />
            </motion.div>
            
            {/* Microcopy */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-sm text-slate-light"
            >
              Complementary • Registration required • You'll receive a confirmation email with the Zoom link
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider my-0" />

      {/* Why This Conversation Section */}
      <section className="section-padding bg-cream">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 leading-tight"
            >
              This conversation was never meant to be private.
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-body text-lg md:text-xl text-slate leading-relaxed"
            >
              Menopause can bring real changes—physical, emotional, and relational—yet so many 
              women are left to piece together information alone. This space is a guided, 
              community-centered conversation to help you separate myth from truth and leave 
              with practical next steps.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider" />

      {/* Who It's For Section */}
      <section className="section-padding bg-lavender-light">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
            >
              You belong in this room if…
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Your body feels unfamiliar lately",
                "You're wondering whether what you're feeling is perimenopause or menopause",
                "You want facts without fear or shame",
                "You want language for what you're experiencing",
                "You're ready for community—without having to explain yourself",
                "You're seeking practical tools and resources for this transition"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-teal" />
                  </div>
                  <p className="font-body text-slate text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              variants={fadeInUp}
              className="font-body text-slate-light text-center mt-10 italic text-lg"
            >
              You don't need the right words. Curiosity is enough.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section className="section-padding bg-cream">
        <div className="container">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
            >
              What you'll walk away with
            </motion.h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Sparkles, title: "Clarity", desc: "On common myths vs. what's actually true" },
                { icon: Shield, title: "Confidence", desc: "To advocate for yourself (questions to bring to your provider)" },
                { icon: MessageCircle, title: "Language", desc: "For symptoms, shifts, and needs" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center group"
                >
                  <div className="w-16 h-16 bg-lavender rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-teal/10 transition-colors">
                    <item.icon className="w-8 h-8 text-plum group-hover:text-teal transition-colors" />
                  </div>
                  <h3 className="font-display text-plum text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="font-body text-slate-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider" />

      {/* Testimonials Section */}
      <section className="section-padding bg-plum text-white">
        <div className="container">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
            >
              What Our Community Says
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-body text-white/70 text-center mb-12 text-lg"
            >
              Voices from past Elevated Movements experiences
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 relative"
                >
                  <Quote className="w-10 h-10 text-gold/50 absolute top-6 right-6" />
                  <p className="font-body text-white/90 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-display text-gold font-semibold">{testimonial.author}</p>
                    <p className="font-body text-white/60 text-sm">{testimonial.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Hosts Section */}
      <section className="section-padding bg-lavender-light">
        <div className="container">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-center"
            >
              Your Hosts
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-body text-slate-light text-center mb-12 text-lg"
            >
              Guided by women who understand this journey
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Shria */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-lavender">
                  <img 
                    src={ASSETS.shriaPhoto} 
                    alt="Shria Tomlinson" 
                    className="w-full h-full object-cover object-top"
                    style={{transform: 'scale(0.85)', transformOrigin: 'center top'}}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-8 w-auto" />
                  </div>
                  <h3 className="font-display text-plum text-2xl font-semibold mb-2">Shria Tomlinson</h3>
                  <p className="font-body text-teal font-medium mb-4">Host • Founder, Elevated Movements</p>
                  <p className="font-body text-slate leading-relaxed">
                    Shria creates intentional spaces where women—especially women of color—can 
                    tell the truth, be seen, and move from isolation to agency.
                  </p>
                </div>
              </motion.div>
              
              {/* Asara */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-lavender">
                  <img 
                    src={ASSETS.asaraPhoto} 
                    alt="Asara Tsehai" 
                    className="w-full h-full object-cover object-top"
                    style={{filter: 'contrast(1.05) brightness(1.02) saturate(1.05)'}}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={ASSETS.juicyLogo} alt="Juicy 2 100 Nation" className="h-12 w-auto" />
                  </div>
                  <h3 className="font-display text-plum text-2xl font-semibold mb-2">Asara Tsehai</h3>
                  <p className="font-body text-teal font-medium mb-4">Featured Guest • Juicy to 100</p>
                  <p className="font-body text-slate leading-relaxed">
                    Asara brings a grounded approach to women's health education—helping women 
                    move from fear to facts and feel supported in what they're navigating.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section id="what-to-expect" className="section-padding bg-cream scroll-mt-20">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
            >
              What to Expect
            </motion.h2>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold to-gold/30 transform md:-translate-x-1/2" />
              
              {[
                { title: "Welcome & Community Agreements", desc: "A welcoming opening to set the tone for our time together" },
                { title: "Myth vs. Truth", desc: "What's common, what's misunderstood, and what you need to know" },
                { title: "Practical Education", desc: "Supportive conversation grounded in lived experience" },
                { title: "Guided Reflection", desc: "Prompts to help you process and integrate" },
                { title: "Q&A", desc: "Space for your questions (as time allows)" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                    <div className="bg-white p-6 rounded-2xl shadow-sm inline-block text-left">
                      <h3 className="font-display text-plum text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="font-body text-slate-light">{item.desc}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full transform -translate-x-1/2 mt-7 ring-4 ring-cream shadow-md" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              variants={fadeInUp}
              className="font-body text-slate-light text-center mt-8 bg-white p-4 rounded-xl shadow-sm"
            >
              <strong>Accessibility:</strong> If you need captions or accommodations, you can note this on the registration form.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Community Agreements */}
      <section className="section-padding bg-gradient-to-br from-plum to-purple-deep text-white">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-center"
            >
              Community Agreements
            </motion.h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Confidentiality matters", desc: "Take the learning, leave personal stories here" },
                { title: "Speak from 'I'", desc: "Share from your own experience, no diagnosing others" },
                { title: "No minimizing", desc: "Honor lived experience without judgment" },
                { title: "Care for yourself", desc: "Pause or step away as needed" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
                >
                  <h3 className="font-display text-xl font-semibold mb-2 text-gold">{item.title}</h3>
                  <p className="font-body text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 bg-lavender-light">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-body text-slate italic">
              <strong>Important:</strong> This event is for education and community support. 
              It is not medical advice or a substitute for professional care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-cream relative overflow-hidden">
        {/* Background decoration */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{ backgroundImage: `url(${ASSETS.communityImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/95 to-cream/80" />
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-display text-plum text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
            >
              Ready to join us?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="font-body text-slate text-lg md:text-xl mb-8"
            >
              Reserve your seat and bring a friend who needs this conversation.
            </motion.p>
            
            {/* Mini Countdown */}
            <motion.div variants={fadeInUp} className="mb-8">
              <CountdownTimer />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Button
                asChild
                size="lg"
                className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-10 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                <a href={REGISTRATION_URL}>
                  Register Now <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </Button>
            </motion.div>
            
            {/* Social Share & Add to Calendar */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <SocialShare />
              <AddToCalendar />
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mt-6 text-slate-light font-body"
            >
              <span>Free</span>
              <span>•</span>
              <span>Virtual</span>
              <span>•</span>
              <span>Zoom</span>
              <span>•</span>
              <span>February 14, 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-plum to-purple-deep text-white py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Joint Venture Logos */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-12 w-auto brightness-0 invert" />
              <span className="text-gold text-2xl font-display">×</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100 Nation" className="h-16 w-auto" />
            </div>
            
            <p className="font-body text-white/70 text-center mb-8 max-w-lg mx-auto">
              A joint presentation bringing together two communities committed to supporting women through every season of life.
            </p>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 font-body text-sm">
              <a href="mailto:hello@elevatedmovements.com" className="hover:text-gold transition-colors">
                Contact
              </a>
              <a href={REGISTRATION_URL} className="hover:text-gold transition-colors">
                Register
              </a>
            </div>
            
            {/* Copyright */}
            <p className="font-body text-sm text-white/50 text-center">
              © 2026 Elevated Movements × Juicy 2 100. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Waitlist Modal */}
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
