import "../styles.css";
import { useState } from "react";

const boxes = Array.from({ length: 21 }, (_, i) => i + 1);

function TeamBuilder() {
  const [press, setPress] = useState(null);
  const handleOnClickGoGo = () => {
    console.log("Plus clicked!");
  };
  const handleOnClickCommanders = () => {
    console.log("Plus clicked!");
  };
  return (
    <table className="TeamBuilderTable">
      <tr>
        <td>Traits</td>
        {boxes.map((index) => (
          <td></td>
        ))}
        <td>
          <tr>Go Go Cards</tr>
          <button onClick={() => handleOnClickGoGo()}>+</button>
          <tr> Commanders </tr>
          <button onClick={() => handleOnClickCommanders()}>+</button>
        </td>
      </tr>
    </table>
  );
}
export default TeamBuilder;
