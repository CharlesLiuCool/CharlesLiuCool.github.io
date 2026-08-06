/* ─────────────────────────────────────────────────────────────
   MY SCHEDULE  ·  single source of truth
   ═════════════════════════════════════════════════════════════
   Edit this file to manage your calendar, then commit + push —
   GitHub Pages rebuilds and both the /calendar page and the
   /calendar.ics feed update automatically.

   ── Add a one-off event ──────────────────────────────────────
     { id: 'coffee-chat', title: 'Coffee with advisor',
       category: 'meeting',
       start: '2026-08-14T15:00', end: '16:00',
       location: 'Sloan Hall' }

   ── Add a recurring event (define ONCE) ──────────────────────
     Classes, weekly meetings, gym — set `recurrence` and it
     repeats itself. No copy-pasting a hundred rows.

     recurrence: {
       freq:      'weekly',            // 'daily' | 'weekly' | 'monthly'
       interval:  1,                   // every N periods (2 = biweekly)
       byWeekday: ['MO','WE','FR'],    // weekly only; codes MO TU WE TH FR SA SU
       until:     '2026-12-11',        // last day (inclusive) — best for a term
       // count:  12,                  // …or stop after N occurrences
       except:    ['2026-11-25'],      // skip these dates (holidays, cancellations)
     }

   ── Field reference ──────────────────────────────────────────
     start       'YYYY-MM-DDTHH:mm' (timed)  or  'YYYY-MM-DD' (all-day)
     end         'HH:mm'  — same-day end time for timed events
     endDate     'YYYY-MM-DD'  — last day of a multi-day all-day span
     allDay      true — force all-day (inferred when start has no time)
     location    'Sloan Hall 165'
     url         primary link — an "Open link →" button in the popover
     description free-form notes shown on click; any http(s) URL in it
                 becomes clickable, and line breaks are preserved
     For a repeating event, `start` is the FIRST occurrence; the
     time-of-day there applies to every occurrence.

   ── Example with a description + links ───────────────────────
     { id: 'office-hours', title: 'Office hours',
       category: 'class', start: '2026-08-26T14:00', end: '15:00',
       location: 'Sloan 3rd floor',
       url: 'https://zoom.us/j/123456789',
       description: 'Bring questions on problem set 2.\nNotes: https://example.com/notes',
       recurrence: { freq: 'weekly', byWeekday: ['WE'], until: '2026-12-11' } }

   The examples below are placeholders — replace them with yours.
───────────────────────────────────────────────────────────── */

import type { ScheduleEvent } from '../lib/recurrence';

/* ── Categories: label + color for each kind of event ─────────
   `color` is any CSS color; the site's theme hues are exposed as
   CSS variables and read well in both light and dark modes.      */
export interface Category {
  label: string;
  color: string;
}

export const CATEGORIES: Record<string, Category> = {
  class:    { label: 'Classes',  color: 'var(--accent)' },
  research: { label: 'Research', color: 'var(--hue-info)' },
  work:     { label: 'Work',     color: 'color-mix(in srgb, var(--hue-info) 45%, var(--hue-positive))' },
  meeting:  { label: 'Meetings', color: 'var(--hue-caution)' },
  personal: { label: 'Personal', color: 'var(--hue-positive)' },
  deadline: { label: 'Deadlines', color: 'var(--hue-negative)' },
};

export const DEFAULT_CATEGORY = 'personal';

/* ── Feed metadata (used by /calendar.ics) ──────────────────── */
export const CALENDAR = {
  name: 'Charles Liu',
  description: 'Public schedule — classes, research, office hours.',
} as const;

/* ── Your events ─────────────────────────────────────────────
   Replace everything below with your real schedule.            */
export const SCHEDULE: ScheduleEvent[] = [
  // ── Fall 2026 courses (Aug 24 – Dec 11), skipping Thanksgiving week ──
  // {
  //   id: 'crypto-lecture',
  //   title: 'Advanced Cryptography',
  //   category: 'class',
  //   start: '2026-08-24T09:10',
  //   end: '10:25',
  //   location: 'Sloan Hall 165',
  //   recurrence: {
  //     freq: 'weekly',
  //     byWeekday: ['MO', 'WE', 'FR'],
  //     until: '2026-12-11',
  //     except: ['2026-11-23', '2026-11-25', '2026-11-27'], // Thanksgiving break
  //   },
  // },
  // {
  //   id: 'complexity-theory',
  //   title: 'Computational Complexity',
  //   category: 'class',
  //   start: '2026-08-25T13:05',
  //   end: '14:20',
  //   location: 'Spark 235',
  //   recurrence: {
  //     freq: 'weekly',
  //     byWeekday: ['TU', 'TH'],
  //     until: '2026-12-11',
  //     except: ['2026-11-24', '2026-11-26'],
  //   },
  // },

  // // ── Recurring meetings ──
  // {
  //   id: 'research-group',
  //   title: 'Crypto Research Group',
  //   category: 'research',
  //   start: '2026-08-28T15:00',
  //   end: '16:30',
  //   location: 'EME 202',
  //   notes: 'Weekly reading group — bring one question.',
  //   recurrence: { freq: 'weekly', byWeekday: ['FR'], until: '2026-12-11' },
  // },
  // {
  //   id: 'advisor-1on1',
  //   title: '1:1 with advisor',
  //   category: 'meeting',
  //   start: '2026-09-01T11:00',
  //   end: '11:30',
  //   recurrence: { freq: 'weekly', interval: 2, byWeekday: ['TU'], until: '2026-12-08' }, // biweekly
  // },

  // Work
  {
    id: 'sel-work',
    title: 'Work',
    category: 'work',
    description: 'Schweitzer Engineering Laboratories Software Engineering Internship',
    start: '2026-08-01T10:00',
    end: '17:00',
    recurrence: { freq: 'weekly', interval: 1, byWeekday: ['MO', 'TU', 'WE', 'TH', 'FR'], until: '2026-8-15' },
  },

  // ── One-off items ──
  {
    id: 'sel-intern-volleyball',
    title: 'Volleyball',
    category: 'personal',
    start: '2026-08-04T18:30',
    end: '20:30',
    location: 'Student Recreation Center - WSU',
  },
  {
    id: 'advisor-meeting',
    title: 'Advisor Meeting with Jarek Shernit',
    category: 'meeting',
    description: 'Discuss enrolling in capstone CPT_S 421 class, and overall academic trajectory. \nZoom Link: https://wsu.zoom.us/j/2648885714?pwd=NW1qdGoySmxpNFJ1TVdSTHZkYmNYZz09 \nMeeting ID: 264 888 5714 \nPasscode: EM306',
    start: '2026-08-05T12:00',
    end: '2026-08-05T12:30',
  },
  // {
  //   id: 'conference-trip',
  //   title: 'Traveling — TCC 2026',
  //   category: 'research',
  //   start: '2026-11-16',
  //   endDate: '2026-11-19',
  //   allDay: true,
  //   location: 'Out of town',
  // },
];
