import { useState } from "react";
import Navbar from "./components/Navbar";
import Students from "./pages/Students";
import Evaluations from "./pages/Evaluations";
import Winners from "./pages/Winners";

function App() {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === "students" && <Students />}
        {activeTab === "evaluations" && <Evaluations />}
        {activeTab === "winners" && <Winners />}
      </main>
    </div>
  );
}

export default App;