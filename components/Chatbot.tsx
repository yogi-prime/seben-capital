'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  type: 'bot' | 'user';
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { toast } = useToast();

  const steps = [
    { question: "Hi! 👋 I'm Seben Assistant. Can I help you get started?", field: "greeting", placeholder: "Click 'Yes' to continue", isButton: true },
    { question: "What's your name?", field: "name", placeholder: "Enter your name" },
    { question: "Great, {name}. What's your phone number?", field: "phone", placeholder: "Enter your phone number" },
    { question: "Lastly, your email?", field: "email", placeholder: "Enter your email address" },
  ];

  const initializeChat = () => {
    setMessages([{ type: 'bot', content: steps[0].question }]);
    setCurrentStep(0);
    setIsInputDisabled(false);
  };

  const handleStartChat = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      setMessages((prev) => [...prev, { type: 'bot', content: steps[1].question }]);
      setIsInputDisabled(false);
    }
  };

  const validateInput = (value: string, field: string): boolean => {
    if (!value.trim()) return false;
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (field === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      return phoneRegex.test(value.replace(/\s+/g, ''));
    }
    return true;
  };

  const handleSubmit = () => {
    if (!currentInput.trim()) return;

    const currentField = steps[currentStep].field;

    if (!validateInput(currentInput, currentField)) {
      toast({
        title: "Invalid Input",
        description:
          currentField === 'email'
            ? "Please enter a valid email address"
            : currentField === 'phone'
            ? "Please enter a valid Indian phone number"
            : "Please enter a valid value",
        variant: "destructive",
      });
      return;
    }

    setMessages((prev) => [...prev, { type: 'user', content: currentInput }]);
    setUserData((prev) => ({ ...prev, [currentField]: currentInput }));

    const confirmationMessage = `Thanks, ${currentField === 'name' ? currentInput : userData.name}!`;
    setMessages((prev) => [...prev, { type: 'bot', content: confirmationMessage }]);

    setCurrentInput("");
    setIsInputDisabled(true);

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        if (nextStep < steps.length) {
          const nextQuestion = steps[nextStep].question.replace('{name}', userData.name || currentInput);
          setMessages((prev) => [...prev, { type: 'bot', content: nextQuestion }]);
          setIsInputDisabled(false);
        }
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { type: 'bot', content: "Thank you for your valuable time. Our team will connect with you shortly." },
          ]);
          setTimeout(() => {
            setMessages((prev) => [...prev, { type: 'bot', content: "How would you like to proceed?" }]);
          }, 1000);
        }, 500);

        // Replace with API call to store lead
        // console.log('Lead captured:', { ...userData, [currentField]: currentInput });

        toast({
          title: "Success!",
          description: "Your information has been saved. We'll contact you shortly.",
          variant: "default",
        });
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isInputDisabled) handleSubmit();
  };

  if (!isOpen) {
    return (
      <Button
        aria-label="Open assistant chat"
        onClick={() => {
          setIsOpen(true);
          if (messages.length === 0) initializeChat();
        }}
        className="fixed right-4 md:right-6 w-14 h-14 rounded-full bg-gradient-copper hover:scale-110 transition-transform shadow-copper z-[60] lg:bottom-6"
        size="icon"
        style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + 84px)` }}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </Button>
    );
  }

  return (
    <Card
      role="dialog"
      aria-label="Assistant chat window"
      className="fixed right-4 md:right-6 w-[90vw] max-w-[380px] h-[min(75vh,560px)] flex flex-col card-elevated shadow-copper z-[60] lg:bottom-6"
      style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + 88px)` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-copper text-primary-foreground rounded-t-lg">
        <div>
          <h3 className="font-semibold">Seben Assistant</h3>
          <p className="text-sm opacity-90">Let's get you started</p>
        </div>
        <Button
          aria-label="Close chat"
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 flex flex-col p-0">
        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4" aria-live="polite">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === 'user' ? 'bg-copper-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}

          {currentStep >= steps.length - 1 && messages.length > 6 && (
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-gradient-copper">WhatsApp Us</Button>
              <Button variant="outline" size="sm" className="w-full border-copper-primary/30 text-copper-primary">
                Explore Utkarsh
              </Button>
              <Button variant="outline" size="sm" className="w-full border-copper-primary/30 text-copper-primary">
                Download Brochure
              </Button>
            </div>
          )}
        </div>

        {currentStep < steps.length && (
          <div className="p-4 border-t border-border shrink-0 sticky bottom-0 bg-background/80 backdrop-blur">
            {currentStep === 0 ? (
              <Button onClick={handleStartChat} className="w-full bg-gradient-copper">
                Yes, let's get started!
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Input
                  aria-label={steps[currentStep]?.placeholder}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={steps[currentStep]?.placeholder}
                  disabled={isInputDisabled}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  aria-label="Send"
                  onClick={handleSubmit}
                  disabled={isInputDisabled || !currentInput.trim()}
                  size="icon"
                  className="bg-gradient-copper"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="px-4 pb-4 shrink-0">
          <p className="text-xs text-muted-foreground text-center">
            We respect your privacy. Your info is used only to contact you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
