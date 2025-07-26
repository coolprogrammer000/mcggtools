import React, { useEffect, useState } from "react";
import "../../styles.css"; // Adjust path if needed

type Hero = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    cost: number;
    faction: string;
    role: string[];
    skill: {
        name: string;
        description: string;
        scaling: {
            star_1: {
                physical_bonus: number;
                passive_bonus: number;
                restore_bonus: number;
            };
            star_2: {
                physical_bonus: number;
                passive_bonus: number;
                restore_bonus: number;
            };
            star_3: {
                physical_bonus: number;
                passive_bonus: number;
                restore_bonus: number;
            };
        };
    };
    attributes: {
        star_1: {
            hp: number;
            physical_atk: number;
            magic_atk: number;
            atk_speed: number;
            atk_range: number;
            initial_mana: number;
            mana_cap: number;
        };
        star_2: {
            hp: number;
            physical_atk: number;
            magic_atk: number;
            atk_speed: number;
            atk_range: number;
            initial_mana: number;
            mana_cap: number;
        };
        star_3: {
            hp: number;
            physical_atk: number;
            magic_atk: number;
            atk_speed: number;
            atk_range: number;
            initial_mana: number;
            mana_cap: number;
        };
    };
};

function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
}

const Heroes: React.FC = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);

    useEffect(() => {
        fetch("./data/heroes.json")
            .then((res) => res.json())
            .then((data) => setHeroes(data))
            .catch((err) => console.error("Failed to load heroes:", err));
    }, []);

    const heroRows = chunkArray(heroes, 4);

    return (
        <div className="heroes-container">
            <h2 className="heroes-title">Heroes</h2>
            <div>
                {heroRows.map((row, rowIdx) => (
                    <div key={rowIdx} className="heroes-row">
                        {row.map((hero) => (
                            <div key={hero.id} className="hero-card">
                                {hero.imageUrl && (
                                    <img
                                        src={hero.imageUrl}
                                        alt={hero.name}
                                        className="hero-image"
                                    />
                                )}
                                <h3 className="hero-name">{hero.name}</h3>
                                <p className="hero-description">{hero.description}</p>
                                <div className="hero-meta">
                                    <strong>Cost:</strong> {hero.cost} <br />
                                    <strong>Faction:</strong> {hero.faction} <br />
                                    <strong>Role:</strong> {hero.role.join(", ")}
                                </div>
                                <div className="hero-skill">
                                    <strong>Skill:</strong> {hero.skill.name}
                                    <div className="hero-skill-desc">
                                        {hero.skill.description}
                                    </div>
                                    <table className="hero-skill-table">
                                        <thead>
                                            <tr>
                                                <th>Star</th>
                                                <th>Physical</th>
                                                <th>Passive</th>
                                                <th>Restore</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {["star_1", "star_2", "star_3"].map((star) => (
                                                <tr key={star}>
                                                    <td>{star.replace("_", " ").toUpperCase()}</td>
                                                    <td>{hero.skill.scaling[star as keyof typeof hero.skill.scaling].physical_bonus}%</td>
                                                    <td>{hero.skill.scaling[star as keyof typeof hero.skill.scaling].passive_bonus}%</td>
                                                    <td>{hero.skill.scaling[star as keyof typeof hero.skill.scaling].restore_bonus}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="hero-attributes">
                                    <strong>Attributes:</strong>
                                    <table className="hero-attr-table">
                                        <thead>
                                            <tr>
                                                <th>Star</th>
                                                <th>HP</th>
                                                <th>Phys ATK</th>
                                                <th>Mag ATK</th>
                                                <th>ATK Spd</th>
                                                <th>ATK Range</th>
                                                <th>Init Mana</th>
                                                <th>Mana Cap</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {["star_1", "star_2", "star_3"].map((star) => (
                                                <tr key={star}>
                                                    <td>{star.replace("_", " ").toUpperCase()}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].hp}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].physical_atk}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].magic_atk}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].atk_speed}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].atk_range}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].initial_mana}</td>
                                                    <td>{hero.attributes[star as keyof typeof hero.attributes].mana_cap}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                        {row.length < 4 &&
                            Array.from({ length: 4 - row.length }).map((_, idx) => (
                                <div key={idx} className="hero-card hero-card-empty" />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Heroes;
