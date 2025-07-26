import "./styles.css";
import TopRow from "./Components/TopRow";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuidePage from "./Components/GuidePage";

export default function App() {
  return (
    <Router>
      <div className="App">
        <TopRow />
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/guides/:id" element={<GuidePage />} />
        </Routes>
      </div>
    </Router>
  );
}