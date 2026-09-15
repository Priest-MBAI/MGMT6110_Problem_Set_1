import 'dotenv/config';

function sendJson(res, statusCode, data) {
  if (typeof res.status === 'function') {
    res.status(statusCode);
  } else {
    res.statusCode = statusCode;
  }
  if (typeof res.json === 'function') {
    res.json(data);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  }
}

function parseMinutes(estimatedArrivalStr, nowMs) {
  if (!estimatedArrivalStr || typeof estimatedArrivalStr !== 'string' || estimatedArrivalStr.trim() === '') {
    return null;
  }
  const arrivalTime = new Date(estimatedArrivalStr).getTime();
  if (isNaN(arrivalTime)) {
    return null;
  }
  const diffMs = arrivalTime - nowMs;
  const minutes = Math.round(diffMs / 60000);
  return minutes < 0 ? 0 : minutes;
}

function getArrivalTimestamp(service) {
  const est = service?.NextBus?.EstimatedArrival;
  if (est && typeof est === 'string' && est.trim() !== '') {
    const t = new Date(est).getTime();
    if (!isNaN(t)) return t;
  }
  return Infinity;
}

export default async function handler(req, res) {
  const accountKey = process.env.LTA_ACCOUNT_KEY;

  // BEFORE the fetch, if LTA_ACCOUNT_KEY is missing or empty, return 503
  if (!accountKey || typeof accountKey !== 'string' || accountKey.trim() === '') {
    res.setHeader('Cache-Control', 'no-store');
    return sendJson(res, 503, {
      error: 'LTA_ACCOUNT_KEY environment variable is missing or empty'
    });
  }

  let response;
  try {
    response = await fetch(
      'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04151',
      {
        headers: {
          AccountKey: accountKey.trim()
        }
      }
    );
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    return sendJson(res, 502, {
      error: 'Failed to connect to LTA upstream service',
      upstreamStatus: 502
    });
  }

  // AFTER the fetch, check response.ok before reading body
  if (!response.ok) {
    res.setHeader('Cache-Control', 'no-store');
    return sendJson(res, response.status, {
      upstreamStatus: response.status,
      error: `LTA upstream service responded with status ${response.status}`
    });
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    return sendJson(res, 502, {
      upstreamStatus: response.status,
      error: 'Failed to parse JSON response from LTA upstream service'
    });
  }

  const rawServices = Array.isArray(data?.Services) ? data.Services : [];
  const nowMs = Date.now();

  // Sort services by EstimatedArrival ascending before returning them
  const sorted = [...rawServices].sort((a, b) => {
    const timeA = getArrivalTimestamp(a);
    const timeB = getArrivalTimestamp(b);
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    return String(a?.ServiceNo || '').localeCompare(String(b?.ServiceNo || ''), undefined, { numeric: true });
  });

  // Returns ONLY: service number, minutes until the next bus, and minutes until the one after. Nothing else.
  const result = sorted.map(service => ({
    serviceNumber: String(service?.ServiceNo || ''),
    nextBusMinutes: parseMinutes(service?.NextBus?.EstimatedArrival, nowMs),
    followingBusMinutes: parseMinutes(service?.NextBus2?.EstimatedArrival, nowMs)
  }));

  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=40');
  return sendJson(res, 200, result);
}
