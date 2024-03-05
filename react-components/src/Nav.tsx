import { Link, useHistory } from "react-router-dom";

// INTERFACE FOR PROPS
interface Props {
  setUpdateNav: (s: string) => void;
}

function Nav({ setUpdateNav }: Props) {
  // SAVED COOKIE IS USED TO CONDITIONAL RENDER
  const status = localStorage.getItem("IsLoggedIn");

  // LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.clear();
    setUpdateNav("logout");
  };

  return (
    <>
      <div>
        <img
          src={`/icons/logo2.png`}
          style={{ maxWidth: "75px", maxHeight: "75px" }}
        />
        <Link to="/routes">Routes</Link> |&nbsp;
        <Link to="/venues">Venues</Link> |&nbsp;
        <Link to="/teams">Teams</Link> |&nbsp;
        <Link to="/players">Players</Link> |&nbsp;
        <Link to="/results">Results</Link> |&nbsp;
        <Link to="/resultsByDate">Results By Date</Link> |&nbsp;
        <Link to="/pools">Pools</Link> |&nbsp;
        <Link to="/playerStats">Player Stats</Link> |&nbsp;
        {status ? (
          <>
            <Link to="/resultsAdmin">Results Admin</Link> |&nbsp;
            <Link to="/routes" onClick={handleLogout}>
              Logout
            </Link>
            &nbsp; {JSON.parse(status)}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |&nbsp;
          </>
        )}
      </div>

      <hr />
    </>
  );
}

export default Nav;
