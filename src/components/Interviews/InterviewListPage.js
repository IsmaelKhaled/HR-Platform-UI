import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as interviewActions from "../../redux/actions/interviewActions";
import * as groupActions from "../../redux/actions/groupActions";
import { Link } from "react-router-dom";
import ListTable from "../Common/ListTable";
import CenteredModal from "../Common/CenteredModal";
import { Button } from "react-bootstrap";

function InterviewListPage(props) {
  const [detailsModalShown, setDetailsModalShown] = useState(false);
  const [detailsModalObject, setDetailsModalObject] = useState({});

  useEffect(() => {
    const { interviews, groups, actions } = props;

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
  });

  const showDetailsModal = (obj) => {
    setDetailsModalShown(true);
    setDetailsModalObject(obj);
  };

  const hideDetailsModal = () => {
    setDetailsModalShown(false);
  };

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
      {props.interviews.length > 0 && (
        <ListTable>
          <ListTable.Header>
            <tr>
              <th>Name</th>
              <th>Groups</th>
              <th></th>
            </tr>
          </ListTable.Header>
          <ListTable.Body>
            {props.interviews.map((interview) => (
              <tr
                key={interview.id}
                onClick={() => showDetailsModal(interview)}
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
        show={detailsModalShown}
        title={detailsModalObject.name}
        onHide={hideDetailsModal}
      >
        <ul>
          <li>
            Focus Groups:{" "}
            <ul>
              {detailsModalObject.groups?.focus.map((group) => (
                <li>{props.groups.find((x) => x.id === group).name}</li>
              ))}
            </ul>
          </li>
          <li>
            Additional Groups:{" "}
            <ul>
              {detailsModalObject.groups?.additional.map((group) => (
                <li>{props.groups.find((x) => x.id === group).name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </CenteredModal>
    </>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(InterviewListPage);
