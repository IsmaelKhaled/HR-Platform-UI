import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import * as interviewActions from "../../redux/actions/interviewActions";
import { withRouter } from "../Common/Wrappers/withRouter";
import InterviewForm from "./InterviewForm";
import { emptyInterview } from "../../json-mock-api/mockData";
import { useNavigate, useParams } from "react-router-dom";

function InterviewManagePage(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [state, setState] = useState({
    selectedGroupId: "",
    focusGroupChecked: false,
    createModalShow: false,
    interview: useSelector((state) =>
      id && state.interviews.length > 0
        ? getInterviewById(state.interviews, id)
        : emptyInterview
    ),
  });

  useEffect(() => {
    const { groups, interviews, actions } = props;

    if (groups.length === 0) {
      actions.loadGroups().catch((error) => {
        alert("Loading groups failed: " + error);
      });
    }
    if (interviews.length === 0) {
      actions.loadInterviews().catch((error) => {
        alert("Loading interviews failed: " + error);
      });
    }
  });

  const handleGroupAddSubmit = (e) => {
    e.preventDefault();
    const groupId = state.selectedGroupId;
    const groupsIds = state.interview.groups.focus.concat(
      state.interview.groups.additional
    );
    if (groupsIds.filter((x) => x === groupId).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (state.focusGroupChecked) {
      setState({
        interview: {
          ...state.interview,
          groups: {
            ...state.interview.groups,
            focus: [...state.interview.groups.focus, groupId],
          },
        },
      });
    } else {
      setState({
        interview: {
          ...state.interview,
          groups: {
            ...state.interview.groups,
            additional: [...state.interview.groups.additional, groupId],
          },
        },
      });
    }
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleInterviewChange = (event) => {
    setState({
      interview: {
        ...state.interview,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSave = () => {
    props.actions
      .saveInterview(state.interview)
      .then(() => {
        navigate("/interviews/");
      })
      .catch((error) => {
        alert("Saving interview failed: " + error);
      });
  };

  return (
    <InterviewForm
      interview={state.interview}
      groups={props.groups}
      onSave={handleSave}
      onChange={handleChange}
      handleInterviewChange={handleInterviewChange}
      selectedGroupId={state.selectedGroupId}
      handleGroupAddSubmit={handleGroupAddSubmit}
    />
  );
}

export function getInterviewById(interviews, id) {
  return interviews.find((interview) => interview.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const interviewId = ownProps.params?.id;
  const interview =
    interviewId && state.interviews.length > 0
      ? getInterviewById(state.interviews, interviewId)
      : emptyInterview;

  return {
    groups: state.groups,
    interviews: state.interviews,
    interview,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadGroups: bindActionCreators(groupActions.loadGroups, dispatch),
      saveInterview: bindActionCreators(
        interviewActions.saveInterview,
        dispatch
      ),
      loadInterviews: bindActionCreators(
        interviewActions.loadInterviews,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InterviewManagePage);
