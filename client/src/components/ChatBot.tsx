/*
  ChatBot Component
  Design: Floating chat widget with pre-loaded Q&A
  Dark green + gold theme, matches site design
*/
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  type: "question" | "answer" | "system";
  text: string;
  timestamp: number;
}

const FAQ_DATA = [
  {
    question: "What services do you offer?",
    answer:
      "We offer exterior cleaning services including driveway and concrete cleaning, deck and patio cleaning, siding washing, walkway cleaning, and exterior vehicle washing. All services include free estimates.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes! We provide completely free estimates for all services. You can request an estimate through our online form or by calling us at (314) 467-0332.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "G&S Exterior Restoration is based in Mexico, Missouri. Travel availability for projects outside Mexico depends on project size, distance, and scheduling. Contact us to check your address.",
  },
  {
    question: "How do I book a service?",
    answer:
      "You can request a photo quote, choose a time for a free on-site estimate, or call or text (314) 467-0332. Calendar requests are confirmed before the appointment.",
  },
  {
    question: "Is G&S owner-operated?",
    answer:
      "Yes. Darren handles estimates, communicates directly with customers, and oversees the work on each project.",
  },
  {
    question: "How quickly can you schedule?",
    answer:
      "We work to accommodate your schedule. Many jobs can be scheduled within a few days. Contact us for specific availability.",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "system",
      text: "Hi! 👋 I'm here to answer questions about G&S Exterior Restoration. What would you like to know?",
      timestamp: Date.now(),
    },
  ]);
  const [showFAQ, setShowFAQ] = useState(true);

  const handleQuestionClick = (question: string, answer: string) => {
    const newMessages = [
      ...messages,
      {
        id: `q-${Date.now()}`,
        type: "question" as const,
        text: question,
        timestamp: Date.now(),
      },
      {
        id: `a-${Date.now()}`,
        type: "answer" as const,
        text: answer,
        timestamp: Date.now() + 100,
      },
    ];
    setMessages(newMessages);
    setShowFAQ(false);
  };

  const handleBookClick = () => {
    const bookingMessage = {
      id: `booking-${Date.now()}`,
      type: "system" as const,
      text: "Ready to book? Click the button below to schedule your free estimate on our Google Calendar!",
      timestamp: Date.now(),
    };
    setMessages([...messages, bookingMessage]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        type: "system",
        text: "Hi! 👋 I'm here to answer questions about G&S Exterior Restoration. What would you like to know?",
        timestamp: Date.now(),
      },
    ]);
    setShowFAQ(true);
  };

  return (
    <>
      {/* Chat Widget */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isOpen ? "w-96 h-[600px]" : "w-16 h-16"
        }`}
        style={{
          boxShadow: "0 5px 40px rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Chat Window */}
        {isOpen && (
          <div
            className="flex flex-col h-full"
            style={{ backgroundColor: "oklch(0.20 0.06 155)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                backgroundColor: "oklch(0.15 0.05 155)",
                borderColor: "oklch(0.35 0.08 155)",
              }}
            >
              <h3
                className="font-bold text-sm"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  color: "oklch(0.82 0.10 75)",
                }}
              >
                G&S Support
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.82 0.10 75)" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "question" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className="max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed"
                    style={{
                      backgroundColor:
                        msg.type === "question"
                          ? "oklch(0.82 0.10 75)"
                          : "oklch(0.25 0.06 155)",
                      color:
                        msg.type === "question"
                          ? "oklch(0.15 0.05 155)"
                          : "oklch(0.93 0.02 80)",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Buttons or Action Buttons */}
            <div
              className="border-t p-4 space-y-2 max-h-48 overflow-y-auto"
              style={{ borderColor: "oklch(0.35 0.08 155)" }}
            >
              {showFAQ ? (
                <>
                  {FAQ_DATA.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuestionClick(faq.question, faq.answer)}
                      className="w-full text-left text-xs py-2 px-3 rounded transition-colors"
                      style={{
                        backgroundColor: "oklch(0.25 0.06 155)",
                        color: "oklch(0.93 0.02 80)",
                        fontFamily: "'Barlow', sans-serif",
                        border: "1px solid oklch(0.35 0.08 155)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "oklch(0.30 0.07 155)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "oklch(0.25 0.06 155)";
                      }}
                    >
                      {faq.question}
                    </button>
                  ))}
                </>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleBookClick}
                    className="w-full py-2 px-3 rounded text-sm font-bold transition-opacity"
                    style={{
                      backgroundColor: "oklch(0.82 0.10 75)",
                      color: "oklch(0.15 0.05 155)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    📅 Book Now
                  </button>
                  <a
                    href="https://calendar.app.google/YmtAenZ1D6f8BQ8h9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 px-3 rounded text-sm font-bold text-center transition-opacity"
                    style={{
                      backgroundColor: "oklch(0.25 0.06 155)",
                      color: "oklch(0.82 0.10 75)",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      border: "1px solid oklch(0.82 0.10 75)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    Go to Calendar
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full text-xs py-2 px-3 rounded transition-opacity"
                    style={{
                      color: "oklch(0.55 0.04 155)",
                      fontFamily: "'Barlow', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "0.7";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = "1";
                    }}
                  >
                    ← Back to Questions
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chat Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-full h-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              backgroundColor: "oklch(0.82 0.10 75)",
              color: "oklch(0.15 0.05 155)",
            }}
            title="Open chat"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>
    </>
  );
}
