function Winners() {
  const winners = [
    { rank: "🥇 1st Place", name: "Samira Khan", score: "48/50", title: "Best Evaluated Speaker" },
    { rank: "🥈 2nd Place", name: "Alex Morgan", score: "45/50", title: "Most Confident Smile" },
    { rank: "🥉 3rd Place", name: "Taylor Swift", score: "43/50", title: "Best Gesture Expressiveness" },
  ];

  return (
    <div style={styles.container}>
      <h2>🏆 Weekly Winners Podium</h2>
      <p style={{ color: "#666" }}>Top performers based on weekly evaluation scores.</p>

      <div style={styles.podium}>
        {winners.map((winner, idx) => (
          <div key={idx} style={{ ...styles.card, borderTop: idx === 0 ? "5px solid gold" : "5px solid #cbd5e1" }}>
            <h3 style={styles.rank}>{winner.rank}</h3>
            <h2>{winner.name}</h2>
            <p><strong>Score:</strong> {winner.score}</p>
            <span style={styles.badge}>{winner.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "900px", margin: "0 auto", textAlign: "center" },
  podium: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" },
  card: { backgroundColor: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" },
  rank: { margin: "0 0 10px 0", fontSize: "1.4rem" },
  badge: { display: "inline-block", backgroundColor: "#eff6ff", color: "#1d4ed8", padding: "5px 10px", borderRadius: "15px", fontSize: "0.85rem", marginTop: "10px", fontWeight: "bold" },
};

export default Winners;