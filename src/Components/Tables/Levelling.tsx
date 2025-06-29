import React, { useEffect, useState } from "react";

interface OddsTableProps {
  data: {
    level: number;
    xp: number | null;
    odds: number[];
  }[];
}

const costLabels = ["1-Gold", "2-Gold", "3-Gold", "4-Gold", "5-Gold"];

const OddsTable: React.FC<OddsTableProps> = ({ data }) => (
  <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        <th>Level</th>
        <th>XP to Next</th>
        {costLabels.map((label, idx) => (
          <th key={idx}>{label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.level}>
          <td>{row.level}</td>
          <td>{row.xp ?? "-"}</td>
          {row.odds.map((odds, idx) => (
            <td key={idx}>{odds}%</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

function Levelling() {
  const [oddsData, setOddsData] = useState<
    { level: number; xp: number | null; odds: number[] }[]
  >([]);

  useEffect(() => {
    fetch("/data/level intervals.json")
      .then((res) => res.json())
      .then((jsonData) => {
        const processed = Object.entries(jsonData).map(([level, data]: [string, any]) => ({
          level: Number(level),
          xp: data.xp,
          odds: data.odds,
        }));
        setOddsData(processed);
      });
  }, []);

  return (
    <div>
      <h2>Shop Odds Per Level</h2>
      <OddsTable data={oddsData} />
    </div>
  );
}

export default Levelling;