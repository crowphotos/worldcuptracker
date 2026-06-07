import Team from '../../models/team';
import { teams, countries } from '../../lib/store';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':  return getTeams(req, res);
    case 'POST': return createTeam(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getTeams(_req, res) {
  try {
    res.status(200).json(teams);
  } catch (err) {
    console.error('GET /api/teams:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function createTeam(req, res) {
  try {
    const { name, countryId } = req.body ?? {};

    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name must be a non-empty string' });
    }
    if (!Number.isInteger(countryId) || countryId <= 0) {
      return res.status(400).json({ error: 'countryId must be a positive integer' });
    }
    if (!countries.some((c) => c.id === countryId)) {
      return res.status(400).json({ error: 'Country not found' });
    }

    const id = teams.length > 0 ? Math.max(...teams.map((t) => t.id)) + 1 : 1;
    const team = new Team(id, name, countryId);
    teams.push(team);
    res.status(201).json(team);
  } catch (err) {
    console.error('POST /api/teams:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
