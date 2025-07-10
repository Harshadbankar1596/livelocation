import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from './LocationCard';
import './index.css';

const API = import.meta.env.VITE_API_URL;

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    axios.get(`${API}/alllocation`)
      .then(response => setLocations(response.data))
      .catch(error => console.error("Error fetching location data", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      axios.delete(`${API}/deletelocation/${id}`)
        .then(res => {
          alert(res.data.message);
          fetchLocations();
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
