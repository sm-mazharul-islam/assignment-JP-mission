import { useMemo, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

import type { EventClickArg } from "@fullcalendar/core";

import {
  Thermometer,
  CloudRain,
  Wind,
  AlertTriangle,
  ShieldCheck,
  Bot,
} from "lucide-react";

import { useGetClimateAlertsQuery } from "../../../../redux/api/api";

// ======================================================
// TYPES
// ======================================================

type HazardLevel = "CRITICAL" | "WARNING" | "SAFE";

interface IClimateMetrics {
  temp?: number | string;
  rain?: number | string;
}

interface IClimateAlert {
  hazardLevel: HazardLevel;
  reasons: string[];
  metrics?: IClimateMetrics;
}

interface IApiAlert {
  hazardLevel?: string;
  reasons?: unknown;
  metrics?: {
    temp?: number | string;
    rain?: number | string;
  };
}

interface IClimateApiResponse {
  alerts?: Record<string, IApiAlert>;
}

interface TAiReliefEvent {
  id: string;
  title: string;
  start: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;

  extendedProps: {
    location: string;
    volunteerCount: number;
    timeSlot: string;
    status: "Urgent" | "Processing" | "Completed";
    category: string;
    hazardLevel: HazardLevel;
    reasons: string[];
    metrics?: IClimateMetrics;
    aiGenerated: boolean;
  };
}

// ======================================================
// COMPONENT
// ======================================================

export default function CalendarPage() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(today);

  const [activeEvent, setActiveEvent] = useState<TAiReliefEvent | null>(null);

  // ======================================================
  // API
  // ======================================================

  const { data } = useGetClimateAlertsQuery() as {
    data?: IClimateApiResponse;
  };

  // ======================================================
  // SAFE AI ALERT MAP
  // ======================================================

  const alertMap = useMemo<Record<string, IClimateAlert>>(() => {
    if (!data?.alerts) return {};

    const safeAlerts: Record<string, IClimateAlert> = {};

    Object.entries(data.alerts).forEach(([date, alert]) => {
      const level: HazardLevel =
        alert.hazardLevel === "CRITICAL"
          ? "CRITICAL"
          : alert.hazardLevel === "WARNING"
            ? "WARNING"
            : "SAFE";

      safeAlerts[date] = {
        hazardLevel: level,

        reasons: Array.isArray(alert.reasons)
          ? alert.reasons.filter(
              (reason): reason is string => typeof reason === "string",
            )
          : [],

        metrics: {
          temp: alert.metrics?.temp ?? "N/A",

          rain: alert.metrics?.rain ?? 0,
        },
      };
    });

    return safeAlerts;
  }, [data]);

  // ======================================================
  // AI GENERATED EVENTS
  // ======================================================

  const aiEvents = useMemo<TAiReliefEvent[]>(() => {
    return Object.entries(alertMap).map(([dateKey, alert], index) => {
      const isCritical = alert.hazardLevel === "CRITICAL";

      const isWarning = alert.hazardLevel === "WARNING";

      return {
        id: `ai-event-${index}`,

        title: isCritical
          ? "🚨 AI Critical"
          : isWarning
            ? "⚠ AI Warning"
            : "🟢 AI Safe",

        start: dateKey,

        backgroundColor: isCritical
          ? "#ef4444"
          : isWarning
            ? "#f59e0b"
            : "#10b981",

        borderColor: isCritical ? "#dc2626" : isWarning ? "#d97706" : "#059669",

        textColor: "#ffffff",

        extendedProps: {
          location: "AI Climate Node",

          volunteerCount: isCritical ? 25 : isWarning ? 10 : 0,

          timeSlot: "AI Monitoring",

          status: isCritical
            ? "Urgent"
            : isWarning
              ? "Processing"
              : "Completed",

          category: "AI Climate Analysis",

          hazardLevel: alert.hazardLevel,

          reasons: alert.reasons,

          metrics: alert.metrics,

          aiGenerated: true,
        },
      };
    });
  }, [alertMap]);

  // ======================================================
  // EVENT CLICK
  // ======================================================

  const handleEventClick = (info: EventClickArg) => {
    const foundEvent =
      aiEvents.find((event) => event.id === info.event.id) ?? null;

    setActiveEvent(foundEvent);

    if (foundEvent) {
      setSelectedDate(foundEvent.start);
    }
  };

  // ======================================================
  // DATE CLICK
  // ======================================================

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);

    const matchedEvent =
      aiEvents.find((event) => event.start === info.dateStr) ?? null;

    setActiveEvent(matchedEvent);
  };

  // ======================================================
  // CUSTOM DAY CELL
  // ======================================================

  const renderDayCell = (arg: { date: Date; dayNumberText: string }) => {
    const dateKey = arg.date.toISOString().split("T")[0];

    const alert = alertMap[dateKey];

    return (
      <div className="flex h-full min-h-[90px] flex-col gap-1 p-1">
        <span className="text-[11px] font-black text-slate-700">
          {arg.dayNumberText}
        </span>

        {alert && (
          <div
            className={`
              rounded-xl px-2 py-1
              text-[8px] font-black uppercase text-white shadow-sm

              ${
                alert.hazardLevel === "CRITICAL"
                  ? "bg-rose-500"
                  : alert.hazardLevel === "WARNING"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }
            `}
          >
            {alert.hazardLevel}
          </div>
        )}

        {alert?.reasons?.[0] && (
          <div className="line-clamp-2 text-[8px] font-medium text-slate-500">
            {alert.reasons[0]}
          </div>
        )}
      </div>
    );
  };

  // ======================================================
  // CURRENT ALERT
  // ======================================================

  const currentAlert = alertMap[selectedDate];

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <Bot size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-800">
                AI Climate Calendar
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                AI generated climate alerts & disaster prediction system
              </p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* CALENDAR */}
          <div className="rounded-[2rem] border border-white/40 bg-white/80 p-4 shadow-xl backdrop-blur lg:col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={aiEvents}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              dayCellContent={renderDayCell}
              height="auto"
            />
          </div>

          {/* SIDE PANEL */}
          <div className="rounded-[2rem] border border-white/40 bg-white/80 p-6 shadow-xl backdrop-blur lg:col-span-4">
            {/* TOP */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Selected Date
                </p>

                <h2 className="text-lg font-black text-slate-800">
                  {selectedDate}
                </h2>
              </div>

              {currentAlert?.hazardLevel === "CRITICAL" ? (
                <AlertTriangle size={28} className="text-rose-500" />
              ) : (
                <ShieldCheck size={28} className="text-emerald-500" />
              )}
            </div>

            {/* STATUS */}
            <div
              className={`
                mb-6 rounded-2xl p-5 text-white shadow-lg

                ${
                  currentAlert?.hazardLevel === "CRITICAL"
                    ? "bg-gradient-to-r from-rose-500 to-red-600"
                    : currentAlert?.hazardLevel === "WARNING"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500"
                      : "bg-gradient-to-r from-emerald-500 to-green-600"
                }
              `}
            >
              <p className="text-xs uppercase opacity-80">AI Hazard Status</p>

              <h3 className="mt-1 text-2xl font-black">
                {currentAlert?.hazardLevel ?? "SAFE"}
              </h3>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-3">
              {/* TEMP */}
              <div className="rounded-2xl bg-slate-50 p-4 text-center shadow-sm">
                <Thermometer
                  size={18}
                  className="mx-auto mb-2 text-orange-500"
                />

                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Temp
                </p>

                <p className="mt-1 text-lg font-black text-slate-800">
                  {currentAlert?.metrics?.temp ?? "N/A"}
                </p>
              </div>

              {/* RAIN */}
              <div className="rounded-2xl bg-slate-50 p-4 text-center shadow-sm">
                <CloudRain size={18} className="mx-auto mb-2 text-blue-500" />

                <p className="text-[10px] font-bold uppercase text-slate-400">
                  Rain
                </p>

                <p className="mt-1 text-lg font-black text-slate-800">
                  {currentAlert?.metrics?.rain ?? 0}
                  mm
                </p>
              </div>

              {/* AQI */}
              <div className="rounded-2xl bg-slate-50 p-4 text-center shadow-sm">
                <Wind size={18} className="mx-auto mb-2 text-emerald-500" />

                <p className="text-[10px] font-bold uppercase text-slate-400">
                  AQI
                </p>

                <p className="mt-1 text-lg font-black text-slate-800">Good</p>
              </div>
            </div>

            {/* REASONS */}
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-black text-slate-700">
                AI Analysis Reasons
              </h4>

              <div className="space-y-2">
                {currentAlert?.reasons?.length ? (
                  currentAlert.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600"
                    >
                      {reason}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
                    No AI alerts for this date
                  </div>
                )}
              </div>
            </div>

            {/* ACTIVE EVENT */}
            {activeEvent && (
              <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white shadow-xl">
                <div className="mb-3 flex items-center gap-2">
                  <Bot size={18} className="text-cyan-400" />

                  <p className="text-xs uppercase tracking-wider text-slate-400">
                    AI Generated Event
                  </p>
                </div>

                <h3 className="text-lg font-black">{activeEvent.title}</h3>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Location</p>

                    <p className="font-semibold">
                      {activeEvent.extendedProps.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-400">Volunteers</p>

                    <p className="font-semibold">
                      {activeEvent.extendedProps.volunteerCount}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULLCALENDAR STYLE */}
      <style>
        {`
          .fc {
            font-family: inherit;
          }

          .fc-toolbar-title {
            font-size: 1.25rem !important;
            font-weight: 900 !important;
            color: #0f172a;
          }

          .fc-button {
            background: #0f172a !important;
            border: none !important;
            border-radius: 14px !important;
            padding: 8px 14px !important;
            font-weight: 700 !important;
          }

          .fc-button:hover {
            opacity: 0.92;
          }

          .fc-daygrid-event {
            border: none !important;
            border-radius: 12px !important;
            padding: 2px 6px !important;
            font-size: 10px !important;
            font-weight: 800 !important;
          }

          .fc-daygrid-day {
            transition: 0.2s ease;
          }

          .fc-daygrid-day:hover {
            background: rgba(
              59,
              130,
              246,
              0.05
            );
          }

          .fc-scrollgrid,
          .fc-theme-standard td,
          .fc-theme-standard th {
            border-color: #e2e8f0 !important;
          }

          .fc-daygrid-day-number {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
}
