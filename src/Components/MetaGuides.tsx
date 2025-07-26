import React, { useEffect, useState } from "react";
import "../styles.css";

interface Guide {
    id: string;
    title: string;
    author: string;
    thumbnailUrl: string;
    description: string;
    link: string;
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                setLoading(true);
                // Replace with your actual JSON file path
                const response = await fetch("./data/guides.json");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data: Guide[] = await response.json();
                setGuides(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGuides();
    }, []);

    if (loading) return <p>Loading guides...</p>;
    if (error) return <p>Error loading guides: {error}</p>;

    const rows = chunkArray(guides, 3);

    return (
        <div className="meta-guides-container">
            <h2>Meta Guides</h2>
            <div className="guides-table">
                {rows.map((row, rowIdx) => (
                    <div className="guides-row" key={rowIdx} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                        {row.map((guide) => (
                            <a
                                key={guide.id}
                                href={`./guides/${guide.id}`}
                                className="guide-link"
                                style={{
                                    flex: 1,
                                    textDecoration: "none",
                                    color: "inherit",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "1rem",
                                    background: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={guide.thumbnailUrl}
                                    alt={guide.title}
                                    className="guide-thumbnail"
                                    style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "0.5rem" }}
                                />
                                <div className="guide-description" style={{ marginBottom: "0.5rem", textAlign: "center" }}>
                                    {guide.description}
                                </div>
                                <div className="guide-author" style={{ fontSize: "0.9em", color: "#555" }}>
                                    Author: {guide.author}
                                </div>
                            </a>
                        ))}
                        {/* Fill empty columns if needed for last row */}
                        {row.length < 3 &&
                            Array.from({ length: 3 - row.length }).map((_, idx) => (
                                <div key={idx} style={{ flex: 1 }} />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MetaGuides;
