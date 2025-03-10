import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let response = await fetch("https://crio-location-selector.onrender.com/countries");
        let data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const fetchStates = async () => {
      try {
        let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        let data = await response.json();
        setStates(data);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedState) return;
    const fetchCities = async () => {
      try {
        let response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        let data = await response.json();
        setCities(data);
        setSelectedCity("");
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [selectedState]);

  return (
    <div>
      <h2>Select Location</h2>
      
      <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      
      <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      
      <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      
      {selectedCity && selectedState && selectedCountry && (
  <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
)}

    </div>
  );
};

export default LocationSelector;
