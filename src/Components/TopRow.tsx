import "../styles.css";
import { useState } from "react";
import TeamBuilder from "./TeamBuilder";
import TierList from "./TierList";
import PatchNotes from "./PatchNotes";
import S2Info from "./S2INFO";

function topRow() {
  const [page, setPage] = useState("default");
  return (
    <div className="Row">
      <span
        onClick={() => {
          setPage("teambuilder");
        }}
      >
        {" "}
        Team Builder{" "}
      </span>
      <span
        onClick={() => {
          setPage("tierlist");
        }}
      >
        {" "}
        Tier list{" "}
      </span>
      <span
        onClick={() => {
          setPage("patchnotes");
        }}
      >
        {" "}
        Patch Notes{" "}
      </span>
      <span
        onClick={() => {
          setPage("s2info");
        }}
      >
        {" "}
        S2 Info{" "}
      </span>
      <div>
        {page === "teambuilder" && <TeamBuilder />}
        {page === "tierlist" && <TierList />}
        {page === "patchnotes" && <PatchNotes />}
        {page === "s2info" && <S2Info />}
      </div>
    </div>
  );
}
export default topRow;
