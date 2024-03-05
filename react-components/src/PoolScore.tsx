// INTERFACE TO USE pools DATA
interface Pool {
  pool: string;
  position: number;
  team_name: string;
  team_id: number;
  played: number;
  w: number;
  d: number;
  l: number;
  pf: number;
  pa: number;
  bonus: number;
  pts: number;
}
// INTERFACE FOR PROPS
interface Props {
  pools: Pool[];
  poolName: string;
  poolID: string;
}

function PoolScore({ pools, poolName, poolID }: Props) {
  // SORT ACCORDING TO HIGHEST POINTS
  const teamsDescending = [...pools].sort((a, b) => (a.pts < b.pts ? 1 : -1));
  // FILTER THE POOL TEAMS
  const filteredPool = teamsDescending.filter((pool) => pool.pool === poolName);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>
              <img
                src={`/icons/pool${poolID}.png`}
                style={{ maxWidth: "75px", maxHeight: "75px" }}
              />
            </th>
          </tr>
          <tr>
            <th>Team</th>
            <th>Pd</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>PF</th>
            <th>PA</th>
            <th>Bonus</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {filteredPool.map((pool, index) => {
            return (
              <tr key={pool.team_name} className={index < 2 ? "top2" : ""}>
                <td>
                  <img
                    src={`/icons/${pool.team_id}.png`}
                    style={{ maxWidth: "20px", maxHeight: "20px" }}
                  />{" "}
                  {pool.team_name}
                </td>
                <td>{pool.played}</td>
                <td>{pool.w}</td>
                <td>{pool.d}</td>
                <td>{pool.l}</td>
                <td>{pool.pf}</td>
                <td>{pool.pa}</td>
                <td>{pool.bonus}</td>
                <td>{pool.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PoolScore;
