import "../styles.css";
import { useState } from "react";
import HeroGrid from "./S2/HeroGrid";
import SynergyGrid from "./S2/SynergyGrid";

function Tables() {
  const [type, setType] = useState("Heroes");

  return (
    <>
      <div className="SubRow">
        {["Heroes", "Synergies"].map((text) => (
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
        {type === "Heroes" && <HeroGrid />}
        {type === "Synergies" && <SynergyGrid />}
      </div>
    </>
  );
}

export default Tables;