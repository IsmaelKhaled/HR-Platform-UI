import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/HomePage/HomePage";
import CreateInterview from "./components/Interviews/CreateInterview";
import Sidebar from "./components/Common/Sidebar";
import Navbar from "./components/Common/Navbar";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Sidebar />
        <div id="content" className="col">
          <Navbar />
          <div className="container-fluid mt-3">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/interviews/create/" element={<CreateInterview />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
