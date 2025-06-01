import "../styles.css";
import { useState } from "react";
import HeroesTable from "./HeroesTable";
import GoGoCardsTable from "./GoGoCardsTable";
import EquipmentsTable from "./EquipmentsTable";
import CommandersTable from "./CommandersTable";

{
  /*For the tier list row of commanders,heroes... */
}
function TierList() {
  const [type, setType] = useState("heroes");
  return (
    <>
      <div className="SubRow">
        <span
          onClick={() => {
            setType("commanders");
          }}
        >
          Commanders
        </span>
        <span
          onClick={() => {
            setType("heroes");
          }}
        >
          Heroes
        </span>
        <span
          onClick={() => {
            setType("equipment");
          }}
        >
          {" "}
          Equipment
        </span>
        <span
          onClick={() => {
            setType("gogocards");
          }}
        >
          Go Go Cards
        </span>
      </div>

      <div>
        {type === "commanders" && <CommandersTable />}
        {type === "heroes" && <HeroesTable />}
        {type === "equipment" && <EquipmentsTable />}
        {type === "gogocards" && <GoGoCardsTable />}
      </div>
    </>
  );
}
export default TierList;
