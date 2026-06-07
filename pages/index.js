import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "../components/CountrySelector";
import ScheduleView from "../components/ScheduleView";
import ResultsView from "../components/ResultsView";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("/api/countries"),
      axios.get("/api/teams"),
      axios.get("/api/matches"),
    ])
      .then(([countriesRes, teamsRes, matchesRes]) => {
        setCountries(countriesRes.data);
        setTeams(teamsRes.data);
        setMatches(matchesRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <CountrySelector
        countries={countries}
        onCountriesChange={setSelectedCountries}
      />
      <ScheduleView
        matches={matches}
        teams={teams}
        selectedCountries={selectedCountries}
      />
      <ResultsView
        matches={matches}
        teams={teams}
        selectedCountries={selectedCountries}
      />
    </div>
  );
};

export default Home;
