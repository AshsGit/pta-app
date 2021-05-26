var mongoose = require('mongoose');
// Set mongoose flags to prevent depreciation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
module.exports = mongoose;
//# sourceMappingURL=mongoose_init.js.map