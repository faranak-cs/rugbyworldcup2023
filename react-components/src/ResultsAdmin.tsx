import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

interface Result {
  match_id: number;
  date: string;
  time: string;
  stage: string;
  team1_id: number;
  team1_name: string;
  team1_score: number;
  team2_id: number;
  team2_name: string;
  team2_score: number;
  venue_id: number;
  venue_name: string;
}

function ResultsAdmin() {
  const [results, setResults] = useState<Result[]>([]);
  // THIS IS USED TO ROUTE TO ResultUpdate.tsx WITH CURRENT DETAILS
  const history = useHistory();

  // FORMAT DATA IN UK STYLE
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-uk", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // GET THE DATA FROM REST API IN ONE FLOW
  useEffect(() => {
    axios.get<Result[]>("http://localhost:3000/results").then((response) => {
      setResults(response.data);
    });
  }, [results]);

  // UPDATE HANDLER
  // PASS MATCH_ID WITH OTHER DETAILS
  const handleClickUpdate = (result: Result) => {
    history.push({
      pathname: `/resultUpdate/${result.match_id}`,
      state: result,
    });
  };

  return (
    <>
      <h1>Results Admin</h1>
      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Stage</th>
            <th>Logo</th>
            <th>Team 1</th>
            <th>Result</th>
            <th>Team 2</th>
            <th>Logo</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            return (
              <tr key={result.match_id}>
                <td>
                  {formatDate(result.date)} {result.time}
                </td>
                <td>{result.stage}</td>
                <td>
                  <img
                    src={`icons/${result.team1_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>

                <td>{result.team1_name}</td>
                <td>
                  {result.team1_score}-{result.team2_score}
                </td>
                <td>{result.team2_name}</td>
                <td>
                  <img
                    src={`icons/${result.team2_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>
                <td>{result.venue_name}</td>
                <td>
                  <button
                    onClick={() => handleClickUpdate(result)}
                    className="btn btn-primary"
                    type="button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ResultsAdmin;
