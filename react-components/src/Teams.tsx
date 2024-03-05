import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// DEFINE DATA TYPE
interface Team {
  name: string;
  pool: string;
  id: number;
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);

  // SORT ALPHABETICALLY
  const teamsAscending = [...teams].sort((a, b) => (a.name > b.name ? 1 : -1));

  // GET THE DATA FROM REST API IN ONE FLOW
  useEffect(() => {
    axios.get<Team[]>("http://localhost:3000/teams").then((response) => {
      setTeams(response.data);
    });
  }, [teams]);

  return (
    <>
      <h1>Teams</h1>
      <hr></hr>

      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Teams</th>
            <th>Pool</th>
          </tr>
        </thead>
        <tbody>
          {teamsAscending.map((team) => {
            return (
              <tr key={team.id}>
                <td>
                  <img
                    src={`icons/${team.id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>
                <td>{team.name}</td>
                <td>
                  <Link to={`/pool/${team.pool}`}>{team.pool}</Link>
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

export default Teams;
