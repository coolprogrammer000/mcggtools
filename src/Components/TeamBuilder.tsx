import "../styles.css";
import { useState } from "react";
import { Commanders, Commander } from "./Types";
import { Cards, Card } from "./Types";
import { Heroes, Hero } from "./Types";

function TeamBuilder() {
  const [press, setPress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const row = Array.from({ length: 3 }, (_, rowIndex) => rowIndex + 1);
  const length = Array.from({ length: 7 }, (_, lengthIndex) => lengthIndex + 1);
  const filteredHeroes = Hero.filter((champ) =>
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <div className="Row">
            <button onClick={() => setPress("")}>Close</button>
          </div>
          <div className="Pagegallery">
            {press === "Commander" &&
              Commander.map((Commander: Commanders) => (
                <img
                  className="Commander"
                  key={Commander.name}
                  src={`./Images/Commanders/${Commander.name}.webp`}
                  alt={Commander.name}
                />
              ))}
            {press === "Go Go Cards" &&
              Card.map((Card: Cards) => (
                <img
                  className="GoGoCard"
                  key={Card.name}
                  src={`./Images/Go Go Cards/${Card.name}.png`}
                  alt={Card.name}
                />
              ))}
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="Search heroes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="gallery">
        <div>
          {filteredHeroes.map((Hero: Heroes) => (
            <img
              className="Heroes"
              key={Hero.name}
              src={`./Images/Heroes/${Hero.name}.png`}
              alt={Hero.name}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default TeamBuilder;
