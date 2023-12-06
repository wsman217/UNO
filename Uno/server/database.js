// Database access code
import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Uno",
});

db.connect(function (err) {
   if(err){
       console.log("ERROR: Didn't Connect!");
   }
   else{
       console.log("Connected!");
   }
});

const schema = db.schema;

const users = new schema({
  username: String,
  uid: Number
});

const game = new schema({
  owner: String,
  date_played: String,
  gid: Number
});

const players = new schema({
  gid: Number,
  uid: Number
});

const moves = new schema({
  gid: Number,
  uid: Number,
  move: String,
  turn: Number
});

const winners = new schema({
  gid: Number,
  uid: Number
});

db.query('SELECT * FROM game', (err, rows) => {
  if(err) throw err;

  console.log('Data received:');
  console.log(rows);
});

export function getGame("/game", (req, res) => {
  const q = "SELECT * FROM game";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertGame("/game", (req, res) => {
  const q = "INSERT INTO game(`owner`, `date_played`, `gid`) VALUES (?)";

  const values = [
    req.body.owner,
    req.body.game_played,
    req.body.gid,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/game/:gid", (req, res) => {
  const gameId = req.params.gid;
  const q = "UPDATE game SET `owner`= ?, `date_played`= ? WHERE gid = ?";

  const values = [
    req.body.owner,
    req.body.game_played,
    req.body.gid,
  ];

  db.query(q, [...values,gameId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
