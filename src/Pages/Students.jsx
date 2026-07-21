import { useState } from "react";

function Students({ students, onAddStudent, onDeleteStudent }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("Pre-school");

  const gradesList = [
    "Pre-school", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
    "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
    "Grade 11", "Grade 12", "Grade 13", "University Level"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddStudent({ name, grade });

    setName("");
    setGrade("Pre-school");
    setShowForm(false);
  };

  const handleDeleteClick = (student) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${student.name}?`);
    if (isConfirmed) {
      onDeleteStudent(student.id);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>👥 Toastmasters Members</h2>
          <p style={{ color: "#9ca3af", margin: "5px 0 0 0" }}>
            Class roster and speech milestones.
          </p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          style={showForm ? styles.cancelBtn : styles.addBtn}
        >
          {showForm ? "✕ Cancel" : "➕ Add New Student"}
        </button>
      </div>

      {/* Toggleable Add Student Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <h3 style={{ margin: "0 0 15px 0", color: "#60a5fa" }}>Register New Member</h3>
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name:</label>
              <input
                type="text"
                placeholder="e.g. Mayantha Prabhashwara"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Grade / Level:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                style={styles.input}
              >
                {gradesList.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" style={styles.submitBtn}>
            Save Member
          </button>
        </form>
      )}

      {/* Empty Roster Notice or Student Grid */}
      {students.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ color: "#9ca3af", margin: 0, fontSize: "1.1rem" }}>
            No students registered yet. Click <strong>"➕ Add New Student"</strong> to add your first member!
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {students.map((student) => (
            <div key={student.id} style={styles.card}>
              <button 
                onClick={() => handleDeleteClick(student)} 
                style={styles.deleteBtn}
                title="Delete Student"
              >
                🗑️
              </button>

              <div style={styles.avatar}>{student.name.charAt(0).toUpperCase()}</div>
              <h3 style={styles.cardTitle}>{student.name}</h3>
              <p style={styles.text}><strong>Grade:</strong> {student.grade}</p>
              <p style={styles.text}><strong>Speeches Completed:</strong> {student.speechesGiven}</p>
              <p style={styles.text}>
                <strong>Latest Score:</strong> {student.score > 0 ? `${student.score}/50` : "No evaluation yet"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", maxWidth: "1000px", margin: "0 auto" },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: "20px" 
  },
  addBtn: { 
    backgroundColor: "#2563eb", 
    color: "#fff", 
    border: "none", 
    padding: "10px 18px", 
    borderRadius: "6px", 
    fontWeight: "bold", 
    cursor: "pointer" 
  },
  cancelBtn: { 
    backgroundColor: "#4b5563", 
    color: "#fff", 
    border: "none", 
    padding: "10px 18px", 
    borderRadius: "6px", 
    fontWeight: "bold", 
    cursor: "pointer" 
  },
  formCard: { 
    backgroundColor: "#1f2937", 
    padding: "20px", 
    borderRadius: "10px", 
    border: "1px solid #374151", 
    marginBottom: "25px", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)" 
  },
  formGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
    gap: "15px", 
    marginBottom: "15px" 
  },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { color: "#d1d5db", fontSize: "0.9rem", fontWeight: "bold" },
  input: { 
    padding: "10px", 
    borderRadius: "5px", 
    border: "1px solid #4b5563", 
    backgroundColor: "#374151", 
    color: "#fff" 
  },
  submitBtn: { 
    backgroundColor: "#16a34a", 
    color: "#fff", 
    border: "none", 
    padding: "10px 20px", 
    borderRadius: "6px", 
    fontWeight: "bold", 
    cursor: "pointer" 
  },
  emptyBox: {
    backgroundColor: "#1f2937",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    border: "1px dashed #4b5563",
    marginTop: "20px"
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
    gap: "20px" 
  },
  card: { 
    backgroundColor: "#1f2937", 
    color: "#f9fafb", 
    padding: "20px", 
    borderRadius: "10px", 
    textAlign: "center", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)", 
    border: "1px solid #374151",
    position: "relative" // Allows exact positioning for delete icon
  },
  avatar: { 
    width: "50px", 
    height: "50px", 
    borderRadius: "50%", 
    backgroundColor: "#2563eb", 
    color: "#fff", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    fontSize: "1.2rem", 
    fontWeight: "bold", 
    margin: "0 auto 10px" 
  },
  cardTitle: { margin: "10px 0", color: "#f9fafb" },
  text: { color: "#d1d5db", margin: "5px 0" },
  deleteBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    padding: "4px 6px",
    borderRadius: "4px",
    opacity: 0.7,
    transition: "opacity 0.2s",
  }
};

export default Students;