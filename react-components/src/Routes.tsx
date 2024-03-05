import axios from "axios";
import { useRef, useState } from "react";

interface User {
  id: number;
  name: string;
}

function Routes() {
  // USED TO DISPLAY DATA IN TEXTAREA
  const [data, setData] = useState();

  const handleClickVenues = () => {
    // GET /VENUES DATA FROM REST API SERVER
    axios.get("http://localhost:3000/venues").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const handleClickTeams = () => {
    // GET /TEAMS DATA FROM REST API SERVER
    axios.get("http://localhost:3000/teams").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const handleClickTeamsByPool = () => {
    // GET /TEAMS/A DATA FROM REST API SERVER
    axios.get(`http://localhost:3000/teams/A`).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  };

  const handleClickPlayers = () => {
    // GET /PLAYERS DATA FROM REST API SERVER
    axios.get(`http://localhost:3000/players`).then((response) => {
      setData(response.data);
    });
  };

  return (
    <>
      <h1>Routes</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Route</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Get venues</td>
            <td>
              <a href="http://localhost:3000/venues">/venues</a>
            </td>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                onClick={handleClickVenues}
                id="venues"
                type="button"
              >
                Get
              </button>
            </td>
          </tr>

          <tr>
            <td>Get teams</td>
            <td>
              <a href="http://localhost:3000/teams">/teams</a>
            </td>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                onClick={handleClickTeams}
                id="teams"
                type="button"
              >
                Get
              </button>
            </td>
          </tr>

          <tr>
            <td>Get pool teams</td>
            <td>
              <a href="http://localhost:3000/teams/A">/teams/A</a>
            </td>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                onClick={handleClickTeamsByPool}
                id="teamsByPool"
                type="button"
              >
                Get
              </button>
            </td>
          </tr>

          <tr>
            <td>Get players</td>
            <td>
              <a href="http://localhost:3000/players">/players</a>
            </td>
            <td></td>
            <td>
              <button
                className="btn btn-primary"
                onClick={handleClickPlayers}
                id="players"
                type="button"
              >
                Get
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <textarea
        id="textarea"
        className="form-control"
        rows={20}
        cols={100}
        value={JSON.stringify(data, null, 3)}
        readOnly
      ></textarea>
    </>
  );
}

export default Routes;
