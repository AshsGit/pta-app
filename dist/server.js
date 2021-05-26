"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('./mongoose_init');
var app = require('./app');
var port = process.env.PORT || 5000;
// DB config
var db = require('./config/keys').mongoURI;
// Connect to Mongo
mongoose
    .connect(db)
    .then(function () { return console.log('MongoDB Connected...'); })
    .catch(function (err) { return console.log(err); });
app.listen(port, function () { return console.log("Server started on port " + port); });
//# sourceMappingURL=server.js.map