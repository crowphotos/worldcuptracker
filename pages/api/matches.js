import Match from "../../models/match";

const matches = [
  new Match(1, 1, 2, "2026-11-20T13:00:00Z", "A", null),
  // Add more matches
];

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(matches);
  } else if (req.method === "POST") {
    const newMatch = req.body;
    matches.push(
      new Match(
        newMatch.id,
        newMatch.team1Id,
        newMatch.team2Id,
        newMatch.date,
        newMatch.group,
        newMatch.result,
      ),
    );
    res.status(201).json(newMatch);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
