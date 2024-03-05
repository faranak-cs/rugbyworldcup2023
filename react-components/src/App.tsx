import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import Routes from "./Routes";
import Venues from "./Venues";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import PlayerStats from "./PlayerStats";
import Players from "./Players";
import Pools from "./Pools";
import Results from "./Results";
import ResultsByDate from "./ResultsByDate";
import Teams from "./Teams";
import PoolTeams from "./PoolTeams";
import TeamResults from "./TeamResults";
import ResultsAdmin from "./ResultsAdmin";
import ResultUpdate from "./ResultUpdate";

function App() {
  // THIS IS USED TO UPDATE THE NAVBAR
  const [updateNav, setUpdateNav] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Nav setUpdateNav={setUpdateNav} />
          <Switch>
            <Route path="/" exact component={Routes} />
            <Route path="/routes" component={Routes} />
            <Route path="/venues" component={Venues} />
            <Route path="/teams" component={Teams} />
            <Route path="/players" component={Players} />
            <Route path="/results" component={Results} />
            <Route path="/resultsByDate" component={ResultsByDate} />
            <Route path="/pools" component={Pools} />
            <Route path="/playerStats" component={PlayerStats} />
            <Route path="/pool/:poolName" component={PoolTeams} />
            <Route path="/resultsAdmin" component={ResultsAdmin} />
            <Route path="/resultUpdate/:matchID" component={ResultUpdate} />
            <Route
              path="/resultsByTeam/:teamID/:teamName"
              component={TeamResults}
            />
            {/* SEND setUpdateNav() AS PROPS TO LOGIN.tsx USING ROUTE  */}
            <Route
              path="/login"
              render={(props) => (
                <Login {...props} setUpdateNav={setUpdateNav} />
              )}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
