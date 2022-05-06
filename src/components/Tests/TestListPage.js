import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as testActions from "../../redux/actions/testActions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import RowDetailsModal from "../Common/ListTable/RowDetailsModal";
import ListTable from "../Common/ListTable/ListTable";

class ListTests extends Component {
  state = {
    detailsModalShown: false,
    detailsModalObject: {},
  };
  showDetailsModal = (obj) => {
    this.setState({
      detailsModalShown: true,
      detailsModalObject: obj,
    });
  };

  hideDetailsModal = () => {
    this.setState({
      detailsModalShown: false,
    });
  };
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
        <div className="container">
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
            <ListTable>
              <ListTable.Header>
                <tr>
                  <th>Name</th>
                  <th className="d-none d-md-table-cell">
                    Duration <div className="text-muted">(in minutes)</div>
                  </th>
                  <th>Acceptance Score</th>
                  <th></th>
                </tr>
              </ListTable.Header>
              <ListTable.Body>
                {this.props.tests.map((test) => (
                  <tr key={test.id} onClick={() => this.showDetailsModal(test)}>
                    <td>{test.name}</td>
                    <td className="d-none d-md-table-cell">{test.duration}</td>
                    <td>
                      {test.acceptanceScore} / {test.maxScore}
                    </td>
                    <td>
                      <div className="d-flex justify-content-end">
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
                      </div>
                    </td>
                  </tr>
                ))}
              </ListTable.Body>
            </ListTable>
          )}
          <RowDetailsModal
            show={this.state.detailsModalShown}
            title={this.state.detailsModalObject.name}
            onHide={this.hideDetailsModal}
          >
            <ul>
              <li>{this.state.detailsModalObject.name}</li>
              <li>{this.state.detailsModalObject.duration} minutes</li>
              <li>
                {this.state.detailsModalObject.acceptanceScore} /{" "}
                {this.state.detailsModalObject.maxScore}
              </li>
            </ul>
          </RowDetailsModal>
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
