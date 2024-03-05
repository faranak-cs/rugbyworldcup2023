import axios from "axios";
import { useState, useEffect } from "react";

// DEFINE THE DATA TYPE
interface Venue {
  id: number;
  name: string;
}

function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);

  // SORT ALPHABETICALLY
  const venuesAscending = [...venues].sort((a, b) =>
    // CONVERT TO LOWERCASE FIRST AS WE HAVE DATA WITH BOTH LOWER AND UPPER CASES
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  // GET VENUES FROM REST API USING AXIOS IN ONE FLOW
  useEffect(() => {
    axios.get<Venue[]>("http://localhost:3000/venues").then((response) => {
      setVenues(response.data);
    });
  }, [venues]);

  return (
    <>
      <h1>Venues</h1>
      <hr></hr>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Venues</th>
          </tr>
        </thead>
        <tbody>
          {venuesAscending.map((venue, order) => {
            return (
              <tr key={venue.id}>
                <td>{order + 1}</td>
                <td>{venue.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />
    </>
  );
}

export default Venues;
