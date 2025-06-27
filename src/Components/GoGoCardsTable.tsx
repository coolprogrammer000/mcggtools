import "../styles.css";
import { useState } from "react";
import { Cards, Card } from "./Types";

interface Tier {
  S: Cards[];
  A: Cards[];
  B: Cards[];
  C: Cards[];
  D: Cards[];
}

function GoGoCardsTable() {

  const [searchTerm, setSearchTerm] = useState("");
  const [tier, setTier] = useState<Tier>({ S: [], A: [], B: [], C: [], D: [] });
  const [drag, setDrag] = useState<Cards | null>(null);
  const [current, currentTier] = useState<string | null>(null);

  const assignedCardNames = Object.values(tier)
    .flat()
    .map((card: Cards) => card.name);

  const normalize = (str: string) => str.toLowerCase().replace(/ +/g, "");

  const filteredCards = Card.filter(
    (card) =>
      normalize(card.name).includes(normalize(searchTerm)) &&
      !assignedCardNames.includes(card.name)
  );

  const handleOnClick = (card: Cards) => {
    setTier((prev) => ({
      ...prev,
      D: [...prev.D, card],
    }));
  };

  const handleOnClickRemove = (tier: string, cardToRemove: Cards) => {
    setTier((prev) => ({
      ...prev,
      [tier]: prev[tier as keyof Tier].filter(
        (card: Cards) => card.name !== cardToRemove.name
      ),
    }));
    setDrag(null);
  };

  const findTier = (card: Cards, tier: Tier) => {
    for (const tierKey in tier) {
      if (
        tier[tierKey as keyof Tier].some((c: Cards) => c.name === card.name)
      ) {
        return tierKey;
      }
    }
    return null;
  };

  const handleOnDrop = (card: Cards) => {
    const tierFound = findTier(card, tier);
    if (tierFound) {
      handleOnClickRemove(tierFound, card);
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
          {tier[letter as keyof Tier].map((card: Cards, index) => (
            <img
              className="CardinTable"
              key={card.name}
              src={`./Images/Go Go Cards/${card.name}.png`}
              alt={card.name}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={() => {
                setDrag(card);
                currentTier(letter);
              }}
              onDrop={(e) => handleOnDropped(e, index, letter)}
              onClick={() => handleOnClickRemove(letter, card)}
              onDragEnd={() => setDrag(null)}
              style={{
                opacity: drag === card ? 0.5 : 1,
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
        placeholder="Search cards..."
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
        className="CardsGallery"
      >
        {filteredCards.map((card) => (
          <div key={card.name}>
            <img
              className="Card"
              src={`./Images/Go Go Cards/${card.name}.png`}
              alt={card.name}
              onClick={() => handleOnClick(card)}
              onDragStart={() => setDrag(card)}
              onDragEnd={() => setDrag(null)}
              style={{
                opacity: drag === card ? 0.5 : 1,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
export default GoGoCardsTable;
