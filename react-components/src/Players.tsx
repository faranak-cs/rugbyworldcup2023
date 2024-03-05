import axios from "axios";
import { ChangeEvent, useState, useEffect } from "react";

// DEFINE THE DATA TYPE
interface Player {
  player_name: string;
  team_name: string;
  player_id: number;
  team_id: number;
}

function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  // SORT TEAMS AND PLAYERS ALPHABETICALLY
  const playersAscending = [...players].sort((a, b) => {
    // SORT TEAMS FIRST
    if (a.team_name > b.team_name) return 1;
    else if (a.team_name < b.team_name) return -1;
    else {
      // THEN SORT PLAYERS
      if (a.player_name > b.player_name) return 1;
      else if (a.player_name < b.player_name) return -1;
      else return 0;
    }
  });

  // GET THE DATA IN ONE FLOW FROM REST API
  useEffect(() => {
    axios
      .get<Player[]>("http://localhost:3000/somePlayers")
      .then((response) => {
        setPlayers(response.data);
      });
  }, [players]);

  // SET selectedTeam STATE VAR WITH THE SELECTED OPTION
  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(event.target.value);
  };

  // FILTER THE PLAYERS
  const filteredPlayers = selectedTeam
    ? playersAscending.filter((player) => player.team_name === selectedTeam)
    : playersAscending;

  return (
    <>
      <h1>Players</h1>
      <hr></hr>

      <label htmlFor="teamFilter">Team:</label>
      <select id="teamFilter" onChange={handleTeamChange} value={selectedTeam}>
        <option value="">All Teams</option>
        <option>England</option>
        <option>Ireland</option>
        <option>New Zealand</option>
        <option>South Africa</option>
      </select>

      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Player</th>
            <th>Team</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => {
            {
              /* PLAYER.TEAM_NAME SHOULD NEW-ZEALAND AND SOUTH-AFRICA */
            }
            const formattedTeamName = player.team_name.replace(/\s+/g, "-");
            return (
              <tr key={player.player_id}>
                <td>
                  <img
                    src={`src/assets/icons/${player.team_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>
                <td>{player.player_name}</td>
                <td>{player.team_name}</td>
                {/* PLAYER.TEAM_NAME SHOULD NEW-ZEALAND AND SOUTH-AFRICA */}
                <td>
                  <a
                    href={`https://rugbyworldcup.com/2023/teams/${formattedTeamName}/player/${player.player_id}`}
                  >
                    info...
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />
    </>
  );
}

export default Players;
