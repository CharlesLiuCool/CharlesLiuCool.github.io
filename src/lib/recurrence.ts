/* ─────────────────────────────────────────────────────────────
   RECURRENCE ENGINE
   A tiny, dependency-free subset of the iCalendar (RFC 5545)
   recurrence model. Define a repeating event ONCE and expand it
   into concrete occurrences on demand.

   Supported: daily / weekly / monthly frequencies, an interval
   (every N periods), specific weekdays (weekly), an end via
   `until` or `count`, and per-date `except` skips (holidays, etc).

   All dates are handled as timezone-agnostic wall-clock values
   using UTC-midnight arithmetic, so day math never drifts across
   the viewer's timezone.
───────────────────────────────────────────────────────────── */

export type Weekday = 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

/** Monday-first ordering — matches offset from the start of an ISO week. */
const WD_ORDER: Weekday[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const wdIndex = (w: Weekday) => WD_ORDER.indexOf(w);

export interface Recurrence {
  /** How often the event repeats. */
  freq: 'daily' | 'weekly' | 'monthly';
  /** Repeat every N periods (default 1). e.g. interval 2 + weekly = biweekly. */
  interval?: number;
  /** Weekly only: which weekdays. Omit to repeat on the start day's weekday. */
  byWeekday?: Weekday[];
  /** Last date (inclusive), 'YYYY-MM-DD'. Prefer this over `count` for classes. */
  until?: string;
  /** Alternatively, stop after this many occurrences (exceptions count toward it, per RFC 5545). */
  count?: number;
  /** Dates to skip, 'YYYY-MM-DD' — holidays, cancellations, breaks. */
  except?: string[];
}

export interface ScheduleEvent {
  /** Stable unique id (kebab-case). Used to build occurrence + iCal UIDs. */
  id: string;
  title: string;
  /** Category key — see CATEGORIES in src/data/schedule.ts. */
  category?: string;
  /**
   * Start of the event.
   *  - Timed:   'YYYY-MM-DDTHH:mm'  (e.g. '2026-08-24T09:10')
   *  - All-day: 'YYYY-MM-DD'
   */
  start: string;
  /** End time 'HH:mm' for a timed event (same day). Omit for open-ended. */
  end?: string;
  /** For a multi-day all-day span (e.g. a trip), the last day 'YYYY-MM-DD'. */
  endDate?: string;
  /** Force all-day. Inferred true when `start` has no time component. */
  allDay?: boolean;
  location?: string;
  /** Primary link — surfaced as an "Open link →" button in the detail popover. */
  url?: string;
  /**
   * Free-form details shown in the detail popover: notes, agenda,
   * links (any http(s) URL becomes clickable), etc. Line breaks are kept.
   */
  description?: string;
  /** @deprecated alias for `description`, kept for older entries. */
  notes?: string;
  /** Omit for a one-off event. */
  recurrence?: Recurrence;
}

/** A single concrete instance of an event on a specific day. */
export interface Occurrence {
  /** Unique per instance: `${eventId}@${date}`. */
  id: string;
  eventId: string;
  title: string;
  category?: string;
  /** 'YYYY-MM-DD' — the day this instance starts. */
  date: string;
  /** 'YYYY-MM-DD' — last day (equals `date` unless a multi-day span). */
  endDate: string;
  allDay: boolean;
  /** Minutes from midnight, or null when all-day. */
  startMin: number | null;
  endMin: number | null;
  location?: string;
  url?: string;
  description?: string;
}

/* ── Date helpers (UTC-midnight to avoid TZ drift) ──────────── */

function parseISODate(s: string): Date {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
function fmtDate(dt: Date): string {
  return dt.toISOString().slice(0, 10);
}
function addDays(dt: Date, n: number): Date {
  return new Date(dt.getTime() + n * 86400000);
}
function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}
/** Offset (0=Mon … 6=Sun) of a date within its ISO week. */
function mondayIndex(dt: Date): number {
  return (dt.getUTCDay() + 6) % 7;
}
/** Minutes-from-midnight for an 'HH:mm' string, or null. */
function hmToMin(hm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})/.exec(hm.trim());
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

const SAFETY = 20000; // hard cap on generated candidates, guards against runaway loops

/**
 * Ordered occurrence dates for one event that fall within
 * [rangeStart, rangeEnd] (both inclusive). Count/until are evaluated
 * over the full chronological sequence, not just the visible window.
 */
