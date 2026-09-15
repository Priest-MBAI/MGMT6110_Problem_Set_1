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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const accountKey = process.env.LTA_ACCOUNT_KEY;
  const keyConfigured = Boolean(
    accountKey && typeof accountKey === 'string' && accountKey.trim().length > 0
  );

  let upstreamAnswered = false;
  let upstreamStatus = null;

  if (keyConfigured) {
    try {
      const response = await fetch(
        'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04151',
        {
          headers: {
            AccountKey: accountKey.trim()
          }
        }
      );
      upstreamAnswered = true;
      upstreamStatus = response.status;
    } catch (err) {
      upstreamAnswered = false;
      upstreamStatus = null;
    }
  }

  const payload = {
    keyConfigured,
    upstreamAnswered,
    upstreamStatus
  };

  return sendJson(res, 200, payload);
}
