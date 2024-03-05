import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";

interface Stat {
  player_id: number;
  team_id: number;
  player_name: string;
  team_name: string;
  tackles: number;
  points: number;
}

function PlayerStats() {
  const [tackles, setTackles] = useState<Stat[]>([]);
  const [points, setPoints] = useState<Stat[]>([]);
  // INITIALIZE WITH POINTS
  const [selectedStat, setSelectedStat] = useState("Points");

  // SORT THE TACKLES
  const tacklesDescending = [...tackles].sort((a, b) =>
    a.tackles < b.tackles ? 1 : -1
  );

  // SORT THE POINTS
  const pointsDescending = [...points].sort((a, b) =>
    a.points < b.points ? 1 : -1
  );

  // GET TACKLES DATA FROM REST API
  useEffect(() => {
    axios.get<Stat[]>("http://localhost:3000/tackles").then((response) => {
      setTackles(response.data);
    });
  }, []);

  // GET POINTS DATA FROM REST API
  useEffect(() => {
    axios.get<Stat[]>("http://localhost:3000/points").then((response) => {
      setPoints(response.data);
    });
  }, []);

  // SET THE selectedStat STATE VAR WITH THE SELECTED OPTION
  const handleStatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStat(event.target.value);
    console.log(selectedStat);
  };

  // FILTER
  const filteredStats =
    selectedStat === "Tackles" ? tacklesDescending : pointsDescending;

  return (
    <>
      <h1>Player Stats</h1>
      <hr />
      <label htmlFor="statFilter">Stat:</label>
      <select id="statFilter" onChange={handleStatChange} value={selectedStat}>
        <option>Points</option>
        <option>Tackles</option>
      </select>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Team</th>
            <th>{selectedStat}</th>
          </tr>
        </thead>
        <tbody>
          {filteredStats.map((stat, order) => {
            {
              /* STAT.TEAM_NAME SHOULD NEW-ZEALAND AND SOUTH-AFRICA */
            }
            const formattedTeamName = stat.team_name.replace(/\s+/g, "-");
            return (
              <tr key={stat.player_id}>
                <td>{order + 1}</td>
                <td>
                  <a
                    href={`https://rugbyworldcup.com/2023/teams/${formattedTeamName}/player/${stat.player_id}`}
                  >
                    {stat.player_name}
                  </a>
                </td>
                <td>
                  <img
                    src={`src/assets/icons/${stat.team_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />{" "}
                  {stat.team_name}
                </td>
                <td>
                  {stat.points}
                  {stat.tackles}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PlayerStats;
