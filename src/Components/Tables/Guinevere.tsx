import React, { useEffect, useState } from "react";

interface GuinevereEntry {
  level: number;
  expected: number;
  cost_per_roll: number;
  prem_client_one: number;
  prem_client_two: number;
}

interface GuinevereTableProps {
  data: GuinevereEntry[];
}

const GuinevereTable: React.FC<GuinevereTableProps> = ({ data }) => (
  <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
    <thead>
      <tr>
        <th>Level</th>
        <th>Expected Return</th>
        <th>Cost per roll</th>
        <th>Cost per roll with Premium Client 1</th>
        <th>Cost per roll with Premium Client 2</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.level}>
          <td>{row.level}</td>
          <td>{row.expected}</td>
          <td>{row.cost_per_roll}</td>
          <td>{row.prem_client_one}</td>
          <td>{row.prem_client_two}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

function Guinevere() {
  const [guinevereData, setGuinevereData] = useState<GuinevereEntry[]>([]);

  useEffect(() => {
    fetch("/data/level intervals.json")
      .then((res) => res.json())
      .then((jsonData) => {
        const processed: GuinevereEntry[] = Object.entries(jsonData).map(([level, data]: [string, any]) => ({
          level: Number(level),
          ...data.guinevere
        }));
        setGuinevereData(processed);
      });
  }, []);

  return (
    <div>
      <h2>Expected Return with Guinevere</h2>
      <GuinevereTable data={guinevereData} />
    </div>
  );
}

export default Guinevere;