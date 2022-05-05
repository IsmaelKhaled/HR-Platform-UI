import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import GroupsList from "./GroupsList";
import GroupSelectForm from "./GroupSelectForm";
import CreateGroupModal from "./CreateGroupModal";

class InterviewForm extends Component {
  state = {
    createModalShow: false,
    newGroupName: "",
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

  render() {
    return (
      <>
        <div className="container">
          <div className="input-group">
            <input
              type="text"
              id="interview-name"
              name="name"
              className="form-control"
              value={this.props.interview.name}
              onChange={this.props.handleInterviewChange}
            />
            <button className="btn btn-success" onClick={this.props.onSave}>
              Save Interview
            </button>
          </div>

          <GroupSelectForm
            handleGroupAddSubmit={this.props.handleGroupAddSubmit}
            groups={this.props.groups}
            handleChange={this.props.onChange}
            selectedGroupId={this.props.selectedGroupId}
            showModal={this.showModal}
          />

          <GroupsList
            focusGroups={this.props.interview.groups.focus.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            additionalGroups={this.props.interview.groups.additional.map(
              (groupId) =>
                this.props.groups.find((group) => group.id === groupId)
            )}
          />

          <CreateGroupModal
            hideModal={this.hideModal}
            showModal={this.showModal}
            show={this.state.createModalShow}
            handleCreateGroupSubmit={this.handleCreateGroupSubmit}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createGroup: bindActionCreators(groupActions.createGroup, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewForm);
