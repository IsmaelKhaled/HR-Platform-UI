import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import * as interviewActions from "../../redux/actions/interviewActions";
import { withRouter } from "../Common/withRouter";
import InterviewForm from "./InterviewForm";
import { emptyInterview } from "../../json-mock-api/mockData";

class CreateInterview extends React.Component {
  state = {
    selectedGroupId: "",
    focusGroupChecked: false,
    newGroupName: "",
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
    let groupsIds = this.state.interview.groups.focus.concat(
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

  handleAttrAdd = (group, attr) => {
    if (!attr) {
      return;
    }
    this.props.actions.addAttribute(group, attr).catch((error) => {
      alert("Adding attribute failed: " + error);
    });
  };

  handleAttrRemove = (group, attr) => {
    this.props.actions.removeAttribute(group, attr).catch((error) => {
      alert("Removing attribute failed: " + error);
    });
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

  handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    this.props.actions
      .createGroup(this.state.newGroupName)
      .then(() => {
        this.setState({ createModalShow: false });
      })
      .catch((error) => {
        alert("Creating new group failed: " + error);
      });
  };

  showModal = () => {
    this.setState({ createModalShow: true });
  };

  hideModal = () => {
    this.setState({ createModalShow: false });
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
          handleGroupAddSubmit={this.handleGroupAddSubmit}
          selectedGroupId={this.state.selectedGroupId}
          handleAttrAdd={this.handleAttrAdd}
          handleAttrRemove={this.handleAttrRemove}
          handleCreateGroupSubmit={this.handleCreateGroupSubmit}
          createModalShow={this.state.createModalShow}
          showModal={this.showModal}
          hideModal={this.hideModal}
          handleInterviewChange={this.handleInterviewChange}
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
      addAttribute: bindActionCreators(groupActions.addAttribute, dispatch),
      removeAttribute: bindActionCreators(
        groupActions.removeAttribute,
        dispatch
      ),
      createGroup: bindActionCreators(groupActions.createGroup, dispatch),
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
  connect(mapStateToProps, mapDispatchToProps)(CreateInterview)
);
