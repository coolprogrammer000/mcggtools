import "../styles.css";
import { useState } from "react";
import { Heroes, Hero } from "./Types";
/*Building the hero tier list*/

interface Tier {
  S: Heroes[];
  A: Heroes[];
  B: Heroes[];
  C: Heroes[];
  D: Heroes[];
}

function HeroesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tier, setTier] = useState<Tier>({ S: [], A: [], B: [], C: [], D: [] });
  const [drag, setDrag] = useState<Heroes | null>(null);
  const [current, currentTier] = useState<string | null>(null);
  const [index, currentIndex] = useState<string | null>(null);
  const assignedChampNames = Object.values(tier)
    .flat()
    .map((champ: Heroes) => champ.name);
  const filteredHeroes = Hero.filter(
    (champ) =>
      champ.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assignedChampNames.includes(champ.name)
  );
  const handleOnClick = (Champ: Heroes) => {
    setTier((prev) => {
      return {
        ...prev,
        D: [...prev.D, Champ],
      };
    });
  };
  const handleOnClickRemove = (tier: string, ChampToRemove: Heroes) => {
    setTier((prev) => ({
      ...prev,
      [tier]: prev[tier as keyof Tier].filter(
        (Champ: Heroes) => Champ.name !== ChampToRemove.name
      ),
    }));
  };
  const findTier = (Champ: Heroes, tier: Tier) => {
    for (const tierKey in tier) {
      if (
        tier[tierKey as keyof Tier].some((c: Heroes) => c.name === Champ.name)
      ) {
        return tierKey;
      }
    }
    return null;
  };
  const handleOnDrop = (Champ: Heroes) => {
    const tierFound = findTier(Champ, tier);
    if (tierFound) {
      handleOnClickRemove(tierFound, Champ);
    }
  };
  const renderRow = (letter: string) => {
    return (
      <tr>
        <td className={`Label ${letter}`}>{letter}</td>
        <td
          className="empty"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (drag) {
              setTier((prev) => {
                return {
                  ...prev,
                  [letter]: [...prev[letter as keyof Tier], drag],
                };
              });
              if (current) {
                handleOnClickRemove(current, drag);
              }
              currentTier(null);
              setDrag(null);
            }
          }}
        >
          {tier[letter as keyof Tier].map((Champ: Heroes) => (
            <img
              key={Champ.name}
              src={`./Images/Heroes/${Champ.name}.png`}
              alt={Champ.name}
              onDragStart={() => {
                setDrag(Champ);
                currentTier(letter);
              }}
              onClick={() => handleOnClickRemove(letter, Champ)}
            />
          ))}
        </td>
      </tr>
    );
  };
  return (
    <>
      <div className="Table">
        <table>
          <tbody>
            {["S", "A", "B", "C", "D"].map((tier) => renderRow(tier))}
          </tbody>
        </table>
      </div>
      <input
        type="text"
        placeholder="Search heroes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (drag !== null) {
            handleOnDrop(drag);
          }
        }}
        className="gallery"
      >
        {[1, 2, 3, 4, 5].map((cost) => (
          <div key={cost}>
            {filteredHeroes
              .filter((Champ) => Champ.cost === cost)
              .map((Champ) => (
                <div key={Champ.name}>
                  <img
                    src={`./Images/Heroes/${Champ.name}.png`}
                    alt={Champ.name}
                    onClick={() => handleOnClick(Champ)}
                    onDragStart={() => setDrag(Champ)}
                  />
                  <div>{Champ.name}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default HeroesTable;
