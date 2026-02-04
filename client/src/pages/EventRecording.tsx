import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download, FileText, Heart, Video } from "lucide-react";

const ASSETS = {
  elevatedLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/3hnVGT1Vc2Yk3bSQ.png",
  juicyLogo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663303642209/vPEBBvqQnlTWIxWg.png",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function EventRecording() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-lavender shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-10 w-auto" />
              <span className="text-gold-dark text-sm">×</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100" className="h-12 w-auto" />
            </div>
            <Button 
              asChild
              size="sm"
              className="bg-teal hover:bg-teal-light text-white font-body font-semibold rounded-full"
            >
              <a href="/">
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-20">
        <div className="container">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Thank You Section */}
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full font-body font-semibold text-sm mb-6">
                <Heart className="w-4 h-4" />
                Thank you for joining us
              </div>
              <h1 className="font-display text-plum text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                menoPause Unmasked
                <span className="block italic font-normal text-plum-light mt-2">Event Recording & Resources</span>
              </h1>
              <p className="font-body text-slate text-lg md:text-xl max-w-2xl mx-auto">
                We're so grateful you were part of this conversation. Below you'll find the recording and additional resources to continue your journey.
              </p>
            </motion.div>

            {/* Video Player Section */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-slate/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Video className="w-16 h-16 text-plum mx-auto mb-4" />
                    <p className="font-body text-slate mb-4">
                      Recording will be available here within 24 hours after the event
                    </p>
                    <p className="font-body text-sm text-slate-light">
                      You'll receive an email notification when it's ready
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Resources Section */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="font-display text-plum text-3xl font-semibold mb-6 text-center">
                Resources & Downloads
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: FileText,
                    title: "Event Summary & Key Takeaways",
                    desc: "A written summary of the main points, myths addressed, and truths discussed",
                    action: "Download PDF"
                  },
                  {
                    icon: FileText,
                    title: "Questions to Ask Your Provider",
                    desc: "A printable guide to help you advocate for yourself during medical appointments",
                    action: "Download PDF"
                  },
                  {
                    icon: Heart,
                    title: "Community Resources",
                    desc: "Curated list of books, websites, and support groups for continued learning",
                    action: "View Resources"
                  },
                  {
                    icon: FileText,
                    title: "Reflection Journal Prompts",
                    desc: "Guided prompts to help you process and integrate what you learned",
                    action: "Download PDF"
                  }
                ].map((resource, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-lavender rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal/10 transition-colors">
                        <resource.icon className="w-6 h-6 text-plum group-hover:text-teal transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-plum text-xl font-semibold mb-2">{resource.title}</h3>
                        <p className="font-body text-slate-light text-sm mb-4">{resource.desc}</p>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-teal text-teal hover:bg-teal hover:text-white font-body font-semibold rounded-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {resource.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stay Connected CTA */}
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-br from-plum to-purple-deep text-white rounded-3xl p-8 md:p-12 text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                Stay Connected
              </h2>
              <p className="font-body text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join our community to be notified of future events, workshops, and resources about menopause and women's health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-plum hover:bg-cream font-body font-semibold px-8 py-6 text-lg rounded-full"
                >
                  Join Our Community <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 font-body font-semibold px-8 py-6 text-lg rounded-full"
                >
                  Follow on Social Media
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-plum text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={ASSETS.elevatedLogo} alt="Elevated Movements" className="h-8 w-auto opacity-80" />
              <span className="text-gold-dark text-sm">×</span>
              <img src={ASSETS.juicyLogo} alt="Juicy 2 100" className="h-10 w-auto opacity-80" />
            </div>
            <p className="font-body text-sm opacity-70">
              © 2026 Elevated Movements & Juicy 2 100. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
