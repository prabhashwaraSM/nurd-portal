function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand} onClick={() => setActiveTab("students")}>
        🎙️ Toastmasters Club
      </div>
      <ul style={styles.links}>
        <li
          style={activeTab === "students" ? styles.activeLink : styles.link}
          onClick={() => setActiveTab("students")}
        >
          Students
        </li>
        <li
          style={activeTab === "evaluations" ? styles.activeLink : styles.link}
          onClick={() => setActiveTab("evaluations")}
        >
           Weekly Evaluations
        </li>
        <li
          style={activeTab === "winners" ? styles.activeLink : styles.link}
          onClick={() => setActiveTab("winners")}
        >
          🏆 Winners Podium
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1f2937",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  brand: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: "25px",
    margin: 0,
    padding: 0,
  },
  link: {
    cursor: "pointer",
    opacity: 0.8,
    fontWeight: "500",
  },
  activeLink: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "#60a5fa",
    borderBottom: "2px solid #60a5fa",
    paddingBottom: "2px",
  },
};

export default Navbar;