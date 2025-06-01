import "./styles.css";
import topRow from "./Components/TopRow";

export default function App() {
  return (
    <div className="App">
      <h1>{topRow()} </h1>
    </div>
  );
}
