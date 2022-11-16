const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://sayed:multi-auth@cluster0.vl1ewbk.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('We established a connection with MongoDB');
});
