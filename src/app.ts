const express = require('express');
const bodyParser = require('body-parser');
const abs = require('./routes/api/abs');
const wptas = require('./routes/api/wptas');
const patients = require('./routes/api/patients');
const path = require('path');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// Use routes
app.use('/api/patient', patients);
app.use('/api/wptas', wptas);
app.use('/api/abs', abs);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

module.exports = app;
