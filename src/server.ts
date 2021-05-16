const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const abs = require('./routes/api/abs');
const wptas = require('./routes/api/wptas');
const patients = require('./routes/api/patients');
const path = require('path');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// DB config
// const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const db = require('./config/keys').mongoURI;

// Set mongoose flags to prevent depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

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

// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.resolve(__dirname, './client/build')));
// }

// // Handle React routing, return all requests to React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
