import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24" aria-labelledby="cta-heading">
      <div className="container">
        <Card className="card-elevated bg-gradient-subtle border-copper-primary/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-copper opacity-5" />
          <CardContent className="relative z-10 py-16 px-8 text-center">
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Begin Your <span className="text-gradient-copper">Trading Journey?</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of successful traders who have transformed their approach to the markets through our structured education and mentorship programs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-copper hover:scale-105 transition-transform px-8 py-3 text-lg font-semibold"
                asChild
              >
                <Link href="/courses/utkarsh">
                  Join Utkarsh Course
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <a
                href="https://wa.me/919737965552"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a call on WhatsApp"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-copper-primary/30 text-copper-primary hover:bg-copper-primary hover:text-primary-foreground px-8 py-3 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </a>
            </div>

            <div className="inline-flex items-center justify-center p-3 bg-copper-primary/10 rounded-lg border border-copper-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong>Risk Disclosure:</strong> Markets carry inherent risks. Past performance does not guarantee future results.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
