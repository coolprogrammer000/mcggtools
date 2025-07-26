import "../styles.css";
import { useState } from "react";
import Eruditio from "./Tables/Eruditio";
import Levelling from "./Tables/Levelling";
import Guinevere from "./Tables/Guinevere";
function Tables(){
  const [type, setType] = useState("heroes");
  return (
    <>
      <div className="SubRow">
        {["Eruditio", "Shop Odds", "Guinevere Expected Return"].map((text) => (
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
        {type === "Eruditio" && <Eruditio />}
        {type === "Shop Odds" && <Levelling />}
        {type === "Guinevere Expected Return" && <Guinevere />}
      </div>
    </>
  );
}
export default Tables