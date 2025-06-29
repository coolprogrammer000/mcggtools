import React, { useState, useEffect } from "react";
import "./tables.css"
type LootEntry = {
  Least: number;
  Most: number;
  Cashouts: {
    [key: string]: Record<string, any>;
  };
};

interface LootTableProps {
  data: LootEntry[];
}

const renderRewards = (rewards: Record<string, any>) => (
  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
    {Object.entries(rewards).map(([reward, val]) => {
      if (typeof val === "object") {
        if (reward === "Heroes") {
          return Object.entries(val).flatMap(([gold, starMap]) =>
            Object.entries(starMap as Record<string, any>).map(([star, count]) => (
              <li key={`${reward}-${gold}-${star}`}>
                {`${count} ${star} ${gold}-Gold`}
              </li>
            ))
          );
        } else if (reward === "Items") {
          return Object.entries(val).map(([itemName, count]) => (
            <li key={`${reward}-${itemName}`}>{`${itemName} ×${count}`}</li>
          ));
        } else {
          return Object.entries(val).map(([k, v]) => (
            <li key={reward + k}>{`${reward} ${k}: ${v}`}</li>
          ));
        }
      } else {
        return (
          <li key={reward}>
            {reward === "Gold" ? (
              <div className="item-container">
                <img src="/images/Icons/Gold.png" alt="Gold" className="item" />
                <span className="item-amount">{val}</span>
              </div>
            ) : reward === "XP" ? (
              <div className="item-container">
                <img src="/images/Icons/XP.png" alt="XP" className="item" />
                <span className="item-amount">{val}</span>
              </div>
            ) : reward === "Equipment" ? (
              <div className="item-container">
                <img src="/images/Equipments/BladeofDespair.png" alt="Equipment" className="item" />
                <span className="item-amount">{val}</span>
              </div>
            ) : (
              `${reward}: ${val}`
            )}
          </li>
        );
      }
    })}
  </ul>
);

const LootTable: React.FC<LootTableProps> = ({ data }) => {
  // Find all possible cashout numbers to make columns
  const cashoutNums = Array.from(
    new Set(
      data.flatMap(d => Object.keys(d.Cashouts))
    )
  ).sort();

  return (
    <table border={1} cellPadding={6} style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Knowledge Points</th>
          {cashoutNums.map(num => (
            <th key={num}>{`Cashout ${num}`}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((tier, i) => (
          <tr key={i}>
            <td>{tier.Least === tier.Most ? tier.Least : `${tier.Least} – ${tier.Most}`}</td>
            {cashoutNums.map(num => (
              <td key={num}>
                {tier.Cashouts[num]
                  ? renderRewards(tier.Cashouts[num])
                  : "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function Eruditio() {
  const [lootData, setLootData] = useState(null);

  useEffect(() => {
    fetch('/data/eruditio cashout.json')
      .then(r => r.json())
      .then(setLootData);
  }, []);

  return (
    <div>
      <h2>Eruditio Rewards</h2>
      {lootData
        ? <LootTable data={lootData} />
        : <div>Loading...</div>
      }
    </div>
  );
}

export default Eruditio;