import "../styles.css";
import { useState } from "react";
import { Equipments, Equipment } from "./Types";

interface Tier {
  S: Equipments[];
  A: Equipments[];
  B: Equipments[];
  C: Equipments[];
  D: Equipments[];
}

function EquipmentsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tier, setTier] = useState<Tier>({ S: [], A: [], B: [], C: [], D: [] });
  const [drag, setDrag] = useState<Equipments | null>(null);
  const [current, currentTier] = useState<string | null>(null);
  const assignedEquipmentNames = Object.values(tier)
    .flat()
    .map((equipment: Equipments) => equipment.name);

  const filteredEquipments = Equipment.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !assignedEquipmentNames.includes(equipment.name)
  );

  const handleOnClick = (equipment: Equipments) => {
    setTier((prev) => ({
      ...prev,
      D: [...prev.D, equipment],
    }));
  };

  const handleOnClickRemove = (tier: string, equipmentToRemove: Equipments) => {
    setTier((prev) => ({
      ...prev,
      [tier]: prev[tier as keyof Tier].filter(
        (equipment: Equipments) => equipment.name !== equipmentToRemove.name
      ),
    }));
    setDrag(null);
  };

  const findTier = (equipment: Equipments, tier: Tier) => {
    for (const tierKey in tier) {
      if (
        tier[tierKey as keyof Tier].some(
          (e: Equipments) => e.name === equipment.name
        )
      ) {
        return tierKey;
      }
    }
    return null;
  };

  const handleOnDrop = (equipment: Equipments) => {
    const tierFound = findTier(equipment, tier);
    if (tierFound) {
      handleOnClickRemove(tierFound, equipment);
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
          {tier[letter as keyof Tier].map((equipment: Equipments, index) => (
            <img
              className="Equipment"
              key={equipment.name}
              src={`./Images/Equipments/${equipment.name}.png`}
              alt={equipment.name}
              onDragOver={(e) => e.preventDefault()}
              onDragStart={() => {
                setDrag(equipment);
                currentTier(letter);
              }}
              onDrop={(e) => handleOnDropped(e, index, letter)}
              onClick={() => handleOnClickRemove(letter, equipment)}
              onDragEnd={() => setDrag(null)}
              style={{
                opacity: drag === equipment ? 0.5 : 1,
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
        placeholder="Search equipments..."
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
        className="EquipmentsGallery"
      >
        {[
          "Physical",
          "Magic",
          "Defense",
          "Starter",
          "Special",
          "Magic Crystal",
        ].map((type) => (
          <div key={type}>
            {filteredEquipments
              .filter((equipment) => equipment.type === type)
              .map((equipment) => (
                <div key={equipment.name}>
                  <img
                    className="Equipment"
                    src={`./Images/Equipments/${equipment.name}.png`}
                    alt={equipment.name}
                    onClick={() => handleOnClick(equipment)}
                    onDragStart={() => setDrag(equipment)}
                    onDragEnd={() => setDrag(null)}
                    style={{
                      opacity: drag === equipment ? 0.5 : 1,
                    }}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default EquipmentsTable;
