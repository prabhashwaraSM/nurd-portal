// 1. Import your new Navbar component
import Navbar from "./components/Navbar";

function App() {
  const projectName = "Nurd Portal";

  return (
    <div>
      {/* 2. Use the Navbar component like a custom HTML tag */}
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Welcome to {projectName}!</h1>
        <p>Our layout is officially starting to come together.</p>
      </div>
    </div>
  );
}

export default App;