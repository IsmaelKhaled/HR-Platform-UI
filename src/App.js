import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Navbar from "./components/Common/Navbar";
import ListInterviews from "./components/Interviews/InterviewListPage";
import ManageInterview from "./components/Interviews/InterviewManagePage";
import TestListPage from "./components/Tests/TestListPage";
import TestManagePage from "./components/Tests/TestManagePage";
import "./components/Common/Sidebar/Sidebar.scss";
import ProcessListPage from "./components/Processes/ProcessListPage";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <div id="content" className="col">
          <Sidebar />
          <div
            className="overlay"
            data-bs-toggle="collapse"
            data-bs-target="#sidebar.show, .overlay.show"
          ></div>
          <div className="container mt-3" id="page-content">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                exact
                path="/interviews/create/"
                element={<ManageInterview />}
              />
              <Route
                exact
                path="/interviews/:id"
                element={<ManageInterview />}
              />
              <Route exact path="/interviews" element={<ListInterviews />} />
              <Route exact path="/tests/create" element={<TestManagePage />} />
              <Route exact path="/tests/:id" element={<TestManagePage />} />
              <Route exact path="/tests" element={<TestListPage />} />
              <Route exact path="/processes" element={<ProcessListPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
