const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const abs = require('./routes/abs.ts');
const wptas = require('./routes/wptas.ts');
const patients = require('./routes/api/patients');



const app = express();

// bodyparser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Set mongoose flags to prevent depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Connect to Mongo 
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Use routes
app.use('/api/patients', patients);
app.use('/api/wptas', wptas)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
