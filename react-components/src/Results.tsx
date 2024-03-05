import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

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

function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>("");

  // FORMAT DATE IN UK STYLE
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

  // SET THE selectedStage STATE VAR WITH THE SELECTED OPTION
  const handleStageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStage(event?.target.value);
  };

  // FILTER THE RESULTS
  const filteredResults = selectedStage
    ? results.filter((stage) => stage.stage === selectedStage)
    : results;

  return (
    <>
      <h1>Results</h1>
      <hr></hr>

      <label htmlFor="stageFilter">Stage:</label>
      <select
        id="stageFilter"
        onChange={handleStageChange}
        value={selectedStage}
      >
        <option value="">All Stages </option>
        <option>Pool A</option>
        <option>Pool B</option>
        <option>Pool C</option>
        <option>Pool D</option>
        <option>Quarter-final 1</option>
        <option>Quarter-final 2</option>
        <option>Quarter-final 3</option>
        <option>Quarter-final 4</option>
        <option>Semi-final 1</option>
        <option>Semi-final 2</option>
        <option>Bronze Final</option>
        <option>Final</option>
      </select>

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
          {filteredResults.map((result) => {
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

                <td>
                  <Link
                    to={`/resultsByTeam/${result.team1_id}/${result.team1_name}`}
                  >
                    {result.team1_name}
                  </Link>
                </td>
                <td>
                  {result.team1_score}-{result.team2_score}
                </td>

                <td>
                  <Link
                    to={`/resultsByTeam/${result.team2_id}/${result.team2_name}`}
                  >
                    {result.team2_name}
                  </Link>
                </td>
                <td>
                  <img
                    src={`icons/${result.team2_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />
                </td>
                <td>{result.venue_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Results;
