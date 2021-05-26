var express = require('express');
var bodyParser = require('body-parser');
var abs = require('./routes/api/abs');
var wptas = require('./routes/api/wptas');
var patients = require('./routes/api/patients');
var path = require('path');
var app = express();
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
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});
module.exports = app;
//# sourceMappingURL=app.js.map