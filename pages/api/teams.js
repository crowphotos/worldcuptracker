// pages/api/teams.js
import Team from "../../models/team";
import axios from "axios";

const teams = [
  new Team(1, "USA National Team", 1),
  new Team(2, "Canada National Team", 2),
  // Add more teams
];

export default (req, res) => {
  switch (req.method) {
    case "GET":
      return getTeams(req, res);
    case "POST":
      return createTeam(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Get all teams
const getTeams = (req, res) => {
  try {
    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, countryId } = req.body;

    // Validate input
    if (
      !name ||
      typeof name !== "string" ||
      !countryId ||
      typeof countryId !== "number"
    ) {
      return res.status(400).json({ error: "Invalid team data" });
    }

    // Check if the country exists (optional, depending on your requirements)
    const countries = await axios.get("/api/countries");
    if (!countries.data.some((country) => country.id === countryId)) {
      return res.status(400).json({ error: "Country not found" });
    }

    const newTeamId =
      teams.length > 0 ? Math.max(...teams.map((team) => team.id)) + 1 : 1;
    const newTeam = new Team(newTeamId, name, countryId);
    teams.push(newTeam);

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
