import "../styles.css";
import { useState } from "react";
import TeamBuilder from "./TeamBuilder";
import TierList from "./TierList";
import PatchNotes from "./PatchNotes";
import S2Info from "./S2INFO";
import Tables from "./Tables";
import MetaGuides from "./MetaGuides";

export default function TopRow() {
  const [page, setPage] = useState("default");

  const tabs = [
    "Meta Guides",
    "Team Builder",
    "Tier List",
    "Tables",
    "Patch Notes",
    "S2 Info",
  ];

  return (
    <div className="Row">
      {tabs.map((text) => (
        <span
          key={text}
          className={page === text ? "active-tab" : ""}
          onClick={() => setPage(text)}
        >
          {text}
        </span>
      ))}
      <div>
        {page === "Team Builder" && <TeamBuilder />}
        {page === "Tier List" && <TierList />}
        {page === "Patch Notes" && <PatchNotes />}
        {page === "S2 Info" && <S2Info />}
        {page === "Tables" && <Tables />}
        {page === "Meta Guides" && <MetaGuides />}
      </div>
    </div>
  );
}