import "../styles.css";
import { useState, useEffect } from "react";
import { Commanders, Commander } from "./Types";
import { Cards, Card } from "./Types";
import { Heroes, Hero } from "./Types";
import { Equipments, Equipment } from "./Types";
import { Synergies, Synergy } from "./Types";

interface Synergynumber {
  [key: string]: number;
}

function TeamBuilder() {
  const [press, setPress] = useState("");
  const [drag, setDrag] = useState<Heroes | null>(null);
  const [Index, setIndex] = useState<number | null>(null);
  const [hasDropped, setHasDropped] = useState(false);
  const [isHerofromGallery, setHerofromGallery] = useState(false);
  const [SwapHero, setSwapHero] = useState<Heroes | null>(null);
  const [oneEquipmentDrag, setOneEquipmentDrag] = useState<Equipments | null>(
    null
  );
  const [draggedHeroEquipments, setDraggedHeroEquipments] = useState<
    Equipments[] | null
  >([]);
  const [swapDraggedHeroEquipments, setSwapDraggedHeroEquipments] = useState<
    Equipments[] | null
  >([]);
  const [equipmentdrag, setEquipmentDrag] = useState<Equipments | null>(null);
  const [equipmentSearchTerm, setEquipmentSearchTerm] = useState("");
  const [heroSearchTerm, setHeroSearchTerm] = useState("");
  const [synergyNumber, setSynergyNumber] = useState<Synergynumber>({
    "Astro Power": 0,
    Bruiser: 0,
    Dauntless: 0,
    Dawnbringer: 0,
    Defender: 0,
    Doomsworn: 0,
    "Dragon Altar": 0,
    Emberlord: 0,
    Eruditio: 0,
    Exorcist: 0,
    Faeborn: 0,
    Mage: 0,
    Marksman: 0,
    "Northern Vale": 0,
    Shadeweaver: 0,
    Stargazer: 0,
    Summoner: 0,
    Support: 0,
    Swordsman: 0,
    "Weapon Master": 0,
  });

  const [boxHero, setBoxHero] = useState<(Heroes | null)[]>(
    Array(21).fill(null)
  );
  const [heroEquipments, setHeroEquipments] = useState<{
    [key: string]: Equipments[];
  }>({});
  const [synergySelected, setSynergySelected] = useState<string>("A");
  const [cardSelected, setCardSelected] = useState<string[]>([]);
  const [commanderSelected, setCommanderSelected] = useState<string[]>([]);
  const row = Array.from({ length: 3 }, (_, rowIndex) => rowIndex);
  const length = Array.from({ length: 7 }, (_, lengthIndex) => lengthIndex);
  const areAllZero = Object.values(synergyNumber).every((value) => value === 0);
  const filteredHeroes = Hero.filter((champ) =>
    champ.name.toLowerCase().includes(heroSearchTerm.toLowerCase())
  );
  const filteredEquipments = Equipment.filter((equipment) =>
    equipment.name.toLowerCase().includes(equipmentSearchTerm.toLowerCase())
  );
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
  const handleOnClick = (hero: Heroes) => {
    setDrag((prev) => {
      return hero;
    });
    addHerotoTable(boxHero.findIndex((champ) => champ === null));
  };
  const addHerotoTable = (index: number) => {
    console.log("addHerotoTable called");
    setBoxHero((prev) => {
      const updated = [...prev];
      updated[index] = drag;
      return updated;
    });

    if (
      drag &&
      (!heroEquipments[`${drag.name}-${index}`] ||
        (SwapHero === drag && !equipmentdrag))
    ) {
      setHeroEquipments((prev) => ({
        ...prev,
        [`${drag.name}-${index}`]: draggedHeroEquipments || [],
      }));
    }
    setDraggedHeroEquipments(null);
  };
  const handleOnDropEquipment = (Index: number) => {
    if (equipmentdrag && drag) {
      setHeroEquipments((prev) => {
        const heroKey = `${drag.name}-${Index}`;
        const currentHeroEquipments = prev[heroKey] ? [...prev[heroKey]] : [];
        const existingMagicCrystals = currentHeroEquipments.filter(
          (equipment) => equipment.type === "Magic Crystal"
        );
        const existingNonMagicCrystals = currentHeroEquipments.filter(
          (equipment) => equipment.type !== "Magic Crystal"
        );
        if (
          (equipmentdrag.type === "Magic Crystal" &&
            existingMagicCrystals.length < 1) ||
          (equipmentdrag.type !== "Magic Crystal" &&
            existingNonMagicCrystals.length < 3)
        ) {
          currentHeroEquipments.push(equipmentdrag);
        }

        return {
          ...prev,
          [heroKey]: currentHeroEquipments,
        };
      });
    }
    if (oneEquipmentDrag && drag) {
      setHeroEquipments((prev) => {
        const heroKey = `${drag.name}-${Index}`;
        const currentHeroEquipments = prev[heroKey] ? [...prev[heroKey]] : [];
        const existingMagicCrystals = currentHeroEquipments.filter(
          (equipment) => equipment.type === "Magic Crystal"
        );
        const existingNonMagicCrystals = currentHeroEquipments.filter(
          (equipment) => equipment.type !== "Magic Crystal"
        );

        if (
          (oneEquipmentDrag.type === "Magic Crystal" &&
            existingMagicCrystals.length < 1) ||
          (oneEquipmentDrag.type !== "Magic Crystal" &&
            existingNonMagicCrystals.length < 3)
        ) {
          currentHeroEquipments.push(oneEquipmentDrag);
        }

        return {
          ...prev,
          [heroKey]: currentHeroEquipments,
        };
      });
    }
  };
  const removeHerofromTable = (index: number) => {
    console.log("removeHerofromTable called");
    const updated = [...boxHero];
    updated[index] = null;
    removeEquipmentfromTable(index);
    setBoxHero(updated);
  };
  const handleOnClickOneEquipment = (index: number, equipment: Equipments) => {
    const hero = boxHero[index];
    if (hero !== null && equipment) {
      setHeroEquipments((prev) => {
        const updatedEquipments = { ...prev };
        const heroKey = `${hero.name}-${index}`;
        const equipmentList = updatedEquipments[heroKey]
          ? [...updatedEquipments[heroKey]]
          : [];

        let removed = false;
        const newHeroEquipments = equipmentList.filter((oldequipment) => {
          if (!removed && oldequipment.name === equipment.name) {
            removed = true;
            return false;
          }
          return true;
        });
        updatedEquipments[heroKey] = newHeroEquipments;
        return updatedEquipments;
      });
    }
  };

  const removeOneEquipmentfromTable = (index: number) => {
    const hero = boxHero[index];

    if (!SwapHero || !oneEquipmentDrag || !swapDraggedHeroEquipments) {
      return;
    }
    const targetHeroEquipments = swapDraggedHeroEquipments;
    const existingMagicCrystalsAtTarget = targetHeroEquipments.filter(
      (equipment) => equipment.type === "Magic Crystal"
    );
    const existingNonMagicCrystalsAtTarget = targetHeroEquipments.filter(
      (equipment) => equipment.type !== "Magic Crystal"
    );
    if (
      (oneEquipmentDrag.type !== "Magic Crystal" &&
        existingNonMagicCrystalsAtTarget.length < 3) ||
      (oneEquipmentDrag.type === "Magic Crystal" &&
        existingMagicCrystalsAtTarget.length < 1) ||
      Index == null
    ) {
      if (hero !== null) {
        setHeroEquipments((prev) => {
          const updatedEquipments = { ...prev };
          const heroKey = `${hero.name}-${index}`;
          const equipmentList = updatedEquipments[heroKey]
            ? [...updatedEquipments[heroKey]]
            : [];

          let removed = false;
          const newHeroEquipments = equipmentList.filter((equipment) => {
            if (!removed && equipment.name === oneEquipmentDrag.name) {
              removed = true;
              return false;
            }
            return true;
          });
          updatedEquipments[heroKey] = newHeroEquipments;
          return updatedEquipments;
        });
      }
    }
  };

  const removeEquipmentfromTable = (index: number) => {
    console.log("removeEquipmentfromTable called");
    const hero = boxHero[index];
    if (hero !== null) {
      setHeroEquipments((prev) => {
        const updatedEquipments = { ...prev };
        const heroKey = `${hero.name}-${index}`;
        delete updatedEquipments[heroKey];
        return updatedEquipments;
      });
    }
  };

  const swapHeroinTable = (index: number) => {
    console.log("swapHeroinTable called");
    setBoxHero((prev) => {
      const updated = [...prev];
      if (Index !== null) {
        updated[index] = SwapHero;
      }
      return updated;
    });
    setHeroEquipments((prev) => {
      const updatedEquipments = { ...prev };

      if (drag && SwapHero) {
        const swapHeroKey = `${SwapHero.name}-${Index}`;
        if (updatedEquipments[swapHeroKey] && SwapHero !== drag) {
          delete updatedEquipments[swapHeroKey];
        }
        const swapHeroKeyNew = `${SwapHero.name}-${index}`;
        updatedEquipments[swapHeroKeyNew] = swapDraggedHeroEquipments || [];
      }

      return updatedEquipments;
    });
    setSwapDraggedHeroEquipments(null);
  };

  const updateSynergyCount = () => {
    const uniqueHeroes = new Set<string>();
    const newSynergyCount: Synergynumber = {
      "Astro Power": 0,
      Bruiser: 0,
      Dauntless: 0,
      Dawnbringer: 0,
      Defender: 0,
      Doomsworn: 0,
      "Dragon Altar": 0,
      Emberlord: 0,
      Eruditio: 0,
      Exorcist: 0,
      Faeborn: 0,
      Mage: 0,
      Marksman: 0,
      "Northern Vale": 0,
      Shadeweaver: 0,
      Stargazer: 0,
      Summoner: 0,
      Support: 0,
      Swordsman: 0,
      "Weapon Master": 0,
    };

    boxHero.forEach((hero, index) => {
      if (hero) {
        if (!uniqueHeroes.has(hero.name)) {
          uniqueHeroes.add(hero.name);
          const synergies = hero.synergy.split(",").map((s) => s.trim());
          synergies.forEach((synergy) => {
            if (synergy in newSynergyCount) {
              newSynergyCount[synergy as keyof Synergynumber]++;
            }
          });
        }

        const heroKey = `${hero.name}-${index}`;
        const equippedItems = heroEquipments[heroKey] || [];

        equippedItems.forEach((equipment) => {
          if (equipment.type === "Magic Crystal" && equipment.synergy) {
            const magicCrystalSynergies = equipment.synergy
              .split(",")
              .map((s) => s.trim());
            magicCrystalSynergies.forEach((synergy) => {
              if (synergy in newSynergyCount) {
                newSynergyCount[synergy as keyof Synergynumber]++;
              }
            });
          }
        });
      }
    });

    setSynergyNumber(newSynergyCount);
  };
  useEffect(() => {
    updateSynergyCount();
  }, [boxHero, heroEquipments]);
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
                    .sort(([keyA, valueA], [keyB, valueB]) => {
                      const numValueA = Number(valueA);
                      const numValueB = Number(valueB);
                      return numValueB - numValueA;
                    })
                    .map(([key, value]) => {
                      const synergyData = Synergy.find((s) => s.name === key);
                      const breakpoints = synergyData
                        ? synergyData.breakpoints
                        : [];
                      return (
                        <div className="Synergyrow" key={key}>
                          <img
                            className="Synergy"
                            src={`./Images/Synergies/${key}.png`}
                            alt={key}
                          />
                          <div className="SynergyInfoLine">
                            {key}: {value}{" "}
                            {breakpoints.length > 0 && (
                              <div className="SynergyBreakpoints">
                                <div>(</div>
                                {breakpoints.map((bp, bpIndex) => (
                                  <div
                                    key={bpIndex}
                                    className={
                                      value >= bp ? "active-breakpoint" : ""
                                    }
                                  >
                                    {bp}
                                    {bpIndex < breakpoints.length - 1 && "/"}
                                  </div>
                                ))}
                                <div>)</div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIndex(index);
                          setSwapHero(boxHero[index]);
                          hero &&
                            setSwapDraggedHeroEquipments(
                              heroEquipments[`${hero.name}-${index}`] || []
                            );
                          equipmentdrag && setDrag(hero);
                          oneEquipmentDrag && setDrag(hero);
                        }}
                        onDrop={() => {
                          isHerofromGallery && removeHerofromTable(index);
                          !oneEquipmentDrag && drag && addHerotoTable(index);
                          handleOnDropEquipment(index);
                          setHasDropped(true);
                        }}
                        onDragEnd={() => {
                          (Index !== index || Index !== null) &&
                            hasDropped &&
                            SwapHero !== drag &&
                            !oneEquipmentDrag &&
                            removeHerofromTable(index);
                          hasDropped &&
                            Index !== index &&
                            Index !== null &&
                            !oneEquipmentDrag &&
                            swapHeroinTable(index);
                          !oneEquipmentDrag &&
                            Index == null &&
                            removeHerofromTable(index);
                          setDraggedHeroEquipments(null);
                          setIndex(null);
                          setDrag(null);
                          setHasDropped(false);
                        }}
                      >
                        {hero && (
                          <>
                            <div className="imageContainer">
                              <img
                                className="HeroesinTable"
                                src={`./Images/Heroes/${hero.name}.png`}
                                alt={hero.name}
                                onDragStart={() => {
                                  setDrag(hero);
                                  hero &&
                                    setDraggedHeroEquipments(
                                      heroEquipments[`${hero.name}-${index}`] ||
                                        []
                                    );
                                }}
                                onClick={() => {
                                  removeHerofromTable(index);
                                }}
                              />
                              <div className="MagicEquipmentsWrapper">
                                {heroEquipments[`${hero.name}-${index}`]
                                  ?.filter(
                                    (equipment) =>
                                      equipment.type == "Magic Crystal"
                                  )
                                  .map((equipment, equipmentIndex) => (
                                    <img
                                      key={`magic-crystal-${equipmentIndex}`}
                                      className="EquipmentinTable"
                                      src={`./Images/Equipments/${equipment.name}.png`}
                                      alt={equipment.name}
                                      onClick={() =>
                                        handleOnClickOneEquipment(
                                          index,
                                          equipment
                                        )
                                      }
                                      onDragStart={() => {
                                        setOneEquipmentDrag(equipment);
                                      }}
                                      onDragEnd={() => {
                                        Index == null &&
                                          handleOnClickOneEquipment(
                                            index,
                                            equipment
                                          );
                                        removeOneEquipmentfromTable(index);
                                        setOneEquipmentDrag(null);
                                      }}
                                    />
                                  ))}
                              </div>
                              <div className="EquipmentsWrapper">
                                {heroEquipments[`${hero.name}-${index}`]
                                  ?.filter(
                                    (equipment) =>
                                      equipment.type !== "Magic Crystal"
                                  )
                                  .map((equipment, equipmentIndex) => (
                                    <img
                                      key={equipmentIndex}
                                      className="EquipmentinTable"
                                      src={`./Images/Equipments/${equipment.name}.png`}
                                      alt={equipment.name}
                                      onClick={() =>
                                        handleOnClickOneEquipment(
                                          index,
                                          equipment
                                        )
                                      }
                                      onDragStart={() => {
                                        setOneEquipmentDrag(equipment);
                                      }}
                                      onDragEnd={() => {
                                        Index == null &&
                                          handleOnClickOneEquipment(
                                            index,
                                            equipment
                                          );
                                        removeOneEquipmentfromTable(index);
                                        setOneEquipmentDrag(null);
                                      }}
                                    />
                                  ))}
                              </div>
                            </div>
                          </>
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
              <button
                onClick={() =>
                  cardSelected.length < 3 && setPress("Go Go Cards")
                }
              >
                +
              </button>
            </tr>
            <tr className="AdditionalTableRowCard">
              {cardSelected.map((Card: string, index) => (
                <img
                  className="GoGoCardinTable"
                  key={`${Card}+${index}`}
                  src={`./Images/Go Go Cards/${Card}.png`}
                  alt={Card}
                  onClick={() => handleOnClickCardRemove(index)}
                />
              ))}
            </tr>
            <tr className="AdditionalTableCommanderRow">
              {" "}
              Commanders{" "}
              <button
                onClick={() =>
                  commanderSelected.length < 3 && setPress("Commander")
                }
              >
                +
              </button>
            </tr>
            <tr className="AdditionalTableRowCommander">
              {commanderSelected.map((Commander: string, index) => (
                <img
                  className="CommanderinTable"
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
          <div className="CloseButton">
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
        <div className="HeroBox " onDragOver={() => setIndex(null)}>
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
                onClick={() => {
                  synergySelected === Synergy.name
                    ? setSynergySelected("A")
                    : setSynergySelected(Synergy.name);
                }}
                style={{
                  opacity:
                    synergySelected === "A" || synergySelected === Synergy.name
                      ? 1
                      : 0.2,
                }}
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
                      onMouseEnter={() => {
                        setDrag(Champ);
                      }}
                      onMouseLeave={() => setDrag(null)}
                      onClick={() => {
                        handleOnClick(Champ);
                      }}
                      onDragStart={() => {
                        setDrag(Champ);
                        setHerofromGallery(true);
                      }}
                      onDragEnd={() => {
                        setDrag(null);
                        setHerofromGallery(false);
                      }}
                      style={{
                        opacity:
                          synergySelected === "A" ||
                          Champ.synergy
                            .split(",")
                            .some(
                              (synergy) => synergy.trim() === synergySelected
                            )
                            ? 1
                            : 0.2,
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
                      onMouseEnter={() => setEquipmentDrag(equipment)}
                      onMouseLeave={() => setEquipmentDrag(null)}
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
