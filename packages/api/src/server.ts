/**
 * The Amraqiyyah Oracle API.
 *   GET  /oracle-inputs?lat=&lon=&tz=[&t=ISO]   → Calendar §14 JSON
 *   POST /reading                               → complete six-coordinate reading
 *   GET  /health
 */
import { createServer } from 'node:http';
import { URL } from 'node:url';
import {
  oracleInputs,
  performReading,
  type GeoLocation,
  type ReadingRequest,
} from '@amraqiyyah/engine';

const PORT = Number(process.env.PORT ?? 4770);

function parseLocation(url: URL): GeoLocation {
  const lat = Number(url.searchParams.get('lat') ?? 41.885);
  const lon = Number(url.searchParams.get('lon') ?? -87.627);
  const tz = url.searchParams.get('tz') ?? 'America/Chicago';
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error('lat and lon must be numbers');
  }
  return { lat, lon, tz };
}

function json(res: import('node:http').ServerResponse, code: number, body: unknown): void {
  const payload = JSON.stringify(body, null, 2);
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
  });
  res.end(payload);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);

    if (req.method === 'OPTIONS') {
      json(res, 204, {});
      return;
    }

    if (req.method === 'GET' && url.pathname === '/health') {
      json(res, 200, { ok: true, service: 'amraqiyyah-oracle' });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/oracle-inputs') {
      const loc = parseLocation(url);
      const t = url.searchParams.get('t');
      const date = t ? new Date(t) : new Date();
      if (Number.isNaN(date.getTime())) throw new Error('invalid timestamp t');
      json(res, 200, oracleInputs(date, loc));
      return;
    }

    if (req.method === 'POST' && url.pathname === '/reading') {
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
        mode: 'A' | 'B' | 'C';
        timestamp?: string;
        location?: GeoLocation;
        veil?: number;
        question?: string;
        questionArabic?: string;
        querentNameArabic?: string;
        draws?: ReadingRequest['draws'];
      };
      const request: ReadingRequest = {
        mode: body.mode,
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
        location: body.location ?? { lat: 41.885, lon: -87.627, tz: 'America/Chicago' },
        veil: (body.veil ?? 5) as ReadingRequest['veil'],
        question: body.question,
        questionArabic: body.questionArabic,
        querentNameArabic: body.querentNameArabic,
        draws: body.draws,
      };
      json(res, 200, performReading(request));
      return;
    }

    json(res, 404, { error: 'not found' });
  } catch (err) {
    json(res, 400, { error: err instanceof Error ? err.message : String(err) });
  }
});

server.listen(PORT, () => {
  console.log(`Amraqiyyah Oracle API listening on http://localhost:${PORT}`);
  console.log(`  GET  /oracle-inputs?lat=41.885&lon=-87.627&tz=America/Chicago`);
  console.log(`  POST /reading`);
});
