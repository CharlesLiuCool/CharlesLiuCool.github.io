/* ─────────────────────────────────────────────────────────────
   iCalendar (RFC 5545) SERIALIZER
   Turns the schedule into a .ics feed that people can import or
   subscribe to in Google / Apple / Outlook Calendar. Recurring
   events emit a native RRULE (+ EXDATE) so one VEVENT stands in
   for the whole series — no occurrence expansion needed here.

   Times are emitted as "floating" local wall-clock (no timezone),
   which is the right model for a single-location personal schedule
   and keeps the feed free of bulky VTIMEZONE blocks.
───────────────────────────────────────────────────────────── */

import type { ScheduleEvent, Recurrence } from './recurrence';

const DOMAIN = 'charlesliucool.github.io';

/** Escape TEXT values per RFC 5545 §3.3.11. */
function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/[;,]/g, (m) => '\\' + m).replace(/\r?\n/g, '\\n');
}

/** Fold long content lines to ≤75 octets with a leading space on continuations. */
function fold(line: string): string {
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, 75));
  rest = rest.slice(75);
  while (rest.length > 74) {
    parts.push(' ' + rest.slice(0, 74));
    rest = rest.slice(74);
  }
  if (rest.length) parts.push(' ' + rest);
  return parts.join('\r\n');
}

/** Date part → 'YYYYMMDD', tolerating non-zero-padded months/days. */
function yyyymmdd(iso: string): string {
  const [y, m = '1', d = '1'] = iso.slice(0, 10).split('-');
  return `${y}${m.padStart(2, '0')}${d.padStart(2, '0')}`;
}

/** 'YYYY-MM-DDTHH:mm' → 'YYYYMMDDTHHmmss' (floating local), padding tolerant. */
function dateTime(iso: string): string {
  const [datePart, timePart = ''] = iso.split('T');
  const [h = '0', mi = '0'] = timePart.split(':');
  return `${yyyymmdd(datePart)}T${h.padStart(2, '0')}${mi.slice(0, 2).padStart(2, '0')}00`;
}

/** DTEND for all-day events is exclusive → the day after `iso`. */
function nextDay(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10).replace(/-/g, '');
}

function rrule(rec: Recurrence): string {
  const parts = [`FREQ=${rec.freq.toUpperCase()}`];
  if (rec.interval && rec.interval > 1) parts.push(`INTERVAL=${rec.interval}`);
  if (rec.byWeekday && rec.byWeekday.length) parts.push(`BYDAY=${rec.byWeekday.join(',')}`);
  if (rec.count != null) parts.push(`COUNT=${rec.count}`);
  else if (rec.until) parts.push(`UNTIL=${yyyymmdd(rec.until)}T235959Z`);
  return parts.join(';');
}

function vevent(ev: ScheduleEvent, dtstamp: string): string[] {
  const allDay = ev.allDay ?? ev.start.length <= 10;
  const lines: string[] = ['BEGIN:VEVENT', `UID:${ev.id}@${DOMAIN}`, `DTSTAMP:${dtstamp}`];

  if (allDay) {
    const endExclusive = ev.endDate ? nextDay(ev.endDate) : nextDay(ev.start);
    lines.push(`DTSTART;VALUE=DATE:${yyyymmdd(ev.start)}`);
    lines.push(`DTEND;VALUE=DATE:${endExclusive}`);
  } else {
    const day = ev.start.slice(0, 10);
    lines.push(`DTSTART:${dateTime(ev.start)}`);
    if (ev.end) {
      // `end` may be 'HH:mm' or a full 'YYYY-MM-DDTHH:mm' — use only its time part.
      const endTime = ev.end.includes('T') ? ev.end.split('T')[1] : ev.end;
      lines.push(`DTEND:${dateTime(`${day}T${endTime}`)}`);
    }
  }

  if (ev.recurrence) {
    lines.push(`RRULE:${rrule(ev.recurrence)}`);
    const ex = ev.recurrence.except ?? [];
    if (ex.length) {
      lines.push(
        allDay
          ? `EXDATE;VALUE=DATE:${ex.map(yyyymmdd).join(',')}`
          : `EXDATE:${ex.map((d) => dateTime(`${d}T${ev.start.slice(11, 16)}`)).join(',')}`,
      );
    }
  }

  lines.push(`SUMMARY:${esc(ev.title)}`);
  if (ev.location) lines.push(`LOCATION:${esc(ev.location)}`);
  if (ev.url) lines.push(`URL:${ev.url}`);
  const desc = ev.description ?? ev.notes;
  if (desc) lines.push(`DESCRIPTION:${esc(desc)}`);
  lines.push('END:VEVENT');
  return lines;
}

export function buildICS(
  events: ScheduleEvent[],
  meta: { name: string; description?: string },
): string {
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${DOMAIN}//schedule//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${esc(meta.name)}`,
  ];
  if (meta.description) lines.push(`X-WR-CALDESC:${esc(meta.description)}`);
  for (const ev of events) lines.push(...vevent(ev, dtstamp));
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
