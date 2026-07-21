import { useState } from "react";
import Navbar from "./components/Navbar";
import Students from "./pages/Students";
import Evaluations from "./pages/Evaluations";
import Winners from "./pages/Winners";

function App() {
  const [activeTab, setActiveTab] = useState("students");

  // Centralized Student Data State
  const [students, setStudents] = useState([]);

  // Handler to add a new student
  const handleAddStudent = (newStudentData) => {
    const newStudent = {
      id: Date.now(),
      name: newStudentData.name,
      grade: newStudentData.grade,
      speechesGiven: 0,
      score: 0,
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  // Handler to delete a student
  const handleDeleteStudent = (studentId) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
  };

  // Handler to update evaluation score & auto-count speeches
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
    // Automatic redirect removed as requested!
  };

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", fontFamily: "sans-serif", color: "#f9fafb" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main>
        {activeTab === "students" && (
          <Students 
            students={students} 
            onAddStudent={handleAddStudent} 
            onDeleteStudent={handleDeleteStudent}
          />
        )}
        {activeTab === "evaluations" && (
          <Evaluations students={students} onSaveEvaluation={handleSaveEvaluation} />
        )}
        {activeTab === "winners" && <Winners students={students} />}
      </main>
    </div>
  );
}

export default App;