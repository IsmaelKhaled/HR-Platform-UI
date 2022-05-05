import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as testActions from "../../redux/actions/testActions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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
          <div className="d-flex">
            <Button
              variant="outline-dark"
              as={Link}
              to="/tests/create"
              xs={1}
              className="ms-auto mb-2"
            >
              New Test
            </Button>
          </div>
          {this.props.tests.length > 0 && (
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>
                    Duration <div className="text-muted">(in minutes)</div>
                  </th>
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
                        <Button
                          as={Link}
                          to={`/tests/${test.id}`}
                          variant="outline-success"
                        >
                          Edit
                        </Button>
                        <Button variant="outline-danger">Delete</Button>
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
