import { useState, useEffect } from "react";

function Evaluations({ students, onSaveEvaluation }) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.name || "");
  const [scores, setScores] = useState({
    gestures: 5,
    smile: 5,
    eyeContact: 5,
    vocalVariety: 5,
    speechStructure: 5,
  });

  // Keep dropdown selection synced when students are added or deleted
  useEffect(() => {
    if (students.length > 0 && !students.some((s) => s.name === selectedStudent)) {
      setSelectedStudent(students[0].name);
    }
  }, [students, selectedStudent]);

  const totalScore = Object.values(scores).reduce((sum, val) => sum + Number(val), 0);

  const handleScoreChange = (criterion, value) => {
    setScores((prev) => ({ ...prev, [criterion]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    onSaveEvaluation(selectedStudent, totalScore);
  };

  if (students.length === 0) {
    return (
      <div style={styles.container}>
        <h2>📋 Weekly Speech Evaluation</h2>
        <div style={styles.card}>
          <p style={{ color: "#9ca3af", textAlign: "center", margin: 0 }}>
            ⚠️ No students found. Please add members in the <strong>Students</strong> tab first before evaluating!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>📋 Weekly Speech Evaluation</h2>
      <p style={{ color: "#9ca3af" }}>Grade speaker performance across key communication metrics (1-10).</p>

      <form onSubmit={handleSubmit} style={styles.card}>
        <label style={{ color: "#f9fafb" }}><strong>Select Student:</strong></label>
        <select 
          value={selectedStudent} 
          onChange={(e) => setSelectedStudent(e.target.value)}
          style={styles.select}
        >
          {students.map((student) => (
            <option key={student.id} value={student.name}>
              {student.name} ({student.grade})
            </option>
          ))}
        </select>

        <div style={styles.criteriaContainer}>
          {[
            { key: "gestures", label: "🤝 Natural Hand Gestures" },
            { key: "smile", label: "😊 Confident Smile & Warmth" },
            { key: "eyeContact", label: "👁️ Audience Eye Contact" },
            { key: "vocalVariety", label: "🎙️ Vocal Variety & Projection" },
            { key: "speechStructure", label: "📝 Speech Structure & Flow" },
          ].map((item) => (
            <div key={item.key} style={styles.scoreRow}>
              <span style={{ color: "#d1d5db" }}>{item.label}: <strong style={{ color: "#60a5fa" }}>{scores[item.key]}/10</strong></span>
              <input
                type="range"
                min="1"
                max="10"
                value={scores[item.key]}
                onChange={(e) => handleScoreChange(item.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div style={styles.totalBox}>
          <h3 style={{ color: "#f9fafb" }}>Total Score: {totalScore} / 50</h3>
          <button type="submit" style={styles.submitBtn}>Submit Evaluation</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "700px", margin: "0 auto" },
  card: { 
    backgroundColor: "#1f2937", 
    color: "#f9fafb",
    padding: "25px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)", 
    border: "1px solid #374151" 
  },
  select: { width: "100%", padding: "10px", marginTop: "8px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #4b5563", backgroundColor: "#374151", color: "#fff" },
  criteriaContainer: { display: "flex", flexDirection: "column", gap: "15px" },
  scoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  totalBox: { marginTop: "25px", paddingTop: "15px", borderTop: "1px solid #374151", textAlign: "center" },
  submitBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", marginTop: "10px", fontWeight: "bold" }
};

export default Evaluations;