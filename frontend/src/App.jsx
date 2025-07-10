// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from './LocationCard';
import './index.css';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    axios.get('http://localhost:3000/alllocation')
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching location data", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      axios.delete(`http://localhost:3000/deletelocation/${id}`)
        .then(res => {
          alert(res.data.message);
          fetchLocations(); // Refresh list after delete
        })
        .catch(err => {
          console.error("Delete failed:", err);
          alert("❌ Failed to delete location.");
        });
    }
  };

  return (
    <div className="app-container">
      <h1>🌍 User Locations</h1>
      <button className="refresh-btn" onClick={fetchLocations}>🔄 Refresh</button>

      <div className="location-list">
        {locations.map(loc => (
          <LocationCard key={loc.id} loc={loc} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
export default App;
