import "../styles.css";
import { useState } from "react";
import Eruditio from "./Tables/Eruditio";
import Levelling from "./Tables/Levelling";
import Guinevere from "./Tables/Guinevere";

function Tables() {
  const [type, setType] = useState("Eruditio");

  const tabs = ["Eruditio", "Shop Odds", "Guinevere Expected Return"];

  return (
    <>
      <div className="SubRow">
        {tabs.map((text) => (
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
        {type === "Eruditio" && <Eruditio />}
        {type === "Shop Odds" && <Levelling />}
        {type === "Guinevere Expected Return" && <Guinevere />}
      </div>
    </>
  );
}

export default Tables;