import React from "react";

const ScheduleView = ({ matches, teams, selectedCountries }) => {
  const teamById = Object.fromEntries(teams.map((t) => [t.id, t]));
  const teamName = (id) => teamById[id]?.name ?? `Team ${id}`;

  const filteredMatches =
    selectedCountries.length === 0
      ? []
      : matches.filter((match) => {
          const country1 = teamById[match.team1Id]?.countryId;
          const country2 = teamById[match.team2Id]?.countryId;
          return (
            selectedCountries.includes(country1) ||
            selectedCountries.includes(country2)
          );
        });

  return (
    <div>
      <h2>Schedule</h2>
      {selectedCountries.length === 0 ? (
        <p>Select a country to see upcoming matches.</p>
      ) : filteredMatches.length === 0 ? (
        <p>No matches found for selected countries.</p>
      ) : (
        filteredMatches.map((match) => (
          <div key={match.id} style={{ marginBottom: "16px" }}>
            <strong>{new Date(match.date).toLocaleString()}</strong> - Group{" "}
            {match.group}
            <p>
              {teamName(match.team1Id)} vs {teamName(match.team2Id)}
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
