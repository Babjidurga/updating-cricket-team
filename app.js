const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

let db = null;

const intializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`error due to ${error.message}`);
    process.exit(1);
  }
};
intializeDbServer();
// GET ALL PLAYERS LIST API
app.get("/players/", async (request, response) => {
  const playersList = "SELECT * FROM cricket_team;";
  const array = await db.all(playersList);
  response.send(array);
});
// ADD PLAYER APT
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const updatePlayer = `INSERT INTO cricket_team
    (player_name,jersey_number,role)
    VALUES ('${playerName}',${jerseyNumber},'${role}');`;
  await db.run(updatePlayer);
  response.send("Player Added to Team");
});
module.exports = app;
