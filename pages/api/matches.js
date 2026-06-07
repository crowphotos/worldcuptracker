import Match from '../../models/match';
import { matches } from '../../lib/store';

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':  return getMatches(req, res);
    case 'POST': return createMatch(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function getMatches(_req, res) {
  try {
    res.status(200).json(matches);
  } catch (err) {
    console.error('GET /api/matches:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function createMatch(req, res) {
  try {
    const { team1Id, team2Id, date, group, result = null } = req.body ?? {};

    if (!Number.isInteger(team1Id) || team1Id <= 0) {
      return res.status(400).json({ error: 'team1Id must be a positive integer' });
    }
    if (!Number.isInteger(team2Id) || team2Id <= 0) {
      return res.status(400).json({ error: 'team2Id must be a positive integer' });
    }
    if (team1Id === team2Id) {
      return res.status(400).json({ error: 'team1Id and team2Id must differ' });
    }
    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ error: 'date must be a valid date string' });
    }
    if (typeof group !== 'string' || !group.trim()) {
      return res.status(400).json({ error: 'group must be a non-empty string' });
    }

    const id = matches.length > 0 ? Math.max(...matches.map((m) => m.id)) + 1 : 1;
    const match = new Match(id, team1Id, team2Id, date, group, result);
    matches.push(match);
    res.status(201).json(match);
  } catch (err) {
    if (err instanceof TypeError) {
      return res.status(400).json({ error: err.message });
    }
    console.error('POST /api/matches:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
