import "../styles.css";
import { useState } from "react";
import Heroes from "./S2/Heroes";
//import Synergies from "./S2/Synergies";
function Tables(){
  const [type, setType] = useState("heroes");
  return (
    <>
      <div className="SubRow">
        {["Heroes", "Synergies"].map((text) => (
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
        {type === "Heroes" && <Heroes />}
        {/* {type === "Synergies" && <Synergies />} */}
      </div>
    </>
  );
}
export default Tables