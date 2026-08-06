/* Static iCal feed at /calendar.ics — import or subscribe in any
   calendar app. Regenerated on every build. */
import type { APIRoute } from 'astro';
import { SCHEDULE, CALENDAR } from '../data/schedule';
import { buildICS } from '../lib/ics';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = buildICS(SCHEDULE, CALENDAR);
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="charles-liu.ics"',
    },
  });
};
