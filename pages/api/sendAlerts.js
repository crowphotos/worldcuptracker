import { matches, teams } from '../../lib/store';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!process.env.NOTIFICATION_SERVICE_URL || !process.env.NOTIFICATION_SERVICE_API_KEY) {
    console.error('Missing NOTIFICATION_SERVICE_URL or NOTIFICATION_SERVICE_API_KEY');
    return res.status(503).json({ error: 'Notification service not configured' });
  }

  try {
    const { selectedCountries } = req.body ?? {};

    if (!Array.isArray(selectedCountries) || selectedCountries.length === 0) {
      return res.status(400).json({ error: 'selectedCountries must be a non-empty array' });
    }
    if (!selectedCountries.every((id) => Number.isInteger(id) && id > 0)) {
      return res.status(400).json({ error: 'selectedCountries must contain positive integers' });
    }

    const selectedTeamIds = new Set(
      teams.filter((t) => selectedCountries.includes(t.countryId)).map((t) => t.id),
    );

    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const upcoming = matches.filter(
      (m) =>
        m.date > now &&
        m.date <= oneDayFromNow &&
        (selectedTeamIds.has(m.team1Id) || selectedTeamIds.has(m.team2Id)),
    );

    for (const match of upcoming) {
      const window = match.date <= oneHourFromNow ? '1 hour' : '24 hours';
      const message = `Upcoming in ${window}: Team ${match.team1Id} vs Team ${match.team2Id} — ${match.date.toISOString()} Group ${match.group}`;
      await sendNotification(message);
    }

    res.status(200).json({ sent: upcoming.length });
  } catch (err) {
    console.error('POST /api/sendAlerts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function sendNotification(message) {
  const response = await fetch(process.env.NOTIFICATION_SERVICE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NOTIFICATION_SERVICE_API_KEY}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) {
    throw new Error(`Notification service responded with ${response.status}`);
  }
}
