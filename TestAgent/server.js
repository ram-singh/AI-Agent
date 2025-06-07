
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const coverageRoutes = require('./backend/routes/coverageRoutes');
const app = express();
const PORT = process.env.PORT || 5000;
// Allow all origins
app.use(cors());
app.use(express.json());
app.use('/api', coverageRoutes);

// API route (e.g. http://localhost:5000/api/hello)
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Serve static files from frontend/dist
const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendDistPath));


// Catch-all route for SPA (React) 
app.get(/^\/(?!api).*/, (req, res) => {
    const indexPath = path.join(frontendDistPath, 'index.html');
    res.sendFile(indexPath);
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
