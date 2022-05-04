import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as interviewActions from "../../redux/actions/interviewActions";
import * as groupActions from "../../redux/actions/groupActions";
import { Link } from "react-router-dom";

class ListInterviews extends Component {
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
        <div className="container table-responsive">
          <Link to="/interviews/create">
            <button className="btn btn-success d-flex ms-auto">
              New Interview
            </button>
          </Link>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Groups</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {this.props.interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.name}</td>
                  <td>
                    {interview.groups.focus.length +
                      interview.groups.additional.length}
                  </td>
                  <td className="justify-content-end d-flex">
                    <div className="btn-group">
                      <Link to={`/interviews/${interview.id}`}>
                        <button className="btn btn-outline-success">
                          Edit
                        </button>
                      </Link>
                      <button className="btn btn-outline-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
