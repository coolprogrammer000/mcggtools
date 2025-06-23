import "../styles.css";
import { useState } from "react";
import { Commanders, Commander } from "./Types";
function CommandersTable() {
  interface Tier {
    S: Commanders[];
    A: Commanders[];
    B: Commanders[];
    C: Commanders[];
    D: Commanders[];
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [tier, setTier] = useState<Tier>({ S: [], A: [], B: [], C: [], D: [] });
  const [drag, setDrag] = useState<Commanders | null>(null);
  const [current, currentTier] = useState<string | null>(null);

  const assignedCommanderNames = Object.values(tier)
    .flat()
    .map((commander: Commanders) => commander.name);

  const filteredCommanders = Commander.filter(
    (commander) =>
      commander.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assignedCommanderNames.includes(commander.name)
  );

  const handleOnClick = (commander: Commanders) => {
    setTier((prev) => ({
      ...prev,
      D: [...prev.D, commander],
    }));
  };

  const handleOnClickRemove = (tier: string, commanderToRemove: Commanders) => {
    setTier((prev) => ({
      ...prev,
      [tier]: prev[tier as keyof Tier].filter(
        (commander: Commanders) => commander.name !== commanderToRemove.name
      ),
    }));
    setDrag(null);
  };

  const findTier = (commander: Commanders, tier: Tier) => {
    for (const tierKey in tier) {
      if (
        tier[tierKey as keyof Tier].some(
          (c: Commanders) => c.name === commander.name
        )
      ) {
        return tierKey;
      }
    }
    return null;
  };

  const handleOnDrop = (commander: Commanders) => {
    const tierFound = findTier(commander, tier);
    if (tierFound) {
      handleOnClickRemove(tierFound, commander);
    }
  };

  const handleOnDropped = (
    e: React.DragEvent,
    index: number,
    letter: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (drag) {
      handleOnDrop(drag);
      setTier((prev) => {
        const newTier = { ...prev };
        const updatedArray = [...newTier[letter as keyof Tier]];
        updatedArray.splice(index, 0, drag);
        newTier[letter as keyof Tier] = updatedArray;
        return newTier;
      });
      setDrag(null);
    }
  };

  const renderRow = (letter: string) => {
    return (
      <tr
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => {
          if (current && drag) {
            handleOnClickRemove(current, drag);
          }
          if (drag) {
            setTier((prev) => ({
              ...prev,
              [letter]: [...prev[letter as keyof Tier], drag],
            }));
            currentTier(null);
            setDrag(null);
          }
        }}
      >
        <td className={`Label ${letter}`}>{letter}</td>
        <td className="empty">
          {tier[letter as keyof Tier].map((commander: Commanders, index) => (
            <img
              className="Commander"
              key={commander.name}
              src={`./Images/Commanders/${commander.name}.png`}
              alt={commander.name}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={() => {
                setDrag(commander);
                currentTier(letter);
              }}
              onDrop={(e) => handleOnDropped(e, index, letter)}
              onClick={() => handleOnClickRemove(letter, commander)}
              onDragEnd={() => setDrag(null)}
              style={{
                opacity: drag === commander ? 0.5 : 1,
              }}
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
            {["S", "A", "B", "C", "D"].map((tierLetter) =>
              renderRow(tierLetter)
            )}
          </tbody>
        </table>
      </div>

      <input
        type="text"
        placeholder="Search commanders..."
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
        className="CommandersGallery"
      >
        {filteredCommanders.map((commander) => (
          <div key={commander.name}>
            <img
              className="Commander"
              src={`./Images/Commanders/${commander.name}.png`}
              alt={commander.name}
              onClick={() => handleOnClick(commander)}
              onDragStart={() => setDrag(commander)}
              onDragEnd={() => setDrag(null)}
              style={{
                opacity: drag === commander ? 0.5 : 1,
              }}
            />
            <div>{commander.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommandersTable;
