import "../styles.css";
import { useState, useEffect } from "react";
import { Commanders, Commander } from "./Types";
import { Cards, Card } from "./Types";
import { Heroes, Hero } from "./Types";
import { Equipments, Equipment } from "./Types";
import { Synergies, Synergy } from "./Types";

interface Synergynumber {
  AstroPower: number;
  Bruiser: number;
  Dauntless: number;
  Dawnbringer: number;
  Defender: number;
  Doomsworn: number;
  DragonAltar: number;
  Emberlord: number;
  Eruditio: number;
  Exorcist: number;
  Faeborn: number;
  Mage: number;
  Marksman: number;
  NorthernVale: number;
  Shadeweaver: number;
  Stargazer: number;
  Summoner: number;
  Support: number;
  Swordsman: number;
  WeaponMaster: number;
}

function TeamBuilder() {
  const [press, setPress] = useState("");
  const [drag, setDrag] = useState<Heroes | null>(null);
  const [equipmentdrag, setEquipmentDrag] = useState<Equipments | null>(null);
  const [equipmentSearchTerm, setEquipmentSearchTerm] = useState("");
  const [heroSearchTerm, setHeroSearchTerm] = useState("");
  const [synergyNumber, setSynergyNumber] = useState<Synergynumber>({
    AstroPower: 0,
    Bruiser: 0,
    Dauntless: 0,
    Dawnbringer: 0,
    Defender: 0,
    Doomsworn: 0,
    DragonAltar: 0,
    Emberlord: 0,
    Eruditio: 0,
    Exorcist: 0,
    Faeborn: 0,
    Mage: 0,
    Marksman: 0,
    NorthernVale: 0,
    Shadeweaver: 0,
    Stargazer: 0,
    Summoner: 0,
    Support: 0,
    Swordsman: 0,
    WeaponMaster: 0,
  });

  const [boxHero, setBoxHero] = useState<(Heroes | null)[]>(
    Array(21).fill(null)
  );
  const [synergySelected, setSynergySelected] = useState<Synergies | null>();
  const [cardSelected, setCardSelected] = useState<string[]>([]);
  const [commanderSelected, setCommanderSelected] = useState<string[]>([]);
  const areAllZero = Object.values(synergyNumber).every((value) => value === 0);
  const row = Array.from({ length: 3 }, (_, rowIndex) => rowIndex);
  const length = Array.from({ length: 7 }, (_, lengthIndex) => lengthIndex);
  const filteredHeroes = Hero.filter((champ) =>
    champ.name.toLowerCase().includes(heroSearchTerm.toLowerCase())
  );
  const filteredEquipments = Equipment.filter((equipment) =>
    equipment.name.toLowerCase().includes(equipmentSearchTerm.toLowerCase())
  );
  const handleOnClick = () => {};
  const handleOnClickCard = (card: string) => {
    setCardSelected([...cardSelected, card]);
  };
  const handleOnClickCardRemove = (index: number) => {
    const updated = [...cardSelected];
    updated.splice(index, 1);
    setCardSelected(updated);
  };
  const handleOnClickCommander = (commander: string) => {
    setCommanderSelected([...commanderSelected, commander]);
  };
  const handleOnClickCommanderRemove = (index: number) => {
    const updated = [...commanderSelected];
    updated.splice(index, 1);
    setCommanderSelected(updated);
  };
  const addHerotoTable = (index: number) => {
    const updated = [...boxHero];
    updated[index] = drag;
    setBoxHero(updated);
  };
  const removeHerofromTable = (index: number) => {
    const updated = [...boxHero];
    updated[index] = null;
    setBoxHero(updated);
  };
  const updateSynergyCount = () => {
    const uniqueHeroes = new Set<string>();
    const newSynergyCount: Synergynumber = {
      AstroPower: 0,
      Bruiser: 0,
      Dauntless: 0,
      Dawnbringer: 0,
      Defender: 0,
      Doomsworn: 0,
      DragonAltar: 0,
      Emberlord: 0,
      Eruditio: 0,
      Exorcist: 0,
      Faeborn: 0,
      Mage: 0,
      Marksman: 0,
      NorthernVale: 0,
      Shadeweaver: 0,
      Stargazer: 0,
      Summoner: 0,
      Support: 0,
      Swordsman: 0,
      WeaponMaster: 0,
    };

    boxHero.forEach((hero) => {
      if (hero && !uniqueHeroes.has(hero.name)) {
        uniqueHeroes.add(hero.name);
        const synergies = hero.synergy.split(",").map((s) => s.trim());
        synergies.forEach((synergy) => {
          if (synergy in newSynergyCount) {
            newSynergyCount[synergy as keyof Synergynumber]++;
          }
        });
      }
    });

    setSynergyNumber(newSynergyCount);
  };
  useEffect(() => {
    updateSynergyCount();
  }, [boxHero]);
  return (
    <>
      <div>
        <div className="TeamBuilderTable">
          <div className="SynergyWrapper">
            <table className="SynergyTable">
              {areAllZero && (
                <tr>
                  <th>Synergies</th>
                </tr>
              )}
              <tr>
                <td>
                  {" "}
                  {Object.entries(synergyNumber)
                    .filter(([_, value]) => value !== 0)
                    .map(([key, value]) => (
                      <>
                        <div className="Synergyrow">
                          <img
                            className="Synergy"
                            src={`./Images/Synergies/${key}.png`}
                            alt={key}
                          />
                          <td> </td>
                          <div key={key}>
                            {key}: {value}
                          </div>
                        </div>
                      </>
                    ))}
                </td>
              </tr>
            </table>
          </div>
          <table className="BoxTable">
            <tbody>
              {row.map((rowIndex) => (
                <tr key={rowIndex}>
                  {length.map((lengthIndex) => {
                    const index = rowIndex * 7 + lengthIndex;
                    const hero = boxHero[index];

                    return (
                      <td
                        key={lengthIndex}
                        className="Box"
                        onDragStart={() => setDrag(hero)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          addHerotoTable(index);
                        }}
                        onDragEnd={() => {
                          setDrag(null);
                          removeHerofromTable(index);
                        }}
                      >
                        {hero && (
                          <img
                            className="Heroes"
                            src={`./Images/Heroes/${hero.name}.png`}
                            alt={hero.name}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="AdditionalTable">
            <tr className="AdditionalTableRow">
              Go Go Cards{" "}
              <button onClick={() => setPress("Go Go Cards")}>+</button>
            </tr>
            <tr>
              {cardSelected.map((Card: string, index) => (
                <img
                  className="GoGoCard"
                  key={`${Card}+${index}`}
                  src={`./Images/Go Go Cards/${Card}.png`}
                  alt={Card}
                  onClick={() => handleOnClickCardRemove(index)}
                />
              ))}
            </tr>
            <tr className="AdditionalTableRow">
              {" "}
              Commanders{" "}
              <button onClick={() => setPress("Commander")}>+</button>
            </tr>
            <tr>
              {commanderSelected.map((Commander: string, index) => (
                <img
                  className="Commander"
                  key={`${Commander}+${index}`}
                  src={`./Images/Commanders/${Commander}.png`}
                  alt={Commander}
                  onClick={() => handleOnClickCommanderRemove(index)}
                />
              ))}
            </tr>
          </table>
        </div>
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
                  src={`./Images/Commanders/${Commander.name}.png`}
                  alt={Commander.name}
                  onClick={() => {
                    setPress("");
                    handleOnClickCommander(Commander.name);
                  }}
                />
              ))}
            {press === "Go Go Cards" &&
              Card.map((Card: Cards) => (
                <img
                  className="GoGoCard"
                  key={Card.name}
                  src={`./Images/Go Go Cards/${Card.name}.png`}
                  alt={Card.name}
                  onClick={() => {
                    setPress("");
                    handleOnClickCard(Card.name);
                  }}
                />
              ))}
          </div>
        </div>
      )}
      <div className="WholeBox">
        <div className="HeroBox">
          <div>
            <input
              type="text"
              placeholder="Search heroes..."
              value={heroSearchTerm}
              onChange={(e) => setHeroSearchTerm(e.target.value)}
            />
            {Synergy.map((Synergy: Synergies) => (
              <img
                className="Synergy"
                key={Synergy.name}
                src={`./Images/Synergies/${Synergy.name}.png`}
                alt={Synergy.name}
              />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((cost) => (
            <div key={cost}>
              {filteredHeroes
                .filter((Champ) => Champ.cost === cost)
                .map((Champ) => (
                  <div key={Champ.name}>
                    <img
                      className="Heroes"
                      src={`./Images/Heroes/${Champ.name}.png`}
                      alt={Champ.name}
                      onClick={() => handleOnClick()}
                      onDragStart={() => setDrag(Champ)}
                      onDragEnd={() => {
                        setDrag(null);
                      }}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="EquipmentBox">
          <div>
            <input
              type="text"
              placeholder="Search equipments..."
              value={equipmentSearchTerm}
              onChange={(e) => setEquipmentSearchTerm(e.target.value)}
            />
          </div>
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
                      onClick={() => handleOnClick()}
                      onDragStart={() => setEquipmentDrag(equipment)}
                      onDragEnd={() => setEquipmentDrag(null)}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default TeamBuilder;
