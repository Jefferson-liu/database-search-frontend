import "./AppSidebar.css";
import { useNavigate } from "react-router-dom";
function AppSidebar() {
  const navigate = useNavigate();
  return (
    <aside className="app-sidebar">
      <div className="sidebar-section">
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/search")}>Search</li>
        </ul>
      </div>
    </aside>
  );
}

export default AppSidebar;
