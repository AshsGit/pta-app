var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var abs = require('./routes/api/abs');
var wptas = require('./routes/api/wptas');
var patients = require('./routes/api/patients');
var path = require('path');
var app = express();
// bodyparser middleware
app.use(bodyParser.json());
// DB config
var db = require('./config/keys').mongoURI;
// Set mongoose flags to prevent depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// Connect to Mongo
mongoose
    .connect(db)
    .then(function () { return console.log('MongoDB Connected...'); })
    .catch(function (err) { return console.log(err); });
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
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Server started on port " + port); });
//# sourceMappingURL=server.js.map