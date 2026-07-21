function Students({ students }) {
  return (
    <div style={styles.container}>
      <h2>👥 Toastmasters Members</h2>
      <p style={{ color: "#9ca3af" }}>Class roster and speech milestones.</p>

      <div style={styles.grid}>
        {students.map((student) => (
          <div key={student.id} style={styles.card}>
            <div style={styles.avatar}>{student.name.charAt(0)}</div>
            <h3 style={styles.cardTitle}>{student.name}</h3>
            <p style={styles.text}><strong>Path:</strong> {student.path}</p>
            <p style={styles.text}><strong>Speeches Completed:</strong> {student.speechesGiven}</p>
            <p style={styles.text}>
              <strong>Latest Score:</strong> {student.score > 0 ? `${student.score}/50` : "No evaluation yet"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { 
    backgroundColor: "#1f2937", // Dark card background
    color: "#f9fafb",
    padding: "20px", 
    borderRadius: "10px", 
    textAlign: "center", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)", 
    border: "1px solid #374151" 
  },
  avatar: { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", margin: "0 auto 10px" },
  cardTitle: { margin: "10px 0", color: "#f9fafb" },
  text: { color: "#d1d5db", margin: "5px 0" }
};

export default Students;