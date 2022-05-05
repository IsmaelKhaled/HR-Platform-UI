import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Navbar from "./components/Common/Navbar";
import ListInterviews from "./components/Interviews/InterviewListPage";
import ManageInterview from "./components/Interviews/ManageInterviewPage";
import TestListPage from "./components/Tests/TestListPage";
import TestManagePage from "./components/Tests/TestManagePage";
import "./components/Common/Sidebar/Sidebar.scss";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <div id="content" className="col">
          <Sidebar />
          <div className="container-fluid mt-3">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/interviews/create/" element={<ManageInterview />} />
              <Route path="/interviews/:id" element={<ManageInterview />} />
              <Route exact path="/interviews" element={<ListInterviews />} />
              <Route exact path="/tests/create" element={<TestManagePage />} />
              <Route exact path="/tests/:id" element={<TestManagePage />} />
              <Route exact path="/tests" element={<TestListPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
