var mysql = require("mysql");

///////////////////////////////////////////////////////////////////////////////////////////

// Setup MySQL connection
// timezone is very NB

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rwc2023",
  timezone: "utc+0",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Sucessfully connected to MySQL database usersDB`);
});

///////////////////////////////////////////////////////////////////////////////////////////

// GET /venues
exports.getVenues = function (req, res) {
  connection.query(`SELECT * FROM venues`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// GET /teams
exports.getTeams = function (req, res) {
  connection.query(
    `SELECT teams.id, teams.name, pools.pool
    FROM teams
    INNER JOIN pools ON teams.name = pools.team_name;`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /teams/pool
exports.getTeamsByPool = function (req, res) {
  connection.query(
    `SELECT teams.id, teams.name, pools.pool
    FROM teams
    INNER JOIN pools ON teams.name = pools.team_name
    WHERE pool = "${req.params.pool}"`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /players
exports.getPlayers = function (req, res) {
  connection.query(
    `SELECT player_id, player_name, abbrev, team_id, team_name
    FROM player_points`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /somePlayers
exports.getSomePlayers = function (req, res) {
  connection.query(
    `SELECT players.id AS player_id,  players.name AS player_name, teams.id AS team_id,teams.name AS team_name
    FROM players
    INNER JOIN teams ON players.team_id = teams.id`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200);
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /results
exports.getResults = function (req, res) {
  connection.query(`SELECT * FROM results`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200);
    res.send(JSON.stringify(rows));
  });
};

// PUT /results/matchID
exports.updateResultsByMatchID = function (req, res) {
  const { team1_score, team2_score } = req.body;

  connection.query(
    `UPDATE results
    SET team1_score = ${team1_score}, team2_score = ${team2_score}
    WHERE match_id = ${req.params.id}`,
    function (err, rows, fields) {
      if (err) throw err;

      const result = { team1_score, team2_score };
      res.send(JSON.stringify(result));
      res.status(201); // OK
    }
  );
};

// GET /results/teamID
exports.getResultsByTeamID = function (req, res) {
  connection.query(
    `SELECT * FROM results WHERE team1_id = ${req.params.id} OR team2_id = ${req.params.id}`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /pools
exports.getPools = function (req, res) {
  connection.query(
    `SELECT p.*, t.id AS team_id
  FROM pools p
  JOIN teams t ON p.team_name = t.name;
  `,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /tackles
exports.getTackles = function (req, res) {
  connection.query(
    `SELECT * FROM player_tackles`,
    function (err, rows, fields) {
      if (err) throw err;

      res.status(200); // OK
      res.send(JSON.stringify(rows));
    }
  );
};

// GET /points
exports.getPoints = function (req, res) {
  connection.query(`SELECT * FROM player_points`, function (err, rows, fields) {
    if (err) throw err;

    res.status(200); // OK
    res.send(JSON.stringify(rows));
  });
};

// POST /login
exports.login = function (req, res) {
  const { email, password } = req.body;
  connection.query(
    `SELECT * FROM users WHERE email='${email}'`,
    function (err, rows, fields) {
      if (err) {
        res.status(401); // Invalid
        res.send("Not found");
      } else {
        if (rows.length > 0) {
          if (password === rows[0].password) {
            const user = { email: rows[0].email };
            res.send(JSON.stringify(user));
            res.status(200); //OK
          } else {
            res.status(401); // Invalid
            res.send("Not found");
          }
        } else {
          res.status(401); // Invalid
          res.send("Not found");
        }
      }
    }
  );
};
