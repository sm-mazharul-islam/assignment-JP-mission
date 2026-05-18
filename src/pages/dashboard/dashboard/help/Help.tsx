import { useState } from "react";
import {
  HelpCircle,
  Phone,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessagesSquare,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface FAQItem {
  question: string;
  answer: string;
  category: "Account" | "Logistics" | "Reporting";
}

export default function HelpSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // ত্রাণ প্রজেক্ট ভিত্তিক ডাইনামিক FAQ ডাটা
  const faqs: FAQItem[] = [
    {
      category: "Logistics",
      question: "How do I update the status of a distribution batch?",
      answer:
        "Navigate to the 'All Supply' panel from your sidebar, locate the respective supply card, click on the edit option, and update the status attribute to 'Distributed' or 'Processing'. This will instantly refresh the centralized reporting grid.",
    },
    {
      category: "Reporting",
      question: "Can general users/volunteers download fiscal spreadsheets?",
      answer:
        "Yes! The 'Reporting' gateway is completely shared. Both administrators and verified volunteers can visualize inflow/outflow metrics and click the download button to export a secure CSV ledger.",
    },
    {
      category: "Account",
      question: "What should I do if my token session expires frequently?",
      answer:
        "For ecosystem security, tokens are encrypted with a strict expiration window. If you are continuously kicked out, clear your browser local storage once and re-authenticate via the secure login gateway.",
    },
  ];

  const handleSupportTicket = () => {
    toast.success("Initializing real-time emergency secure chat chat node...");
  };

  return (
    <div className="space-y-8 py-2 text-left animate-fade-in">
      {/* 👑 TOP COMMAND HEADER */}
      <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#FDA4AF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-rose-50 border border-rose-100">
            <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px]">
              Ecosystem Helpdesk
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Support Center & Knowledge Base
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Access system blueprints, open instant crisis tickets, or trace
            volunteer operational workflow.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185] shrink-0 self-start md:self-center">
          <HelpCircle size={24} />
        </div>
      </div>

      {/* 📊 BENTO CHANNELS & EMERGENCY GATEWAYS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Direct Phone Support */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#fb7185] flex items-center justify-center">
              <Phone size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-800">
              Crisis Hotline
            </h3>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
              Immediate telephonic interface for active field deployment blocks.
            </p>
          </div>
          <a
            href="tel:+8801700000000"
            className="text-xs font-black text-[#fb7185] mt-4 block hover:underline tracking-wide"
          >
            +880 1700-000000
          </a>
        </div>

        {/* Email Core Gateway */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
              <Mail size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-800">HQ Audit Desk</h3>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
              Official registry communication channel for database verification
              claims.
            </p>
          </div>
          <a
            href="mailto:support@bighearts.org"
            className="text-xs font-black text-violet-500 mt-4 block hover:underline tracking-wide"
          >
            support@bighearts.org
          </a>
        </div>

        {/* Quick Document Link */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-md transition-all">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-800">
              System Blueprint
            </h3>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed">
              Comprehensive technical docs reviewing architectural schema maps.
            </p>
          </div>
          <span className="text-xs font-black text-emerald-500 mt-4 block cursor-pointer hover:underline tracking-wide">
            Read Docs v1.0.4
          </span>
        </div>
      </div>

      {/* 📈 INTERACTIVE FAQ ACCORDION PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FAQs Accordion Block (8 Columns) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
          <div className="text-left border-b border-slate-50 pb-4 mb-4">
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Frequently Answered Protocols
            </h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">
              Instant solutions for routine operations registry blockages.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className={`w-full flex items-center justify-between p-4 font-bold text-xs text-slate-700 text-left transition-colors ${
                      isOpen
                        ? "bg-slate-50 text-slate-900"
                        : "bg-white hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                          faq.category === "Logistics"
                            ? "bg-violet-50 text-violet-600"
                            : faq.category === "Reporting"
                              ? "bg-rose-50 text-[#fb7185]"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs font-medium leading-relaxed text-slate-500 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Ticket Node (4 Columns) */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden border border-slate-800 min-h-[320px] flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FDA4AF] flex items-center justify-center">
              <MessagesSquare size={20} />
            </div>
            <h3 className="text-lg font-black tracking-tight text-white leading-snug">
              Instant Node Dispatcher
            </h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Can't resolve the issue via blueprints? Open a highly encrypted
              support token routed directly to admin nodes.
            </p>
          </div>

          <button
            onClick={handleSupportTicket}
            className="w-full mt-6 bg-gradient-to-r from-[#FDA4AF] to-[#fb7185] hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 group focus:outline-none"
          >
            Launch Live Chat{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
