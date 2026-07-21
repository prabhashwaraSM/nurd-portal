import { useState, useEffect } from "react";

function Evaluations({ students, onSaveEvaluation }) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.name || "");
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: "", score: 0 });

  const [scores, setScores] = useState({
    gestures: 5,
    smile: 5,
    eyeContact: 5,
    vocalVariety: 5,
    speechStructure: 5,
  });

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
    
    // Save state upward
    onSaveEvaluation(selectedStudent, totalScore);

    // Trigger submission effect
    setSubmittedData({ name: selectedStudent, score: totalScore });
    setShowCelebration(true);

    // Automatically dismiss celebration overlay after 2.5 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 2500);
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
      {/* Dynamic Keyframe Animations CSS */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); opacity: 1; }
        }
      `}</style>

      <h2>📋 Weekly Speech Evaluation</h2>
      <p style={{ color: "#9ca3af" }}>Grade speaker performance across key communication metrics (1-10).</p>

      {/* Submission Celebration Modal Overlay */}
      {showCelebration && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.floatingIcons}>🎉 ✨ 🌟</div>
            <h2 style={styles.modalTitle}>Evaluation Submitted!</h2>
            <div style={styles.scoreBadge}>
              <p style={{ margin: "0 0 5px 0", color: "#93c5fd", fontSize: "0.95rem" }}>
                Speaker: <strong>{submittedData.name}</strong>
              </p>
              <h1 style={{ margin: 0, color: "#4ade80", fontSize: "2.5rem" }}>
                {submittedData.score} <span style={{ fontSize: "1.2rem", color: "#9ca3af" }}>/ 50</span>
              </h1>
            </div>
            <p style={{ color: "#d1d5db", margin: "15px 0 0 0", fontSize: "0.9rem" }}>
              Score & Speech count saved automatically!
            </p>
            <button 
              onClick={() => setShowCelebration(false)} 
              style={styles.closeBtn}
            >
              Continue Evaluating
            </button>
          </div>
        </div>
      )}

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
          <button type="submit" style={styles.submitBtn}>
            🚀 Submit Evaluation
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "700px", margin: "0 auto", position: "relative" },
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
  submitBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", cursor: "pointer", fontSize: "1.05rem", marginTop: "10px", fontWeight: "bold" },
  
  // Modal Overlay Styles
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#1f2937",
    border: "2px solid #3b82f6",
    borderRadius: "16px",
    padding: "30px 40px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
    animation: "popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
    maxWidth: "400px",
    width: "90%",
  },
  floatingIcons: {
    fontSize: "2.2rem",
    marginBottom: "10px",
    animation: "floatUp 2s ease-in-out infinite",
  },
  modalTitle: {
    margin: "0 0 15px 0",
    color: "#f9fafb",
    fontSize: "1.5rem"
  },
  scoreBadge: {
    backgroundColor: "#111827",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #374151"
  },
  closeBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    marginTop: "20px",
    cursor: "pointer"
  }
};

export default Evaluations;