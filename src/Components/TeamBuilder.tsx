import "../styles.css";
import { useState } from "react";
import { Commanders, Commander } from "./Types";
import { Cards, Card } from "./Types";
import { Heroes, Hero } from "./Types";

function TeamBuilder() {
  const [press, setPress] = useState("");
  const row = Array.from({ length: 3 }, (_, rowIndex) => rowIndex + 1);
  const length = Array.from({ length: 7 }, (_, lengthIndex) => lengthIndex + 1);
  return (
    <>
      <div className="TeamBuilderTable">
        <table>
          <td>Traits</td>
        </table>
        <table>
          <tbody>
            {row.map((rowIndex) => (
              <tr key={rowIndex}>
                {length.map((lengthIndex) => (
                  <td key={lengthIndex} className="Box">
                    h
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <td>
            <tr>Go Go Cards</tr>
            <button onClick={() => setPress("Go Go Cards")}>+</button>
            <tr> Commanders </tr>
            <button onClick={() => setPress("Commander")}>+</button>
          </td>
        </table>
      </div>
      {(press === "Go Go Cards" || press === "Commander") && (
        <div className="Fullpage">
          <button onClick={() => setPress("")}>Close</button>
          {press === "Commander" &&
            Commander.map((Commander: Commanders) => (
              <img
                key={Commander.name}
                src={`./Images/Commanders/${Commander.name}.webp`}
                alt={Commander.name}
              />
            ))}
          {press === "Go Go Cards" &&
            Card.map((Card: Cards) => (
              <img
                key={Card.name}
                src={`./Images/Go Go Cards/${Card.name}.png`}
                alt={Card.name}
              />
            ))}
        </div>
      )}

      <div>
        {Hero.map((Hero: Heroes) => (
          <img
            key={Hero.name}
            src={`./Images/Heroes/${Hero.name}.png`}
            alt={Hero.name}
          />
        ))}
      </div>
    </>
  );
}
export default TeamBuilder;
