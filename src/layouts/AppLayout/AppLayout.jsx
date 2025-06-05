import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-body">
        <AppSidebar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
