import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

interface ReliefEvent {
  id: string;
  title: string;
  start: string;
  extendedProps: {
    location: string;
    volunteerCount: number;
    timeSlot: string;
    status: "Urgent" | "Processing" | "Completed";
    category: string;
  };
  backgroundColor: string;
}

export default function CalendarPage() {
  // ডামি লাইভ ডাটা (তোমার MongoDB/RTK Query এর সাথে সিঙ্ক করে নিও)
  const [events] = useState<ReliefEvent[]>([
    {
      id: "1",
      title: "Dhaka Slum Food Distribution",
      start: "2026-05-20",
      backgroundColor: "#fb7185", // Urgent (Rose)
      extendedProps: {
        location: "Korail Slum, Dhaka",
        volunteerCount: 8,
        timeSlot: "10:00 AM - 02:00 PM",
        status: "Urgent",
        category: "Food Supplies",
      },
    },
    {
      id: "2",
      title: "Medical Camp Stock Arrival",
      start: "2026-05-25",
      backgroundColor: "#8B5CF6", // Processing (Violet)
      extendedProps: {
        location: "Central Warehouse, Dhaka",
        volunteerCount: 4,
        timeSlot: "04:00 PM - 07:00 PM",
        status: "Processing",
        category: "Medicine",
      },
    },
    {
      id: "3",
      title: "Flood Area Winter Clothes Logistics",
      start: "2026-05-15",
      backgroundColor: "#10B981", // Completed (Emerald)
      extendedProps: {
        location: "Kurigram Operations Hub",
        volunteerCount: 15,
        timeSlot: "08:00 AM - 06:00 PM",
        status: "Completed",
        category: "Clothing",
      },
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<ReliefEvent | null>(
    events[0],
  );

  // ক্যালেন্ডারের ইভেন্টে ক্লিক করলে সাইড প্যানেল আপডেট করার ফাংশন
  const handleEventClick = (info: any) => {
    const clickedEvent = events.find((e) => e.id === info.event.id);
    if (clickedEvent) setSelectedEvent(clickedEvent);
  };

  return (
    <div className="space-y-8 py-2 text-left animate-fade-in">
      {/* 👑 TOP BANNER */}
      <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm overflow-hidden flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-rose-50 border border-rose-100">
            <span className="text-[#fb7185] font-black uppercase tracking-[0.2em] text-[9px]">
              Mission Control Timeline
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Logistics & Operations Calendar
          </h2>
          <p className="text-slate-400 text-xs mt-1 font-medium">
            Coordinate emergency dispatches, field deployments, and supply chain
            tracking links.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-2xl text-[#fb7185] self-start sm:self-center">
          <CalendarIcon size={24} />
        </div>
      </div>

      {/* 📊 BENTO DUAL PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 🗺️ Left Side: Gorgeous Glassmorphic Calendar */}
        <div className="lg:col-span-8 bg-white p-4 md:p-6 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.01)] customized-calendar">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "title",
              center: "",
              right: "prev,next today",
            }}
            height="auto"
            fixedWeekCount={false}
          />
        </div>

        {/* 💎 Right Side: Dynamic Mission Information Bento Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden border border-slate-800 min-h-[420px] flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {selectedEvent ? (
              <>
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#FDA4AF] bg-white/10 px-2.5 py-1 rounded-md">
                        {selectedEvent.extendedProps.category}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        selectedEvent.extendedProps.status === "Urgent"
                          ? "bg-rose-500/20 text-rose-400"
                          : selectedEvent.extendedProps.status === "Processing"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {selectedEvent.extendedProps.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-white leading-snug">
                    {selectedEvent.title}
                  </h3>

                  <div className="space-y-3.5 pt-2 text-slate-300 font-medium text-xs">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-rose-400 shrink-0" />
                      <span className="truncate">
                        {selectedEvent.extendedProps.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-violet-400 shrink-0" />
                      <span>
                        {selectedEvent.extendedProps.timeSlot} (
                        {selectedEvent.start})
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-emerald-400 shrink-0" />
                      <span>
                        {selectedEvent.extendedProps.volunteerCount} Responders
                        Registered
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-[#FDA4AF] to-[#fb7185] hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 group">
                  Mission Details Control{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
                <p className="text-xs font-bold">
                  No Operational Mission Selected.
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Click any active colored slot on the timeline grid to populate
                  secure logs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔮 CUSTOM CSS FOR PREMIUM FULLCALENDAR INNER OVERRIDES */}
      <style>{`
        .customized-calendar .fc { --fc-border-color: #f1f5f9; font-family: inherit; }
        .customized-calendar .fc-header-toolbar { margin-bottom: 1.5rem !important; }
        .customized-calendar .fc-toolbar-title { font-size: 1rem !important; font-weight: 900; color: #1e293b; text-transform: uppercase; letter-spacing: -0.02em; }
        .customized-calendar .fc-button { background: #f8fafc !important; border: 1px solid #f1f5f9 !important; color: #64748b !important; font-weight: 700 !important; font-size: 11px !important; text-transform: uppercase !important; border-radius: 0.75rem !important; padding: 0.5rem 0.75rem !important; box-shadow: none !important; transition: all 0.2s; }
        .customized-calendar .fc-button:hover { background: #f1f5f9 !important; color: #0f172a !important; }
        .customized-calendar .fc-button-active { background: #0f172a !important; color: white !important; border-color: #0f172a !important; }
        .customized-calendar .fc-daygrid-day-number { font-size: 11px; font-weight: 800; color: #64748b; padding: 6px !important; }
        .customized-calendar .fc-day-today { background: #fff1f2/40 !important; }
        .customized-calendar .fc-event { border: none !important; padding: 3px 6px !important; border-radius: 6px !important; cursor: pointer; transition: transform 0.2s; }
        .customized-calendar .fc-event:hover { transform: scale(1.02); }
        .customized-calendar .fc-event-title { font-size: 10px !important; font-weight: 700 !important; color: white !important; }
      `}</style>
    </div>
  );
}
