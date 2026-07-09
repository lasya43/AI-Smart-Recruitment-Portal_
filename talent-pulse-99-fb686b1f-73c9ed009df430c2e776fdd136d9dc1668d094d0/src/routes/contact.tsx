import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SmartRecruit" },
      { name: "description", content: "Get in touch with the SmartRecruit team." },
      { property: "og:title", content: "Contact SmartRecruit" },
      { property: "og:description", content: "Reach the SmartRecruit team for sales, support, or partnerships." },
      { property: "og:url", content: "https://talent-pulse-99.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://talent-pulse-99.lovable.app/contact" }],
  }),
  component: () => (
    <PublicLayout>
      <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Talk to us</h1>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you. Reach out for sales, support, or partnerships.</p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@smartrecruit.io</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 80 1234 5678</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Bengaluru, India</li>
          </ul>
        </div>
        <Card><CardContent className="p-6">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Message sent. We'll be in touch."); }} className="space-y-4">
            <div><Label htmlFor="contact-name">Full Name</Label><Input id="contact-name" required placeholder="Your name" /></div>
            <div><Label htmlFor="contact-email">Email</Label><Input id="contact-email" required type="email" placeholder="you@company.com" /></div>
            <div><Label htmlFor="contact-message">Message</Label><Textarea id="contact-message" required placeholder="How can we help?" rows={5} /></div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent></Card>
      </section>
    </PublicLayout>
  ),
});
