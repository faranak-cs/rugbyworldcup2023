import axios from "axios";
import { useEffect, useState, useRef, FormEvent } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

interface Params {
  matchID: string;
}

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

function ResultUpdate() {
  // USED TO RECEIVE DATA FROM ResultsAdmin.tsx
  const { matchID } = useParams<Params>();
  const idScore1 = useRef<HTMLInputElement>(null);
  const idScore2 = useRef<HTMLInputElement>(null);

  // USED TO ROUTE BACK TO ResultsAdmin.tsx
  const history = useHistory();
  // USE THE CURRENT OBJECT PASSED FROM ResultsAdmin.tsx HERE
  const location = useLocation<Result>();
  const data = location.state;

  // FORMAT DATE IN UK FORMAT
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-uk", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ROUTE BACK TO ResultsAdmin.tsx ON CANCEL
  const handleCancel = () => {
    history.push("/resultsAdmin");
  };

  // UPDATE HANDLER
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // OBJECT FOR PUT REQUEST TO UPDATE THE RESULT
    const score = {
      team1_score: "",
      team2_score: "",
    };

    if (idScore1.current != null && idScore2.current != null) {
      score.team1_score = idScore1.current.value;
      score.team2_score = idScore2.current.value;
      // IF USER ENTERS NOTHING THEN RETURN
      if (score.team1_score === "" || score.team2_score === "") return;
      // PUT REQUEST
      axios
        .put(`http://localhost:3000/results/${matchID}`, score)
        .then((response) => {
          console.log(response.data);
          // ROUTE BACK TO ResultsAdmin.tsx ON UPDATE
          history.push("/resultsAdmin");
        });
    }
  };
  return (
    <>
      <h1>Update Result</h1>
      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Stage</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {formatDate(data.date)}@{data.time}
            </td>
            <td>{data.stage}</td>
            <td>{data.venue_name}</td>
          </tr>

          <tr></tr>
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Team1">
          <img
            src={`/icons/${data.team1_id}.png`}
            style={{ maxWidth: "20px", maxHeight: "20px" }}
          />{" "}
          {data.team1_name}
        </label>
        <input
          id="Team1"
          ref={idScore1}
          type="number"
          className="form-control"
          defaultValue={data.team1_score}
        />
        <label htmlFor="Team2">
          <img
            src={`/icons/${data.team2_id}.png`}
            style={{ maxWidth: "20px", maxHeight: "20px" }}
          />{" "}
          {data.team2_name}
        </label>
        <input
          id="Team2"
          ref={idScore2}
          type="number"
          className="form-control"
          defaultValue={data.team2_score}
        />
        <button
          onClick={handleCancel}
          className="btn btn-warning"
          type="button"
        >
          Cancel
        </button>{" "}
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </form>
    </>
  );
}

export default ResultUpdate;
