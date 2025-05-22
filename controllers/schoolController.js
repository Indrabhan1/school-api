import  db  from '../db.js';

// Add School Controller
export const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = ('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)');
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database Error' });
    res.status(201).json({ message: 'School added successfully' });
  });
};

// List Schools Controller
export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude required.' });
  }

  const userLat = parseFloat(latitude);
  const userLong = parseFloat(longitude);

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database Error' });

    const schoolsWithDistance = results.map(school => {
      const dist = Math.sqrt(
        Math.pow(userLat - school.latitude, 2) + Math.pow(userLong - school.longitude, 2)
      );
      return { ...school, distance: dist };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
};
