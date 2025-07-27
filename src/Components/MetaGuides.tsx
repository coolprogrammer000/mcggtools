import React, { useEffect, useState } from "react";
import "../styles.css";

interface Guide {
    id: string;
    title: string;
    author: string;
    thumbnailUrl: string;
    description: string;
    board: (string | null)[][];
    go_go_cards: string[];
    commanders: string[];
    itemRecommendations: {
        hero: string;
        label: string;
        items: string[];
    }[];
    text: string;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function MetaGuides() {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("./data/guides.json")
            .then((res) => res.json())
            .then((data: Guide[]) => setGuides(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading guides...</p>;
    if (error) return <p>Error loading guides: {error}</p>;

    if (selectedGuide) {
        return (
            <div className="meta-guides-container">
                <button className="back-button" onClick={() => setSelectedGuide(null)}>
                    ← Back to all guides
                </button>
                <h2>{selectedGuide.title}</h2>
                <img
                    src={selectedGuide.thumbnailUrl}
                    alt={selectedGuide.title}
                    className="selected-guide-thumbnail"
                />
                <p>{selectedGuide.description}</p>
                <p>
                    <strong>Author:</strong> {selectedGuide.author}
                </p>

                {/* Board */}
                <div className="formation-grid">
                    <table className="BoxTable">
                        <tbody>
                            {selectedGuide.board.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((heroName, colIndex) => (
                                        <td className="Box" key={colIndex}>
                                            {heroName && (
                                                <img
                                                    className="HeroesinTable"
                                                    src={`./Images/Heroes/${heroName}.png`}
                                                    alt={heroName}
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Item Recommendations */}
                <div className="item-recommendations">
                    <h3>Item recommendations:</h3>
                    {selectedGuide.itemRecommendations.map((rec, idx) => (
                        <div className="item-row" key={idx}>
                            <div className="item-hero">
                                <img
                                    src={`./Images/Heroes/${rec.hero}.png`}
                                    alt={rec.hero}
                                    className="hero-icon"
                                />
                            </div>
                            <div className="item-icons">
                                {rec.items.map((item, i) => (
                                    <img
                                        key={i}
                                        src={`./Images/Equipments/${item}.png`}
                                        alt={item}
                                        className="item-icon"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Commanders */}
                <div className="commanders">
                    <h3>Commanders:</h3>
                    <div className="commander-icons">
                        {selectedGuide.commanders.map((cmdr, i) => (
                            <img
                                key={i}
                                src={`./Images/Commanders/${cmdr}.png`}
                                alt={cmdr}
                                className="commander-icon"
                            />
                        ))}
                    </div>
                </div>


                {/* Guide Text */}
                
                <div className="guide-text">
                    <h3>Guide Notes</h3>
                    <p>{selectedGuide.text || "No detailed guide provided."}</p>
                </div>

                {/* Go Go Cards */}
                <div className="guide-cards">
                    <h3>Go Go Cards</h3>
                    <div className="card-gallery">
                        {selectedGuide.go_go_cards?.map((card: string) => (
                            <img
                                key={card}
                                src={`./Images/GoGoCards/${card}.png`}
                                alt={card}
                                className="gogo-card"
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const rows = chunkArray(guides, 3);

    return (
        <div className="meta-guides-container">
            <h2>Meta Guides</h2>
            <div className="guides-table">
                {rows.map((row, rowIdx) => (
                    <div className="guides-row" key={rowIdx}>
                        {row.map((guide) => (
                            <div
                                key={guide.id}
                                className="guide-card"
                                onClick={() => setSelectedGuide(guide)}
                            >
                                <img
                                    src={guide.thumbnailUrl}
                                    alt={guide.title}
                                    className="guide-thumbnail"
                                />
                                <div className="guide-description">{guide.description}</div>
                                <div className="guide-author">Author: {guide.author}</div>
                            </div>
                        ))}
                        {row.length < 3 &&
                            Array.from({ length: 3 - row.length }).map((_, idx) => (
                                <div className="guide-card empty" key={idx} />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MetaGuides;