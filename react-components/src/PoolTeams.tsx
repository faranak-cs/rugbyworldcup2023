import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// DEFINE DATA TYPE FOR ROUTE
interface Params {
  poolName: string;
}

// DEFINE DATA TYPE FOR REST API
interface Team {
  name: string;
  pool: string;
  id: number;
}

function PoolTeams() {
  // THIS WILL GET THE PoolName PASSED THROUGH URL
  const { poolName } = useParams<Params>();
  const [teams, setTeams] = useState<Team[]>([]);

  // SORT ALPHABETICALLY
  const teamsAscending = [...teams].sort((a, b) => (a.name > b.name ? 1 : -1));

  // GET DATA FROM REST API IN ONE FLOW
  useEffect(() => {
    axios
      .get<Team[]>(`http://localhost:3000/teams/${poolName}`)
      .then((response) => {
        setTeams(response.data);
      });
  }, [teams]);

  return (
    <>
      <h1>Teams in Pool {poolName}</h1>
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
                    src={`/icons/${team.id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>
                <td>{team.name}</td>
                <td>{team.pool}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link to="/teams">&lt;&lt;Teams</Link>
    </>
  );
}

export default PoolTeams;
