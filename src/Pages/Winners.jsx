function Winners({ students }) {
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  const topThree = sortedStudents.slice(0, 3);

  const ranks = ["🥇 1st Place", "🥈 2nd Place", "🥉 3rd Place"];
  const badges = ["Best Overall Speaker", "Runner Up", "Third Place Speaker"];

  return (
    <div style={styles.container}>
      <h2>🏆 Weekly Winners Podium</h2>
      <p style={{ color: "#9ca3af" }}>Top performers based on weekly evaluation scores.</p>

      <div style={styles.podium}>
        {topThree.map((student, idx) => (
          <div key={student.id} style={{ ...styles.card, borderTop: idx === 0 ? "5px solid gold" : "5px solid #94a3b8" }}>
            <h3 style={styles.rank}>{ranks[idx]}</h3>
            <h2 style={{ color: "#f9fafb", margin: "10px 0" }}>{student.name}</h2>
            <p style={{ color: "#d1d5db" }}>
              <strong>Score:</strong> {student.score > 0 ? `${student.score}/50` : "0/50"}
            </p>
            <span style={styles.badge}>{badges[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "900px", margin: "0 auto", textAlign: "center" },
  podium: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" },
  card: { 
    backgroundColor: "#1f2937", 
    color: "#f9fafb",
    padding: "25px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)", 
    border: "1px solid #374151" 
  },
  rank: { margin: "0 0 10px 0", fontSize: "1.4rem" },
  badge: { display: "inline-block", backgroundColor: "#1e3a8a", color: "#93c5fd", padding: "5px 10px", borderRadius: "15px", fontSize: "0.85rem", marginTop: "10px", fontWeight: "bold" },
};

export default Winners;