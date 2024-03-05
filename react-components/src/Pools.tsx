import axios from "axios";
import { useEffect, useState } from "react";
import PoolScore from "./PoolScore";

interface Pool {
  pool: string;
  position: number;
  team_id: number;
  team_name: string;
  played: number;
  w: number;
  d: number;
  l: number;
  pf: number;
  pa: number;
  bonus: number;
  pts: number;
}
function Pools() {
  const [pools, setPools] = useState<Pool[]>([]);

  // GET THE DATA IN ONE FLOW FROM REST API
  useEffect(() => {
    axios.get<Pool[]>("http://localhost:3000/pools").then((response) => {
      setPools(response.data);
    });
  }, []);

  // DATA IS PASSED TO PoolScore.tsx TO AVOID CODE DUPLICATION

  return (
    <>
      <h1>Pools</h1>
      <hr></hr>
      <PoolScore pools={pools} poolName="A" poolID="a" />
      <PoolScore pools={pools} poolName="B" poolID="b" />
      <PoolScore pools={pools} poolName="C" poolID="c" />
      <PoolScore pools={pools} poolName="D" poolID="d" />
    </>
  );
}

export default Pools;
