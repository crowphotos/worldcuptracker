import React, { useState, useEffect } from "react";
import CountrySelector from "../components/CountrySelector";
import ScheduleView from "../components/ScheduleView";
import ResultsView from "../components/ResultsView";

const Home = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matches data
  }, []);

  return (
    <div>
      <CountrySelector onCountriesChange={setSelectedCountries} />
      <ScheduleView matches={matches} />
      <ResultsView matches={matches} />
    </div>
  );
};

export default Home;
