import express from 'express';
import cors from 'cors';

import tokens from './routes/tokens.js';
import bids from "./routes/bids.js";
import cards from "./routes/cards.js";
import users from "./routes/users.js";

const app = express()
const port = 3000

app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tokens', tokens);
app.use('/bids', bids);
app.use('/cards', cards);
app.use('/users', users);

app.get('/', (req, res) => {
  console.log(req);
  res.json({ msg: "hello world"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})