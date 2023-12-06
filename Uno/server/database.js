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

// For Users Table
export function getUsers((err, data) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertUsers(data, (res) => {
  const q = "INSERT INTO users(uid, username) VALUES ('uid','username')";

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return data;
  });
});

// For Game Table
export function getGame((err, data) => {
  const q = "SELECT * FROM game";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertGame(data, (res) => {
  const q = "INSERT INTO game(owner, date_played, gid) VALUES ('owner','date_played','gid')";

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return data;
  });
});


// For Players Table
export function getPlayers((err, data) => {
  const q = "SELECT * FROM players";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertPlayers(data, (res) => {
  const q = "INSERT INTO players(gid, uid) VALUES ('gid','uid')";

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return data;
  });
});

// For Moves Table
export function getMoves((err, data) => {
  const q = "SELECT * FROM moves";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertUsers(data, (res) => {
  const q = "INSERT INTO moves(gid, move, turn, uid) VALUES ('gid', 'move', 'turn', 'uid')";

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return data;
  });
});

// For Winners Table
export function getWinners((err, data) => {
  const q = "SELECT * FROM winners";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return err;
    }
    return data;
  });
});

export function insertWinners(data, (res) => {
  const q = "INSERT INTO winners(gid, uid) VALUES ('gid','uid')";

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return data;
  });
});

