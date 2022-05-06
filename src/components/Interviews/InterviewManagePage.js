import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import * as interviewActions from "../../redux/actions/interviewActions";
import { withRouter } from "../Common/Wrappers/withRouter";
import InterviewForm from "./InterviewForm";
import { emptyInterview } from "../../json-mock-api/mockData";

class ManageInterview extends React.Component {
  state = {
    selectedGroupId: "",
    focusGroupChecked: false,
    createModalShow: false,
    interview: this.props.interview,
  };

  componentDidMount() {
    const { groups, interviews, actions } = this.props;

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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.interview !== this.props.interview) {
      this.setState({ interview: this.props.interview });
    }
  }

  handleGroupAddSubmit = (e) => {
    e.preventDefault();
    const groupId = this.state.selectedGroupId;
    const groupsIds = this.state.interview.groups.focus.concat(
      this.state.interview.groups.additional
    );
    if (groupsIds.filter((x) => x === groupId).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (this.state.focusGroupChecked) {
      this.setState({
        interview: {
          ...this.state.interview,
          groups: {
            ...this.state.interview.groups,
            focus: [...this.state.interview.groups.focus, groupId],
          },
        },
      });
    } else {
      this.setState({
        interview: {
          ...this.state.interview,
          groups: {
            ...this.state.interview.groups,
            additional: [...this.state.interview.groups.additional, groupId],
          },
        },
      });
    }
  };

  handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  handleInterviewChange = (event) => {
    this.setState({
      interview: {
        ...this.state.interview,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSave = () => {
    this.props.actions
      .saveInterview(this.state.interview)
      .then(() => {
        this.props.navigate("/interviews/");
      })
      .catch((error) => {
        alert("Saving interview failed: " + error);
      });
  };

  render() {
    return (
      <>
        <InterviewForm
          interview={this.state.interview}
          groups={this.props.groups}
          onSave={this.handleSave}
          onChange={this.handleChange}
          handleInterviewChange={this.handleInterviewChange}
          selectedGroupId={this.state.selectedGroupId}
          handleGroupAddSubmit={this.handleGroupAddSubmit}
        />
      </>
    );
  }
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ManageInterview)
);
