import "../styles.css";
import { useState } from "react";
import HeroesTable from "./HeroesTable";
import GoGoCardsTable from "./GoGoCardsTable";
import EquipmentsTable from "./EquipmentsTable";
import CommandersTable from "./CommandersTable";

function TierList() {
  const [type, setType] = useState("Heroes");

  return (
    <>
      <div className="SubRow">
        {["Heroes", "Commanders", "Equipments", "Go Go Cards"].map((text) => (
          <span
            key={text}
            className={type === text ? "active-tab" : ""}
            onClick={() => setType(text)}
          >
            {text}
          </span>
        ))}
      </div>
      <div>
        {type === "Heroes" && <HeroesTable />}
        {type === "Commanders" && <CommandersTable />}
        {type === "Equipments" && <EquipmentsTable />}
        {type === "Go Go Cards" && <GoGoCardsTable />}
      </div>
    </>
  );
}

export default TierList;