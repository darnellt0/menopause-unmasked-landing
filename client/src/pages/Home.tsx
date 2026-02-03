/**
 * menoPause Unmasked Landing Page
 * Design: Soft Editorial Sanctuary
 * - Playfair Display for headlines, Source Sans Pro for body
 * - Warm cream background, deep plum headlines, teal CTAs, gold accents
 * - Generous whitespace, organic shapes, editorial feel
 */

import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ArrowRight, Check, Heart, MessageCircle, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";

// CDN URLs for uploaded assets
const ASSETS = {
  juicyLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/NWwwPvrVCErIWeJh.png",
  asaraPhoto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/QXxDlSCtsxlNrUIM.png",
  elevatedLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/YJuPGVLNybGhvOmI.png",
  shriaPhoto: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/pcxxwfjmueLyhBtm.png",
  heroBackground: "https://private-us-east-1.manuscdn.com/sessionFile/TjFxtf1M3fwSTYypLEbba2/sandbox/1HLL51K8scVkWcgEpN4KKP-img-1_1770160430000_na1fn_aGVyby1hYnN0cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGpGeHRmMU0zZndTVFl5cExFYmJhMi9zYW5kYm94LzFITEw1MUs4c2NWa1djZ0VwTjRLS1AtaW1nLTFfMTc3MDE2MDQzMDAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ipD1uy4sQvXPv16SMyp2WlsezOG3y2pXvkoIAnIkMIT5K82pi8fMhVVNLPUPww9aOIpuVWNyn0QMHIWx7dYNXorBecuHOjnr3Nf~BraWbI8ycKCuXf~vjvcpD4bk1lmSWhPR6nKUkjdUSHxlI4CGShAcJ1iJpq1NRrx-2AaHRnJqa95A8WWMCyhT1Lo2VilUk9FVVp2AJqeSpRAO-JjgVwV8LZ-glOOY-vqZvB~-q12ToTMMyaN2mOTw3YVoVBO0iR37McbSvqz6jUut1B-ZExmdAu5cuQaiC0q-1Z027xGCujjsgaW1wui7zD-GzLHA9m3FNxAwwhrhGlhVeXMNfQ__",
  communityImage: "https://private-us-east-1.manuscdn.com/sessionFile/TjFxtf1M3fwSTYypLEbba2/sandbox/1HLL51K8scVkWcgEpN4KKP-img-2_1770160419000_na1fn_Y29tbXVuaXR5LWdhdGhlcmluZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVGpGeHRmMU0zZndTVFl5cExFYmJhMi9zYW5kYm94LzFITEw1MUs4c2NWa1djZ0VwTjRLS1AtaW1nLTJfMTc3MDE2MDQxOTAwMF9uYTFmbl9ZMjl0YlhWdWFYUjVMV2RoZEdobGNtbHVady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pN1fWZGiRM5YyS8X73JIWhNS0pfmD9xzUQB7qjjvUjtgUE7g0FFtxh12CHqi6k740CFMeuWZmvKLtAw8-s2j5qTcCEN9OmEU4VBYUN6parMpsjBxRYvIetXCCPs1jP23bI0sxmekG293d7PR-gXB-lPCFiBukKuDsefWK~OtK8nx2~e1aG8U~ypKM31CpMoaDUoq8PmuIygjddyZ6VxmVwXFxx~3htR~~8hQkmda1ENlTsNOpNb~XhWhxZa8WaJVZVoUvK00MuiO~2pTZZtpdN7HbxTxDGTf~~qtFTAGXz~DUBBlccojYIuqE1JneskAT67S5Wiwde8izwIfXReppg__",
};

