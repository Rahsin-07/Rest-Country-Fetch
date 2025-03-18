import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RestCountry.css';

const RestCountry = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCardClick = (country) => setSelectedCountry(country);
  const handleClose = () => setSelectedCountry(null);

  if (loading) return <div>Loading countries...</div>;

  if (selectedCountry) {
    return (
      <div className="modal show" style={{ display: 'block' }} onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
      <div className="modal-header">
      <h5 className="modal-title">{selectedCountry.name.common}</h5>
        <button type="button" className="btn-close" onClick={handleClose}></button>
      </div>
      <div className="modal-body">
         <img 
          src={selectedCountry.flags[0] || selectedCountry.flags.png} 
            alt={`Flag of ${selectedCountry.name.common}`} 
            className="img-fluid mb-3" 
              />
      <p><strong>Region:</strong> {selectedCountry.region}</p>
       <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
         <p><strong>Subregion:</strong> {selectedCountry.subregion}</p>
       <p><strong>Population:</strong> {selectedCountry.population}</p>
         <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(', ')}</p>
        <p><strong>Currencies:</strong> {Object.values(selectedCountry.currencies || {}).map(currency => currency.name).join(', ')}</p>
        </div>
       </div>
    </div>
      </div>
    );
  }

  return (
    <div>
      
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body fixed-top">
   <div className="container-fluid">
   <p className="navbar-brand">Rest Countries</p>
   <form className="d-flex ms-auto">
 <input className="form-control me-2" type="search" placeholder="Search" value={searchTerm} onChange={handleSearchChange} aria-label="Search"/>
  </form>
 </div>
   </nav>
 <div className="container" style={{ marginTop: '80px' }}>
  {filteredCountries.length === 0 && searchTerm && (
  <div className="alert alert-warning mt-4">
    No matching records found.
  </div>
        )}  
 <div className="row">
   {filteredCountries.slice(0, 15).map((country) => (
    <div key={country.cca3} className="col-md-4 mb-4">
    <div className="card" onClick={() => handleCardClick(country)} style={{ cursor: 'pointer' }}>
  <img src={country.flags[0] || country.flags.png}  className="card-img-top" alt={`Flag of ${country.name.common}`}
                  style={{ height: '200px', width: '308px'}} 
                />
 <div className="card-body">
 <h5 className="card-title">{country.name.common}</h5>
    <p className="card-text">
    Region: {country.region}<br />
    Capital: {country.capital ? country.capital[0] : 'N/A'} <br />
     Population: {country.population}
  </p>
  </div>
  </div>
 </div>
  ))}
  </div>
  </div>
  </div>
  );
};

export default RestCountry;