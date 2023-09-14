import React from "react";
import { render } from "@testing-library/react";
import RouteBuilder from "./RouteBuilder";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

test("renders RouteBuilder", () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<RouteBuilder />} />
      </Routes>
    </Router>
  );
});
