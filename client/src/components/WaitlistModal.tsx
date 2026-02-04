import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success("You're on the waitlist!");
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setName("");
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-plum text-2xl">
                Join the Waitlist
              </DialogTitle>
              <DialogDescription className="font-body text-slate-light">
                This event is at capacity, but we'd love to notify you if spots open up or about future events.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body text-slate">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-body"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-body text-slate">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-body"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-teal hover:bg-teal-light text-white font-body font-semibold rounded-full"
                disabled={loading}
              >
                {loading ? (
                  "Adding you..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Join Waitlist
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-teal" />
            </div>
            <DialogTitle className="font-display text-plum text-2xl mb-3">
              You're on the list!
            </DialogTitle>
            <DialogDescription className="font-body text-slate-light mb-6">
              We'll email you at <strong className="text-slate">{email}</strong> if a spot opens up or when we announce future events.
            </DialogDescription>
            <Button
              onClick={handleClose}
              className="bg-teal hover:bg-teal-light text-white font-body font-semibold rounded-full"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
