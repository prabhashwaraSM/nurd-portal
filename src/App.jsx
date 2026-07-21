import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Students from "./Pages/Students";
import Evaluations from "./Pages/Evaluations";
import Winners from "./Pages/Winners";

import { db } from "./firebase";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "firebase/firestore";

function App() {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  // 1. Real-Time Listener for Students
  useEffect(() => {
    const studentsCollection = collection(db, "students");
    const unsubscribe = onSnapshot(studentsCollection, (snapshot) => {
      const studentData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setStudents(studentData);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-Time Listener for Weekly Evaluations
  useEffect(() => {
    const evalCollection = collection(db, "evaluations");
    const unsubscribe = onSnapshot(evalCollection, (snapshot) => {
      const evalData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setEvaluations(evalData);
    });
    return () => unsubscribe();
  }, []);

  // Add Student
  const handleAddStudent = async (newStudentData) => {
    try {
      await addDoc(collection(db, "students"), {
        name: newStudentData.name,
        grade: newStudentData.grade,
        speechesGiven: 0,
        score: 0,
      });
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  // Delete Student
  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, "students", studentId));
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  // Save Weekly Evaluation
  const handleSaveWeeklyEvaluation = async (evaluationData) => {
    try {
      await addDoc(collection(db, "evaluations"), {
        ...evaluationData,
        createdAt: new Date().toISOString()
      });

      const studentToUpdate = students.find((s) => s.id === evaluationData.studentId);
      if (studentToUpdate) {
        const studentRef = doc(db, "students", studentToUpdate.id);
        await updateDoc(studentRef, {
          score: (studentToUpdate.score || 0) + evaluationData.totalScore,
          speechesGiven: (studentToUpdate.speechesGiven || 0) + 1,
        });
      }
    } catch (error) {
      console.error("Error saving evaluation: ", error);
    }
  };

  // 3. Delete Entire Week
  const handleDeleteWeek = async (weekName) => {
    try {
      const evalsToDelete = evaluations.filter((e) => e.week === weekName);
      const deletePromises = evalsToDelete.map((e) => deleteDoc(doc(db, "evaluations", e.id)));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting week: ", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#111827", minHeight: "100vh", fontFamily: "sans-serif", color: "#f9fafb" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ padding: "20px" }}>
        {activeTab === "students" && (
          <Students 
            students={students} 
            onAddStudent={handleAddStudent} 
            onDeleteStudent={handleDeleteStudent}
          />
        )}
        {activeTab === "evaluations" && (
          <Evaluations 
            students={students} 
            evaluations={evaluations}
            onSaveEvaluation={handleSaveWeeklyEvaluation} 
            onDeleteWeek={handleDeleteWeek}
          />
        )}
        {activeTab === "winners" && <Winners students={students} evaluations={evaluations} />}
      </main>
    </div>
  );
}

export default App;