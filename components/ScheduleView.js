// components/ScheduleView.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleView = ({ selectedCountries }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch matches from an API endpoint
    axios
      .get("/api/matches")
      .then((response) => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch matches");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter matches based on selected countries
  const filteredMatches = matches.filter(
    (match) =>
      selectedCountries.includes(match.team1Id) ||
      selectedCountries.includes(match.team2Id),
  );

  return (
    <div>
      <h2>Schedule</h2>
      {filteredMatches.length === 0 ? (
        <p>No matches found for selected countries.</p>
      ) : (
        filteredMatches.map((match) => (
          <div key={match.id} style={{ marginBottom: "16px" }}>
            <strong>{new Date(match.date).toLocaleString()}</strong> - Group{" "}
            {match.group}
            <p>
              Team {match.team1Id} vs Team {match.team2Id}
            </p>
            {match.result ? (
              <p>
                Result: {match.result.team1Score} - {match.result.team2Score}
              </p>
            ) : (
              <p>Match not yet played</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ScheduleView;
