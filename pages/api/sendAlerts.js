// pages/api/sendAlerts.js
import Match from "../../models/match";
import axios from "axios";

const matches = [
  new Match(1, 1, 2, "2026-11-20T13:00:00Z", "A", null),
  // Add more matches
];

export default async (req, res) => {
  if (req.method !== "POST") {
    return res
      .setHeader("Allow", ["POST"])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { selectedCountries } = req.body;

    // Validate input
    if (!Array.isArray(selectedCountries) || selectedCountries.length === 0) {
      return res.status(400).json({ error: "Invalid selectedCountries" });
    }

    const now = new Date();
    const oneDayBefore = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const oneHourBefore = new Date(now.getTime() + 60 * 60 * 1000);

    // Filter matches based on selected countries and time criteria
    const alertsToSend = matches.filter((match) => {
      const matchDate = new Date(match.date);
      return (
        (selectedCountries.includes(match.team1Id) ||
          selectedCountries.includes(match.team2Id)) &&
        ((matchDate <= oneDayBefore && matchDate > oneHourBefore) ||
          matchDate <= oneHourBefore)
      );
    });

    // Send alerts
    for (const match of alertsToSend) {
      const message = `Match between Team ${match.team1Id} and Team ${match.team2Id} on ${new Date(match.date).toLocaleString()} in Group ${match.group}`;
      await sendNotification(message);
    }

    res.status(200).json({ message: "Alerts sent" });
  } catch (error) {
    console.error("Error sending alerts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to send notifications
const sendNotification = async (message) => {
  try {
    // Example using a notification service API
    const response = await axios.post(
      process.env.NOTIFICATION_SERVICE_URL,
      { message },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTIFICATION_SERVICE_API_KEY}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to send notification");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};
