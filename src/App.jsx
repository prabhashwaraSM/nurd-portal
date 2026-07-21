import { useState } from "react";
import Navbar from "./components/Navbar";
import Students from "./pages/Students";
import Evaluations from "./pages/Evaluations";
import Winners from "./pages/Winners";

function App() {
  const [activeTab, setActiveTab] = useState("students");

  // Centralized Student Data State
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Morgan", path: "Dynamic Leadership", speechesGiven: 5, score: 0 },
    { id: 2, name: "Samira Khan", path: "Presentation Mastery", speechesGiven: 8, score: 0 },
    { id: 3, name: "Jordan Lee", path: "Effective Body Language", speechesGiven: 3, score: 0 },
    { id: 4, name: "Taylor Swift", path: "Persuasive Speaking", speechesGiven: 6, score: 0 },
  ]);

  // Handler to update evaluation score
  const handleSaveEvaluation = (studentName, totalScore) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.name === studentName) {
          return {
            ...student,
            score: totalScore,
            speechesGiven: student.speechesGiven + 1,
          };
        }
        return student;
      })
    );
    // Switch over to Winners tab automatically to show updated podium
    setActiveTab("winners");
  };

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", fontFamily: "sans-serif", color: "#f9fafb" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === "students" && <Students students={students} />}
        {activeTab === "evaluations" && (
          <Evaluations students={students} onSaveEvaluation={handleSaveEvaluation} />
        )}
        {activeTab === "winners" && <Winners students={students} />}
      </main>
    </div>
  );
}

export default App;