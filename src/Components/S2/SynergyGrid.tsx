import React, { useEffect, useState } from "react";
import SynergyCard from "./SynergyCard";

interface Hero {
  name: string;
  faction: string;
  role: string[];
  cost: number;
}

interface Synergy {
  id: string;
  name: string;
  description: string;
  tiers: {
    [tier: string]: {
      [effectKey: string]: number | string;
    };
  };
}

const SynergyGrid: React.FC = () => {
  const [synergies, setSynergies] = useState<Synergy[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    fetch("./data/synergies.json")
      .then((res) => res.json())
      .then((data) => setSynergies(data));
    fetch("./data/heroes.json")
        .then((res) => res.json())
        .then(setHeroes);
    }, []);

  return (
    <div className="synergy-grid">
      {synergies.map((synergy) => (
        <SynergyCard key={synergy.id} synergy={synergy} allHeroes={heroes} />
      ))}
    </div>
  );
};

export default SynergyGrid;