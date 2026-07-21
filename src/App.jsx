import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Students from "./pages/Students";
import Evaluations from "./pages/Evaluations";
import Winners from "./pages/Winners";

// Import Firestore database instance & helper functions
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

  // 1. Real-Time Listener: Automatically fetches student data whenever Firestore updates
  useEffect(() => {
    const studentsCollection = collection(db, "students");

    const unsubscribe = onSnapshot(studentsCollection, (snapshot) => {
      const studentData = snapshot.docs.map((docItem) => ({
        id: docItem.id, // Cloud document ID
        ...docItem.data(),
      }));
      setStudents(studentData);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 2. Add Student: Saves a new student directly into Firestore
  const handleAddStudent = async (newStudentData) => {
    try {
      await addDoc(collection(db, "students"), {
        name: newStudentData.name,
        grade: newStudentData.grade,
        speechesGiven: 0,
        score: 0,
      });
    } catch (error) {
      console.error("Error adding student to Firestore: ", error);
    }
  };

  // 3. Delete Student: Removes the student document from Firestore
  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, "students", studentId));
    } catch (error) {
      console.error("Error deleting student from Firestore: ", error);
    }
  };

  // 4. Save Evaluation: Updates the score and increments speech count in Firestore
  const handleSaveEvaluation = async (studentName, totalScore) => {
    const studentToUpdate = students.find((s) => s.name === studentName);

    if (studentToUpdate) {
      try {
        const studentRef = doc(db, "students", studentToUpdate.id);
        await updateDoc(studentRef, {
          score: totalScore,
          speechesGiven: studentToUpdate.speechesGiven + 1,
        });
      } catch (error) {
        console.error("Error updating score in Firestore: ", error);
      }
    }
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