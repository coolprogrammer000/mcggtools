import "../styles.css";
import { useState } from "react";
import HeroesTable from "./HeroesTable";
import GoGoCardsTable from "./GoGoCardsTable";
import EquipmentsTable from "./EquipmentsTable";
import CommandersTable from "./CommandersTable";

/*For the tier list row of commanders,heroes... */

function TierList() {
  const [type, setType] = useState("heroes");
  return (
    <>
      <div className="SubRow">
        {["Commanders", "Heroes", "Equipments", "Go Go Cards"].map((text) => (
          <span
            key={text}
            onClick={() => {
              setType(text);
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <div>
        {type === "Commanders" && <CommandersTable />}
        {type === "Heroes" && <HeroesTable />}
        {type === "Equipments" && <EquipmentsTable />}
        {type === "Go Go Cards" && <GoGoCardsTable />}
      </div>
    </>
  );
}
export default TierList;
