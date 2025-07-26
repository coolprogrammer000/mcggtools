import React, { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import { DetailedHero } from "../Types"; // adjust the path if needed

const HeroGrid: React.FC = () => {
  const [heroes, setHeroes] = useState<DetailedHero[]>([]);

  useEffect(() => {
    fetch("/data/heroes.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch hero data.");
        return res.json();
      })
      .then((data) => setHeroes(data))
      .catch((err) => console.error("Error loading heroes:", err));
  }, []);
  const sortedHeroes = [...heroes].sort((a, b) => {
    if (a.cost !== b.cost) {
      return b.cost - a.cost;
    }
    return a.name.localeCompare(b.name);
  });
  return (
    <div className="hero-grid">
      {sortedHeroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
};

export default HeroGrid;