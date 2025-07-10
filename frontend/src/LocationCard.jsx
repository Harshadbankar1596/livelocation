// src/LocationCard.jsx
import React from 'react';

const LocationCard = ({ loc, onDelete }) => {
  const { id, username, lat, lng, time } = loc;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="card">
      <h2>👤 {username}</h2>
      <p>🕒 {new Date(time).toLocaleString()}</p>
      <div className="map-container">
        <iframe
          src={mapSrc}
          width="100%"
          height="250"
          frameBorder="0"
          allowFullScreen=""
          loading="lazy"
          title={`Map of ${username}`}
        ></iframe>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>🗑️ Delete</button>
    </div>
  );
};

export default LocationCard;
