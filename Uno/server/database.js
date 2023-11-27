// Database access code
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Uno",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/game", (req, res) => {
  const q = "SELECT * FROM game";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/game", (req, res) => {
  const q = "INSERT INTO game(`owner`, `date_played`, `gid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/game/:gid", (req, res) => {
  const gameId = req.params.gid;
  const q = " DELETE FROM game WHERE gid = ? ";

  db.query(q, [gameId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/game/:gid", (req, res) => {
  const gameId = req.params.gid;
  const q = "UPDATE game SET `owner`= ?, `date_played`= ? WHERE gid = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,gameId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(3306, () => {
  console.log("Connected to backend.");
});
