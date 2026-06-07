import { countries } from '../../lib/store';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    res.status(200).json(countries);
  } catch (err) {
    console.error('GET /api/countries:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
