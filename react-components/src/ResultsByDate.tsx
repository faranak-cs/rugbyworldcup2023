import axios from "axios";
import { useState, useEffect } from "react";

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

function ResultsByDate() {
  const [results, setResults] = useState<Result[]>([]);
  // SEPTEMBER 08, 2023 IS SET AS DEFAULT DATE
  const [currentDate, setCurrentDate] = useState("09/08/2023");

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
  }, []);

  // FILTER RESULTS BASED ON DATES
  const filteredResults = results.filter(
    (result) => formatDate(result.date) === formatDate(currentDate)
  );

  // PREVIOUS DATE
  const handleClickDecreaseDate = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    const strDate = date.toDateString();
    setCurrentDate(strDate);
  };

  // NEXT DATE
  const handleClickIncreaseDate = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    const strDate = date.toDateString();
    setCurrentDate(strDate);
  };

  return (
    <>
      <h1>Results by Date</h1>
      <button onClick={handleClickDecreaseDate}>&lt;&lt;</button>
      <button onClick={handleClickIncreaseDate}>&gt;&gt;</button>
      {new Date(currentDate).toLocaleString("en-uk", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        weekday: "long",
      })}
      <hr />

      {filteredResults.length == 0 ? (
        <p>No matches played</p>
      ) : (
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
                      src={`/icons/${result.team1_id}.png`}
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
                      src={`/icons/${result.team2_id}.png`}
                      style={{ maxWidth: "20px", maxHeight: "20px" }}
                    />
                  </td>
                  <td>{result.venue_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ResultsByDate;
