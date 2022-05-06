import React, { Component } from "react";
import { connect } from "react-redux";
import TestForm from "./TestForm";
import { withRouter } from "../Common/Wrappers/withRouter";
import { emptyTest } from "../../json-mock-api/mockData";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as testActions from "../../redux/actions/testActions";

class TestManagePage extends Component {
  state = {
    test: this.props.test,
  };

  componentDidMount() {
    const { tests, actions } = this.props;

    if (tests.length === 0) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed: " + error);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.test !== this.props.test) {
      this.setState({ test: this.props.test });
    }
  }

  handleChange = (event) => {
    this.setState({
      test: {
        ...this.state.test,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions
      .saveTest(this.state.test)
      .then(this.props.navigate("/tests/"))
      .catch((error) => {
        alert("Saving test failed. Error: " + error);
      });
  };
  render() {
    return (
      <>
        <div className="col-md-6 offset-md-3 col">
          <TestForm
            test={this.state.test}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </div>
      </>
    );
  }
}

function getTestById(tests, id) {
  return tests.find((test) => test.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const testId = ownProps.params?.id;
  const test =
    testId && state.tests.length > 0
      ? getTestById(state.tests, testId)
      : emptyTest;
  return {
    tests: state.tests,
    test,
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TestManagePage)
);
