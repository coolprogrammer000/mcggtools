import React from "react";

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

interface Hero {
  name: string;
  faction: string;
  role: string[];
  cost: number;
}

interface Props {
  synergy: Synergy;
  allHeroes: Hero[];
}

const SynergyCard: React.FC<Props> = ({ synergy, allHeroes }) => {
    const matchingHeroes = allHeroes
        .filter(
            (hero) =>
                hero.faction === synergy.name ||
                hero.role.includes(synergy.name)
        )
        .sort((a, b) => {
            if (a.cost !== b.cost) return a.cost - b.cost;
            return a.name.localeCompare(b.name);
        });
    return (
        <div className="synergy-card">
            <div className="synergy-header">
                <img
                    src={`./Images/Synergies/${synergy.name}.png`}
                    alt={synergy.name}
                    className="synergy-icon"
                />
                <h3>{synergy.name}</h3>
            </div>

            <p className="synergy-description">{synergy.description}</p>

            <div className="synergy-tiers">
                {Object.entries(synergy.tiers).map(([tier, effects]) => (
                    <div key={tier} className="tier-effect">
                        <strong>({tier})</strong>{" "}
                        {Object.values(effects)
                            .map((value) => value.toString())
                            .join("; ")}
                    </div>
                ))}
            </div>
            <div className="synergy-heroes">
                {matchingHeroes.map((hero) => (
                    <img
                        key={hero.name}
                        src={`./Images/Heroes/${hero.name}.png`}
                        alt={hero.name}
                        className="synergy-hero-img"
                    />
                ))}
            </div>
        </div>
);

};

export default SynergyCard;