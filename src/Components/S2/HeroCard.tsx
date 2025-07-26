import React from "react";
import { DetailedHero } from "../Types";

interface Props {
    hero: DetailedHero;
}
type StarLevel = "star_1" | "star_2" | "star_3";
const starLevels: StarLevel[] = ["star_1", "star_2", "star_3"];
function formatKey(key: string): string {
    return key
        .replace(/_/g, " ")             
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function injectScaling(description: string, scaling: {
  star_1: Record<string, number>;
  star_2: Record<string, number>;
  star_3: Record<string, number>;
}): string {
  return description.replace(/{(.*?)}/g, (_, key) => {
    const s1 = scaling.star_1[key];
    const s2 = scaling.star_2[key];
    const s3 = scaling.star_3[key];
    return `${s1}/${s2}/${s3}`;
  });
}

const HeroCard: React.FC<Props> = ({ hero }) => {

    return (
        <div className="hero-card">
            <img src={`./Images/Heroes/${hero.name}.png`} alt={hero.name} className="hero-image" />
            <div className="hero-header">
                <div className="hero-name">{hero.name}</div>
                <div className="hero-cost">{hero.cost}</div>
            </div>
            <div className="hero-tags">
                <span>{hero.faction}</span>
                {hero.role.map((r) => (
                    <span key={r}>{r}</span>
                ))}
            </div>
            <div className="hero-skill">
                <strong>{hero.skill.name}</strong>
                <p>{injectScaling(hero.skill.description, hero.skill.scaling)}</p>
            </div>
            <div className="hero-scaling">
                <ul className="scaling-list">
                    {Object.keys(hero.skill.scaling.star_1).map((field) => {
                        const s1 = hero.skill.scaling.star_1[field as keyof typeof hero.skill.scaling.star_1];
                        const s2 = hero.skill.scaling.star_2[field as keyof typeof hero.skill.scaling.star_2];
                        const s3 = hero.skill.scaling.star_3[field as keyof typeof hero.skill.scaling.star_3];
                        return (
                            <li key={field}>
                                {formatKey(field)}: {s1}/{s2}/{s3}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HeroCard;