import "../styles.css";
import { useState } from "react";

{
  /*Building the hero tier list*/
}
interface Heroes {
  name: string;
}

interface Tier {
  S: Heroes[];
  A: Heroes[];
  B: Heroes[];
  C: Heroes[];
  D: Heroes[];
}
const Hero: Heroes[] = [
  { name: "Akai" },
  { name: "Aldous" },
  { name: "Alpha" },
  { name: "Angela" },
  { name: "Argus" },
  { name: "Atlas" },
  { name: "Aurora" },
  { name: "Badang" },
  { name: "Balmond" },
  { name: "Chang'e" },
  { name: "Clint" },
  { name: "Cyclops" },
  { name: "Diggie" },
  { name: "Dyrroth" },
  { name: "Esmeralda" },
  { name: "Franco" },
  { name: "Freya" },
  { name: "Gord" },
  { name: "Granger" },
  { name: "Guinevere" },
  { name: "Gusion" },
  { name: "Hayabusa" },
  { name: "Helcurt" },
  { name: "Hylos" },
  { name: "Irithel" },
  { name: "Johnson" },
  { name: "Kagura" },
  { name: "Kaja" },
  { name: "Karina" },
  { name: "Layla" },
  { name: "Ling" },
  { name: "Lolita" },
  { name: "Lunox" },
  { name: "Luo Yi" },
  { name: "Martis" },
  { name: "Masha" },
  { name: "Minotaur" },
  { name: "Moskov" },
  { name: "Natan" },
  { name: "Nolan"},
  { name: "Odette" },
  { name: "Popol & Kupa" },
  { name: "Sun" },
  { name: "Suyou" },
  { name: "Terizla" },
  { name: "Thamuz" },
  { name: "Uranus" },
  { name: "Vale" },
  { name: "Vexana" },
  { name: "Wanwan" },
  { name: "Yu Zhong" },
  { name: "Yve" },
  { name: "Zhask" },
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
        {filteredHeroes.map((Champ) => (
          <div>
            <img
              key={Champ.name}
              src={`./Images/Heroes/${Champ.name}.png`}
              alt={Champ.name}
              onClick={() => handleOnClick(Champ)}
              onDragStart={() => setDrag(Champ)}
            />
            <div>{Champ.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}
export default HeroesTable;
