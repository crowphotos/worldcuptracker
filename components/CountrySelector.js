import React, { useState } from "react";

const CountrySelector = ({ countries, onCountriesChange }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleCountrySelect = (event) => {
    const countryId = parseInt(event.target.value, 10);
    const updated = selectedCountries.includes(countryId)
      ? selectedCountries.filter((id) => id !== countryId)
      : [...selectedCountries, countryId];
    setSelectedCountries(updated);
    onCountriesChange(updated);
  };

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
