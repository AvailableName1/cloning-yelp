import { Outlet, Link } from "react-router-dom";
import "./App.css";
import React from "react";
import MyMap from "./MyMap";

class App extends React.Component {
  render() {
    return (
      <div className="container" style={{ minHeight: '100vh' }}>
        <nav
          className="navbar navbar-light justify-content-center"
          style={{ backgroundColor: "#BCE7FD" }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <Link className="navbar-brand" to="/"><h1>Home</h1></Link>
            <div className="navbar-nav flex-row gap-3">
              <Link className="nav-link" to="/caffee"><h1>Caffee</h1></Link>
              <Link className="nav-link" to="/restaurant"><h1>Restaurant</h1></Link>
            </div>
          </div>
        </nav>
        <main>
          <MyMap />
        </main>
        <Outlet />
      </div>
    );
  }
}

export default App;