function occurrenceDates(ev: ScheduleEvent, rangeStart: Date, rangeEnd: Date): Date[] {
  const base = parseISODate(ev.start);
  const out: Date[] = [];

  if (!ev.recurrence) {
    if (base >= rangeStart && base <= rangeEnd) out.push(base);
    return out;
  }

  const rec = ev.recurrence;
  const interval = Math.max(1, rec.interval ?? 1);
  const until = rec.until ? parseISODate(rec.until) : null;
  const except = new Set(rec.except ?? []);
  const maxCount = rec.count ?? Infinity;
  let emitted = 0;

  // Records one candidate. Returns false when generation should stop.
  const consume = (dt: Date): boolean => {
    if (dt > rangeEnd) return false;           // past the window (chronological → done)
    if (until && dt > until) return false;
    if (emitted >= maxCount) return false;
    emitted++;
    if (!except.has(fmtDate(dt)) && dt >= rangeStart) out.push(dt);
    return true;
  };

  if (rec.freq === 'daily') {
    for (let k = 0; k <= SAFETY; k++) {
      if (!consume(addDays(base, k * interval))) break;
    }
  } else if (rec.freq === 'weekly') {
    const days = rec.byWeekday && rec.byWeekday.length
      ? [...rec.byWeekday].sort((a, b) => wdIndex(a) - wdIndex(b))
      : [WD_ORDER[mondayIndex(base)]];
    const baseWeekStart = addDays(base, -mondayIndex(base));
    let stop = false;
    for (let b = 0; !stop && b <= SAFETY; b++) {
      const weekStart = addDays(baseWeekStart, b * interval * 7);
      for (const wd of days) {
        const dt = addDays(weekStart, wdIndex(wd));
        if (dt < base) continue;               // days before the start don't count
        if (!consume(dt)) { stop = true; break; }
      }
    }
  } else { // monthly — same day-of-month, skipping months without that day
    const y = base.getUTCFullYear();
    const m = base.getUTCMonth();
    const day = base.getUTCDate();
    for (let k = 0; k <= SAFETY; k++) {
      const total = m + k * interval;
      const ny = y + Math.floor(total / 12);
      const nm = ((total % 12) + 12) % 12;
      const dim = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
      if (day > dim) {                          // e.g. no 31st this month → skip
        if (new Date(Date.UTC(ny, nm, 1)) > rangeEnd) break;
        continue;
      }
      if (!consume(new Date(Date.UTC(ny, nm, day)))) break;
    }
  }

  return out;
}

/**
 * Expand a list of events into concrete occurrences within the
 * inclusive date range [rangeStartISO, rangeEndISO], sorted by
 * start (all-day first within a day).
 */
export function expandRange(
  events: ScheduleEvent[],
  rangeStartISO: string,
  rangeEndISO: string,
): Occurrence[] {
  const rangeStart = parseISODate(rangeStartISO);
  const rangeEnd = parseISODate(rangeEndISO);
  const out: Occurrence[] = [];

  for (const ev of events) {
    const allDay = ev.allDay ?? !ev.start.includes('T');
    const startMin = allDay ? null : hmToMin(ev.start.split('T')[1] ?? '');
    // `end` accepts 'HH:mm' or a full 'YYYY-MM-DDTHH:mm' — take the time part either way.
    const endRaw = ev.end ? (ev.end.includes('T') ? ev.end.split('T')[1] : ev.end) : null;
    const endMin = allDay || !endRaw ? null : hmToMin(endRaw);
    const span = ev.endDate
      ? Math.max(0, daysBetween(parseISODate(ev.start), parseISODate(ev.endDate)))
      : 0;

    for (const d of occurrenceDates(ev, rangeStart, rangeEnd)) {
      const date = fmtDate(d);
      out.push({
        id: `${ev.id}@${date}`,
        eventId: ev.id,
        title: ev.title,
        category: ev.category,
        date,
        endDate: span > 0 ? fmtDate(addDays(d, span)) : date,
        allDay,
        startMin,
        endMin,
        location: ev.location,
        url: ev.url,
        description: ev.description ?? ev.notes,
      });
    }
  }

  out.sort((a, b) =>
    a.date < b.date ? -1
    : a.date > b.date ? 1
    : a.allDay !== b.allDay ? (a.allDay ? -1 : 1)
    : (a.startMin ?? 0) - (b.startMin ?? 0),
  );
  return out;
}
