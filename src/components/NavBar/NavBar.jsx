import "./NavBar.css";

function NavBar() {
  return (
    <header className="nav-bar">
      <div className="nav-left">
        <span className="app-title">Search dashboard</span>
      </div>
      <nav className="nav-right">
        <button onClick={() => navigate("/")}>Home</button>
        <button>Logout</button>
      </nav>
    </header>
  );
}

export default NavBar;
