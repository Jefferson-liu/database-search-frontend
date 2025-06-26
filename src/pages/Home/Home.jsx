import { useEffect } from "react";
import "./Home.css";

function Home() {

    useEffect(() => {
        // This effect can be used to fetch initial data or perform setup tasks
        // For example, you might want to fetch the latest Q&A entries here
        // fetchQnaData();
        console.log("Home component mounted");
    }
    , []);
  return (
    <div className="home-container">
      <h1>Welcome to the Search Dashboard</h1>
      <p className="subtitle">Select an action from the sidebar to get started.</p>

      <div className="home-panels">
        <div className="panel">
          <h2>🧠 Search knowledge base</h2>
          <p>Search the knowledge base for information</p>
        </div>
        <div className="panel">
          <h2>📊 System Stats</h2>
          <p>View usage trends, performance metrics, or recent activity (coming soon).</p>
        </div>
        <div className="panel">
          <h2>⚙️ Settings</h2>
          <p>Configure app behavior, user preferences, or roles (coming soon).</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
