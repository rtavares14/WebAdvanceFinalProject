import express from 'express';
import auth from './routes/auth.js';
import bids from "./routes/bids.js";
import cards from "./routes/cards.js";
import users from "./routes/users.js";

const app = express()
const port = 3000

app.use("/auth", auth);
app.use("/bids", bids);
app.use("/cads", cards);
app.use("/users", users);

app.get('/', (req, res) => {
  console.log(req);
  // res.send('Hello World!')
  res.json({ msg: "hello world"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})