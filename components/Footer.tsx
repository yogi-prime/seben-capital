import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    courses: [
      { name: "All Courses", href: "/education" },
      { name: "Utkarsh Trading Education", href: "/education/utkarsh" },
      { name: "Mentorship Programs", href: "/mentorship" },
    ],
    services: [
      { name: "Portfolio Management", href: "/services/portfolio-management" },
      { name: "Copy Trading", href: "/services/copy-trading" },
      { name: "Bot Trading", href: "/services/bot-trading" },
      { name: "Trading Desk", href: "/services/trading-desk" },
    ],
    tools: [
      { name: "Position Size Calculator", href: "/tools/position-size" },
      { name: "Compounding Calculator", href: "/tools/compounding" },
      { name: "SIP Goal Planner", href: "/tools/sip-goal-planner" },
      { name: "Options P/L Calculator", href: "/tools/options-pl" },
    ],
    legal: [
      { name: "Risk Disclosure", href: "/legal/risk-disclosure" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Grievance Redressal", href: "/legal/grievance" },
    ],
  };

  return (
    <footer className="bg-background-secondary border-t border-border" role="contentinfo">
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-heading font-bold text-gradient-copper mb-4">SEBEN CAPITAL</h3>
              <p className="text-muted-foreground leading-relaxed">
                India's premier trading and education platform. We blend institutional-grade research with practical education to help traders navigate markets with confidence.
              </p>
            </div>

            <address className="space-y-3 not-italic" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="Seben Capital" />
              <div className="flex items-center space-x-3 text-sm" itemProp="email">
                <Mail className="w-4 h-4 text-copper-primary" />
                <span className="text-muted-foreground">contact@sebencapital.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" itemProp="telephone">
                <Phone className="w-4 h-4 text-copper-primary" />
                <span className="text-muted-foreground">+91 97379 65552</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-4 h-4 text-copper-primary" />
                <span className="text-muted-foreground" itemProp="addressLocality">
                  Ahmedabad, India
                </span>
              </div>
            </address>

            <Button
              asChild
              className="mt-6 bg-gradient-copper hover:scale-105 transition-transform"
            >
              <a href="https://wa.me/919737965552" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Links Sections */}
          <nav className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Footer navigation">
            <div>
              <h4 className="font-semibold text-copper-primary mb-4">Education</h4>
              <ul className="space-y-3">
                {footerLinks.courses.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-copper-primary mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-copper-primary mb-4">Tools</h4>
              <ul className="space-y-3">
                {footerLinks.tools.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-copper-primary mb-4">Blog</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    All Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/risk-management-foundation"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Risk Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/trading-psychology"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Trading Psychology
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-copper-primary mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get weekly market insights and trading tips delivered to your inbox.
            </p>

            <form className="space-y-3" aria-label="Newsletter subscription">
              <Input
                placeholder="Enter your email"
                type="email"
                aria-label="Email address"
                className="bg-background border-copper-primary/20 focus:border-copper-primary"
              />
              <Button className="w-full bg-gradient-copper hover:scale-105 transition-transform" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.legal.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-copper-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Disclaimer and Copyright */}
        <div className="text-center space-y-4">
          <div className="max-w-4xl mx-auto p-4 bg-muted/10 rounded-lg border border-copper-primary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Disclaimer:</strong> Trading and investing involve substantial risk of loss. Past performance or targets are not indicative of future results. We are not SEBI registered investment advisors. Please trade responsibly and consider your risk tolerance. This website is for educational purposes only and should not be considered as financial advice.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Seben Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
