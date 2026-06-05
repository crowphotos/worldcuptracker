// components/CountrySelector.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CountrySelector = ({ onCountriesChange }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch countries from an API endpoint
    axios
      .get("/api/countries")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch countries");
        setLoading(false);
      });
  }, []);

  const handleCountrySelect = (event) => {
    const countryId = parseInt(event.target.value, 10);
    if (selectedCountries.includes(countryId)) {
      setSelectedCountries(selectedCountries.filter((id) => id !== countryId));
    } else {
      setSelectedCountries([...selectedCountries, countryId]);
    }
    onCountriesChange(selectedCountries);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Select Countries to Follow</h2>
      {countries.map((country) => (
        <label
          key={country.id}
          style={{ display: "block", marginBottom: "8px" }}
        >
          <input
            type="checkbox"
            value={country.id}
            checked={selectedCountries.includes(country.id)}
            onChange={handleCountrySelect}
            aria-label={`Follow ${country.name}`}
          />
          {country.name}
        </label>
      ))}
    </div>
  );
};

export default CountrySelector;
