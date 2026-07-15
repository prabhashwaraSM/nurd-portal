function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🚀 NurdPortal</h2>
      <ul style={styles.links}>
        <li style={styles.link}>Home</li>
        <li style={styles.link}>Dashboard</li>
        <li style={styles.link}>Profile</li>
      </ul>
    </nav>
  );
}

// A quick way to add simple styling directly in React!
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1e1e24",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    listStyle: "none",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  link: {
    cursor: "pointer",
  }
};

export default Navbar;