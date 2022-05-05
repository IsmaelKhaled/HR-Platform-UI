import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as testActions from "../../redux/actions/testActions";
import { Link } from "react-router-dom";

class ListTests extends Component {
  componentDidMount() {
    const { tests, actions } = this.props;

    if (tests.length === 0) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed: " + error);
      });
    }
  }
  render() {
    return (
      <>
        <div className="container table-responsive">
          <Link to="/tests/create">
            <button className="btn btn-outline-dark d-flex ms-auto mb-2">
              New Test
            </button>
          </Link>
          {this.props.tests.length > 0 && (
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Duration</th>
                  <th>Acceptance Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {this.props.tests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.name}</td>
                    <td>{test.duration}</td>
                    <td>
                      {test.acceptanceScore} / {test.maxScore}
                    </td>
                    <td className="justify-content-end d-flex">
                      <div className="btn-group">
                        <Link to={`/tests/${test.id}`}>
                          <button className="btn btn-outline-success">
                            Edit
                          </button>
                        </Link>
                        <button className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    tests: state.tests,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTests: bindActionCreators(testActions.loadTests, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTests);
