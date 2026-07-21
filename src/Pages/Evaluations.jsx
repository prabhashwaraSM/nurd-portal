import { useState } from "react";

function Evaluations() {
  const [selectedStudent, setSelectedStudent] = useState("Alex Morgan");
  const [scores, setScores] = useState({
    gestures: 8,
    smile: 9,
    eyeContact: 7,
    vocalVariety: 8,
    speechStructure: 9,
  });

  const totalScore = Object.values(scores).reduce((sum, val) => sum + Number(val), 0);

  const handleScoreChange = (criterion, value) => {
    setScores((prev) => ({ ...prev, [criterion]: value }));
  };

  return (
    <div style={styles.container}>
      <h2>📋 Weekly Speech Evaluation</h2>
      <p style={{ color: "#666" }}>Grade speaker performance across key communication metrics (1-10).</p>

      <div style={styles.card}>
        <label><strong>Select Student:</strong></label>
        <select 
          value={selectedStudent} 
          onChange={(e) => setSelectedStudent(e.target.value)}
          style={styles.select}
        >
          <option>Alex Morgan</option>
          <option>Samira Khan</option>
          <option>Jordan Lee</option>
          <option>Taylor Swift</option>
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
              <span>{item.label}: <strong>{scores[item.key]}/10</strong></span>
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
          <h3>Total Score: {totalScore} / 50</h3>
          <button style={styles.submitBtn}>Submit Evaluation</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "700px", margin: "0 auto" },
  card: { backgroundColor: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  select: { width: "100%", padding: "10px", marginTop: "8px", marginBottom: "20px", borderRadius: "5px", border: "1px solid #ccc" },
  criteriaContainer: { display: "flex", flexDirection: "column", gap: "15px" },
  scoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  totalBox: { marginTop: "25px", paddingTop: "15px", borderTop: "2px solid #eee", textAlign: "center" },
  submitBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "1rem", marginTop: "10px" }
};

export default Evaluations;