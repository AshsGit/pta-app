const mongoose = require('./mongoose_init');
const app = require('./app');

const port = process.env.PORT || 5000;

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server started on port ${port}`));

export {}