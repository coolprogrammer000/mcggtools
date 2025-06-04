import "../styles.css";
import { useState } from "react";

{
  /*Building the hero tier list*/
}
interface Heroes {
  name: string;
  cost: number;
}

interface Tier {
  S: Heroes[];
  A: Heroes[];
  B: Heroes[];
  C: Heroes[];
  D: Heroes[];
}
const Hero: Heroes[] = [
  { name: "Akai", cost: 2 },
  { name: "Aldous", cost: 2 },
  { name: "Alpha", cost: 5 },
  { name: "Angela", cost: 2 },
  { name: "Argus", cost: 4 },
  { name: "Atlas", cost: 1 },
  { name: "Aurora", cost: 5 },
  { name: "Badang", cost: 1 },
  { name: "Balmond", cost: 2 },
  { name: "Chang'e", cost: 3 },
  { name: "Clint", cost: 3 },
  { name: "Cyclops", cost: 1 },
  { name: "Diggie", cost: 2 },
  { name: "Dyrroth", cost: 3 },
  { name: "Esmeralda", cost: 3 },
  { name: "Franco", cost: 5 },
  { name: "Freya", cost: 3 },
  { name: "Gord", cost: 4 },
  { name: "Granger", cost: 2 },
  { name: "Guinevere", cost: 4 },
  { name: "Gusion", cost: 2 },
  { name: "Hayabusa", cost: 4 },
  { name: "Helcurt", cost: 1 },
  { name: "Hylos", cost: 2 },
  { name: "Irithel", cost: 4 },
  { name: "Johnson", cost: 3 },
  { name: "Kagura", cost: 3 },
  { name: "Kaja", cost: 4 },
  { name: "Karina", cost: 3 },
  { name: "Layla", cost: 2 },
  { name: "Ling", cost: 4 },
  { name: "Lolita", cost: 1 },
  { name: "Lunox", cost: 4 },
  { name: "Luo Yi", cost: 2 },
  { name: "Martis", cost: 2 },
  { name: "Masha", cost: 2 },
  { name: "Minotaur", cost: 5 },
  { name: "Moskov", cost: 5 },
  { name: "Natan", cost: 5 },
  { name: "Nolan", cost: 4 },
  { name: "Odette", cost: 3 },
  { name: "Popol & Kupa", cost: 3 },
  { name: "Sun", cost: 5 },
  { name: "Suyou", cost: 2 },
  { name: "Terizla", cost: 4 },
  { name: "Thamuz", cost: 3 },
  { name: "Uranus", cost: 3 },
  { name: "Vale", cost: 1 },
  { name: "Vexana", cost: 4 },
  { name: "Wanwan", cost: 1 },
  { name: "Yu Zhong", cost: 5 },
  { name: "Yve", cost: 4 },
  { name: "Zhask", cost: 1 },
];

function HeroesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tier, setTier] = useState<Tier>({ S: [], A: [], B: [], C: [], D: [] });
  const [drag, setDrag] = useState<Heroes | null>(null);
  const [current, currentTier] = useState<string | null>(null);
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
