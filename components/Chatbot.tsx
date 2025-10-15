'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API } from "@/lib/api";

type Step = {
  key: string;              // 'greeting' | 'name' | 'phone' | 'email' | ...
  question: string;
  placeholder?: string;
  type?: 'button' | 'text' | 'phone' | 'email';
  is_button?: boolean;
};

interface ChatMessage {
  type: 'bot' | 'user';
  content: string;
  step_key?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [leadId, setLeadId] = useState<number | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState<Record<string, string>>({});
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const { toast } = useToast();
  const scrollerRef = useRef<HTMLDivElement>(null);

  // load flow
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const json = await API.get<{ data: { steps: Step[] } }>('/chatbot/flow');
        const flow = json?.data?.steps || [];
        setSteps(flow);
        // start with first question
        if (flow.length) {
          setMessages([{ type: 'bot', content: flow[0].question, step_key: flow[0].key }]);
          setCurrentStepIndex(0);
          setIsInputDisabled(flow[0].type === 'button');
        }
      } catch (e: any) {
        console.error(e);
        // fallback to the old hard-coded flow if API fails
        const fallback: Step[] = [
          { key: 'greeting', question: "Hi! 👋 I'm Seben Assistant. Can I help you get started?", placeholder: "Click 'Yes' to continue", type: 'button', is_button: true },
          { key: 'name', question: "What's your name?", placeholder: "Enter your name", type: 'text' },
          { key: 'phone', question: "Great, {name}. What's your phone number?", placeholder: "Enter your phone number", type: 'phone' },
          { key: 'email', question: "Lastly, your email?", placeholder: "Enter your email address", type: 'email' },
        ];
        setSteps(fallback);
        setMessages([{ type: 'bot', content: fallback[0].question, step_key: 'greeting' }]);
        setCurrentStepIndex(0);
        setIsInputDisabled(true);
      }
    })();
  }, [isOpen]);

  // auto scroll
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 999999, behavior: 'smooth' });
  }, [messages.length]);

  const validate = (val: string, step: Step): boolean => {
    if (!val.trim()) return false;
    if (step.type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    if (step.type === 'phone') {
      return /^[6-9]\d{9}$/.test(val.replace(/\s+/g, ''));
    }
    return true;
  };

  const sendToAPI = async (field: string, value: string, completed = false) => {
    try {
      const res = await API.post<{ data: { lead_id: number } }>('/chatbot/leads', {
        json: { lead_id: leadId, field, value, completed, answers: completed ? userData : undefined, messages: completed ? messages : undefined }
      });
      if (res?.data?.lead_id && !leadId) setLeadId(res.data.lead_id);
    } catch (e: any) {
      console.error(e);
      // don't block the UX
    }
  };

  const startAfterGreeting = async () => {
    const idx = 1;
    setCurrentStepIndex(idx);
    const next = steps[idx];
    setMessages(prev => [...prev, { type: 'bot', content: next.question.replace('{name}', userData.name || ''), step_key: next.key }]);
    setIsInputDisabled(false);
  };

  const handleSubmit = async () => {
    const step = steps[currentStepIndex];
    if (!step) return;

    // greeting button flow
    if (step.type === 'button') {
      await startAfterGreeting();
      return;
    }

    const value = currentInput.trim();
    if (!validate(value, step)) {
      toast({
        title: "Invalid Input",
        description:
          step.type === 'email' ? "Please enter a valid email address" :
          step.type === 'phone' ? "Please enter a valid Indian phone number" :
          "Please enter a valid value",
        variant: "destructive",
      });
      return;
    }

    // show user's message
    setMessages(prev => [...prev, { type: 'user', content: value, step_key: step.key }]);
    // store locally
    const newData = { ...userData, [step.key]: value };
    setUserData(newData);
    setCurrentInput("");
    setIsInputDisabled(true);

    // save incremental to API
    await sendToAPI(step.key, value, false);

    // small confirmation bubble
    const who = step.key === 'name' ? value : (newData.name || 'there');
    setMessages(prev => [...prev, { type: 'bot', content: `Thanks, ${who}!` }]);

    // next question or finish
    setTimeout(async () => {
      if (currentStepIndex < steps.length - 1) {
        const nextIdx = currentStepIndex + 1;
        setCurrentStepIndex(nextIdx);
        const nxt = steps[nextIdx];
        const q = nxt.question.replace('{name}', newData.name || value);
        setMessages(prev => [...prev, { type: 'bot', content: q, step_key: nxt.key }]);
        setIsInputDisabled(nxt.type === 'button');
      } else {
        // final submit
        await sendToAPI(step.key, value, true);

        setMessages(prev => [
          ...prev,
          { type: 'bot', content: "Thank you for your valuable time. Our team will connect with you shortly." },
          { type: 'bot', content: "How would you like to proceed?" },
        ]);
        setIsInputDisabled(true);
        toast({ title: "Success!", description: "Your information has been saved. We'll contact you shortly." });
      }
    }, 800);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isInputDisabled) handleSubmit();
  };

  // UI
  if (!isOpen) {
    return (
      <Button
        aria-label="Open assistant chat"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 md:right-6 w-14 h-14 rounded-full bg-gradient-copper hover:scale-110 transition-transform shadow-copper z-[60] lg:bottom-6"
        size="icon"
        style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + 84px)` }}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </Button>
    );
  }

  const step = steps[currentStepIndex];
  const placeholder = step?.placeholder || "Type here…";

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
        <Button aria-label="Close chat" variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 flex flex-col p-0">
        <div ref={scrollerRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg text-sm ${m.type === 'user' ? 'bg-copper-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {m.content}
              </div>
            </div>
          ))}

          {currentStepIndex >= steps.length - 1 && messages.length > 4 && (
            <div className="space-y-2">
              <Button size="sm" className="w-full bg-gradient-copper">WhatsApp Us</Button>
              <Button variant="outline" size="sm" className="w-full border-copper-primary/30 text-copper-primary">Explore Utkarsh</Button>
              <Button variant="outline" size="sm" className="w-full border-copper-primary/30 text-copper-primary">Download Brochure</Button>
            </div>
          )}
        </div>

        {/* Input area */}
        {step && (
          <div className="p-4 border-t border-border shrink-0 sticky bottom-0 bg-background/80 backdrop-blur">
            {step.type === 'button' ? (
              <Button onClick={startAfterGreeting} className="w-full bg-gradient-copper">
                Yes, let's get started!
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Input
                  aria-label={placeholder}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={placeholder}
                  disabled={isInputDisabled}
                  onKeyDown={onKeyPress}
                  className="flex-1"
                />
                <Button aria-label="Send" onClick={handleSubmit} disabled={isInputDisabled || !currentInput.trim()} size="icon" className="bg-gradient-copper">
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
