const express = require('express');
require('./db');
const userRouter = require('./routers/user');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//use middleware and routers
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(morgan('combined'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, You are on Port 5000');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
