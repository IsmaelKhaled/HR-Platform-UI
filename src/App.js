import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import CreateInterview from "./components/Interviews/CreateInterview";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/interviews/create/" element={<CreateInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
