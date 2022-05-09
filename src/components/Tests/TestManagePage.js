import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TestForm from "./TestForm";
import * as testActions from "../../redux/actions/testActions";
import {emptyTest} from "../../json-mock-api/mockData"



function TestManagePage(props) {
  const navigate = useNavigate();
  const {id} = useParams();
  const [test, setTest] = useState(useSelector((state) => id && state.tests.length > 0 ? getTestById(state.tests, id):emptyTest));
  
  useEffect(() =>{
    const { tests, actions } = props;

    if (tests.length === 0) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed: " + error);
      });
    }
  })

  const handleChange = (event) => {
    setTest({...test, [event.target.name]:event.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions
      .saveTest(test)
      .then(navigate("/tests/"))
      .catch((error) => {
        alert("Saving test failed. Error: " + error);
      });
  };
  return (
    <>
        <div className="col-md-6 offset-md-3 col">
          <TestForm
            test={test}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </>
  )
}

function getTestById(tests, id) {
  return tests.find((test) => test.id === id) || null;
}

function mapStateToProps(state) {
  return {
    tests: state.tests,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveTest: bindActionCreators(testActions.saveTest, dispatch),
      loadTests: bindActionCreators(testActions.loadTests, dispatch),
    },
  };
}

export default 
  connect(mapStateToProps, mapDispatchToProps)(TestManagePage)
;
