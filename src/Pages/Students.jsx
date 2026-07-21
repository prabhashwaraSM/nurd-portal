function Students() {
  const sampleStudents = [
    { id: 1, name: "Alex Morgan", path: "Dynamic Leadership", speechesGiven: 5 },
    { id: 2, name: "Samira Khan", path: "Presentation Mastery", speechesGiven: 8 },
    { id: 3, name: "Jordan Lee", path: "Effective Body Language", speechesGiven: 3 },
    { id: 4, name: "Taylor Swift", path: "Persuasive Speaking", speechesGiven: 6 },
  ];

  return (
    <div style={styles.container}>
      <h2>👥 Toastmasters Members</h2>
      <p style={{ color: "#666" }}>Class roster and speech milestones.</p>

      <div style={styles.grid}>
        {sampleStudents.map((student) => (
          <div key={student.id} style={styles.card}>
            <div style={styles.avatar}>{student.name.charAt(0)}</div>
            <h3>{student.name}</h3>
            <p><strong>Path:</strong> {student.path}</p>
            <p><strong>Speeches Completed:</strong> {student.speechesGiven}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "1000px", margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginTop: "20px" },
  card: { backgroundColor: "#fff", padding: "20px", borderRadius: "10px", textAlign: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  avatar: { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#3b82f6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: "bold", margin: "0 auto 10px" },
};

export default Students;