const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Root routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

// POST - Save location
app.post('/getlocation', (req, res) => {
  const { lat, lng, username } = req.body;
  if (!lat || !lng || !username) {
    return res.status(400).json({ error: 'lat, lng, and username are required' });
  }

  const newLocation = {
    id: Date.now(),
    username,
    lat,
    lng,
    time: new Date().toISOString()
  };

  let data = [];
  try {
    const file = fs.readFileSync('db.json', 'utf-8');
    data = JSON.parse(file);
  } catch (err) {
    data = [];
  }

  data.push(newLocation);
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  console.log("✅ Location saved:", newLocation);
  res.json({ message: 'Location saved', location: newLocation });
});

// GET - All locations
app.get('/alllocation', (req, res) => {
  try {
    const file = fs.readFileSync('db.json', 'utf-8');
    const data = JSON.parse(file);
    res.json(data);
  } catch (err) {
    res.json([]);
  }
});

// ✅ DELETE - Delete location by ID
app.delete('/deletelocation/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  try {
    const file = fs.readFileSync('db.json', 'utf-8');
    let data = JSON.parse(file);

    const newData = data.filter(loc => loc.id !== idToDelete);

    if (data.length === newData.length) {
      return res.status(404).json({ message: 'Location not found' });
    }

    fs.writeFileSync('db.json', JSON.stringify(newData, null, 2));
    console.log(`❌ Location with ID ${idToDelete} deleted`);
    res.json({ message: `Location with ID ${idToDelete} deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting location' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
