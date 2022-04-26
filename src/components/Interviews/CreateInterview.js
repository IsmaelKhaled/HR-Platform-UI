import React from "react";
import AddGroupToInterviewForm from "./AddGroupToInterviewForm";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import GroupsList from "./GroupsList";

class CreateInterview extends React.Component {
  state = {
    focusGroups: [],
    additionalGroups: [],
    selectedGroupId: -1,
    focusGroupChecked: false,
  };

  componentDidMount() {
    const { groups, actions } = this.props;

    if (groups.length === 0) {
      actions.loadGroups().catch((error) => {
        alert("Loading groups failed: " + error);
      });
    }
  }

  handleGroupAddSubmit = (e) => {
    e.preventDefault();
    const groupId = parseInt(this.state.selectedGroupId);
    let groups = this.state.focusGroups.concat(this.state.additionalGroups);
    if (groups.filter((x) => x.id === groupId).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (this.state.focusGroupChecked) {
      this.setState({ focusGroups: [...this.state.focusGroups, groupId] });
    } else {
      this.setState({
        additionalGroups: [...this.state.additionalGroups, groupId],
      });
    }
  };

  handleAttrAdd = (group, attr) => {
    this.props.actions.addAttribute(group, attr).catch((error) => {
      alert("Adding attribute failed: " + error);
    });
  };

  handleAttrRemove = (group, attr) => {
    this.props.actions.removeAttribute(group, attr);
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

  render() {
    return (
      <>
        <div className="container mt-4">
          <AddGroupToInterviewForm
            handleGroupAddSubmit={this.handleGroupAddSubmit}
            groups={this.props.groups}
            handleChange={this.handleChange}
            selectedGroupId={this.state.selectedGroupId}
          />

          {/* Button to add a new group, currently not functional
          <button className="btn btn-success col-2 d-flex offset-2 mt-1">
            New Group
          </button> */}
          <GroupsList
            focusGroups={this.state.focusGroups.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            additionalGroups={this.state.additionalGroups.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            handleNewAttrSubmit={this.handleAttrAdd}
            handleAttrRemove={this.handleAttrRemove}
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
      loadGroups: bindActionCreators(groupActions.loadGroups, dispatch),
      addAttribute: bindActionCreators(groupActions.addAttribute, dispatch),
      removeAttribute: bindActionCreators(
        groupActions.removeAttribute,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInterview);
