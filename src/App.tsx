import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import RouteBuilder from "./components/RouteBuilder/RouteBuilder";

function App() {
  return (
    <div className="app-container">
      <Router>
        <RouteBuilder />
      </Router>
    </div>
  );
}

export default App;
