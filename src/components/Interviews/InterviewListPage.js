import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as interviewActions from "../../redux/actions/interviewActions";
import * as groupActions from "../../redux/actions/groupActions";
import { Link } from "react-router-dom";
import ListTable from "../Common/ListTable";
import CenteredModal from "../Common/CenteredModal";
import { Button } from "react-bootstrap";

class ListInterviews extends Component {
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
    const { interviews, groups, actions } = this.props;

    if (interviews.length === 0) {
      actions.loadInterviews().catch((error) => {
        alert("Loading interviews failed: " + error);
      });
    }
    if (groups.length === 0) {
      actions.loadGroups().catch((error) => {
        alert("Loading groups failed: " + error);
      });
    }
  }
  render() {
    return (
      <>
        <div className="d-flex">
          <Button
            variant="outline-dark"
            as={Link}
            to="/interviews/create"
            xs={1}
            className="ms-auto mb-2"
          >
            New Interview
          </Button>
        </div>
        {this.props.interviews.length > 0 && (
          <ListTable>
            <ListTable.Header>
              <tr>
                <th>Name</th>
                <th>Groups</th>
                <th></th>
              </tr>
            </ListTable.Header>
            <ListTable.Body>
              {this.props.interviews.map((interview) => (
                <tr
                  key={interview.id}
                  onClick={() => this.showDetailsModal(interview)}
                >
                  <td>{interview.name}</td>
                  <td>
                    {interview.groups.focus.length +
                      interview.groups.additional.length}
                  </td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <div className="btn-group">
                        <Button
                          as={Link}
                          to={`/interviews/${interview.id}`}
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
        <CenteredModal
          show={this.state.detailsModalShown}
          title={this.state.detailsModalObject.name}
          onHide={this.hideDetailsModal}
        >
          <ul>
            <li>
              Focus Groups:{" "}
              <ul>
                {this.state.detailsModalObject.groups?.focus.map((group) => (
                  <li>{this.props.groups.find((x) => x.id === group).name}</li>
                ))}
              </ul>
            </li>
            <li>
              Additional Groups:{" "}
              <ul>
                {this.state.detailsModalObject.groups?.additional.map(
                  (group) => (
                    <li>
                      {this.props.groups.find((x) => x.id === group).name}
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </CenteredModal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    interviews: state.interviews,
    groups: state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadInterviews: bindActionCreators(
        interviewActions.loadInterviews,
        dispatch
      ),
      loadGroups: bindActionCreators(groupActions.loadGroups, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListInterviews);