const REGISTRATION_URL = "https://www.elevatedmovements.com/registration";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-lavender">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <img 
            src={ASSETS.elevatedLogo} 
            alt="Elevated Movements" 
            className="h-10 md:h-12 w-auto"
          />
          <Button 
            asChild
            className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-6"
          >
            <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${ASSETS.heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream" />
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center py-16 md:py-24"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.p 
              variants={fadeInUp}
              className="text-gold font-body font-semibold tracking-widest uppercase text-sm mb-6"
            >
              Elevated Movements × Juicy 2 100 presents
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
              className="font-display text-2xl md:text-3xl text-slate italic mb-8"
            >
              Myths, Truths, and Solutions
            </motion.p>
            
            {/* Support Line */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-lg md:text-xl text-slate-light max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              A community conversation designed to bring clarity, language, and support 
              to a season that's too often experienced in silence.
            </motion.p>
            
            {/* Event Details */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-slate"
            >
              <div className="flex items-center gap-2 bg-lavender/50 px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-teal" />
                <span className="font-body">Virtual</span>
              </div>
              <div className="flex items-center gap-2 bg-lavender/50 px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-teal" />
                <span className="font-body">February 14, 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-lavender/50 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-teal" />
                <span className="font-body">10:30 AM – 12:00 PM PT</span>
              </div>
              <div className="flex items-center gap-2 bg-lavender/50 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 text-teal" />
                <span className="font-body">Zoom</span>
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
                <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
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
            </motion.div>
            
            {/* Microcopy */}
            <motion.p 
              variants={fadeInUp}
              className="font-body text-sm text-slate-light"
            >
              Registration required. You'll receive a confirmation email with the Zoom link.
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
      <section className="section-padding bg-lavender/30">
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
                "You're ready for community—without having to explain yourself"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-white/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
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
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Sparkles, title: "Clarity", desc: "On common myths vs. what's actually true" },
                { icon: Shield, title: "Confidence", desc: "To advocate for yourself (questions to bring to your provider)" },
                { icon: MessageCircle, title: "Language", desc: "For symptoms, shifts, and needs" },
                { icon: Heart, title: "Connection", desc: "With women navigating this transition too" }
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

      {/* Featured Hosts Section */}
      <section className="section-padding bg-lavender/30">
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
              Featured Hosts
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
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={ASSETS.juicyLogo} alt="Juicy 2 100 Nation" className="h-10 w-auto" />
                  </div>
                  <h3 className="font-display text-plum text-2xl font-semibold mb-2">Asara Tsehai</h3>
                  <p className="font-body text-teal font-medium mb-4">Featured Guest • Juicy 2 100</p>
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
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/30 transform md:-translate-x-1/2" />
              
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
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full transform -translate-x-1/2 mt-8 ring-4 ring-cream" />
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              variants={fadeInUp}
              className="font-body text-slate-light text-center mt-8 bg-lavender/30 p-4 rounded-xl"
            >
              <strong>Accessibility:</strong> If you need captions or accommodations, you can note this on the registration form.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Community Agreements */}
      <section className="section-padding bg-plum text-white">
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
                  <h3 className="font-display text-xl font-semibold mb-2 text-gold-light">{item.title}</h3>
                  <p className="font-body text-white/80">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-12 bg-lavender/30">
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
          className="absolute inset-0 opacity-20"
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
              className="font-body text-slate text-lg md:text-xl mb-10"
            >
              Reserve your seat and bring a friend who needs this conversation.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Button 
                asChild
                size="lg"
                className="bg-teal hover:bg-teal-light text-white font-body font-semibold px-10 py-7 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer">
                  Register Now <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mt-8 text-slate-light font-body"
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
      <footer className="bg-plum text-white py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Logos */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-12 w-auto brightness-0 invert" />
              <span className="text-gold text-2xl">×</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100 Nation" className="h-16 w-auto" />
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 font-body text-sm">
              <a href="mailto:hello@elevatedmovements.com" className="hover:text-gold transition-colors">
                Contact
              </a>
              <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                Register
              </a>
            </div>
            
            {/* Copyright */}
            <p className="font-body text-sm text-white/60 text-center">
              © 2026 Elevated Movements × Juicy 2 100. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
