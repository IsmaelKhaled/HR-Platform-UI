import React from "react";
import AddGroupToInterviewForm from "./AddGroupToInterviewForm";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";
import GroupsList from "./GroupsList";
import { Modal, Button } from "react-bootstrap";

class CreateInterview extends React.Component {
  state = {
    focusGroupsIds: [],
    additionalGroupsIds: [],
    selectedGroupId: "",
    focusGroupChecked: false,
    newGroupName: "",
    createModalShow: false,
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
    const groupId = this.state.selectedGroupId;
    let groupsIds = this.state.focusGroupsIds.concat(
      this.state.additionalGroupsIds
    );
    if (groupsIds.filter((x) => x === groupId).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (this.state.focusGroupChecked) {
      this.setState({
        focusGroupsIds: [...this.state.focusGroupsIds, groupId],
      });
    } else {
      this.setState({
        additionalGroupsIds: [...this.state.additionalGroupsIds, groupId],
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
        <div class="container">
          <AddGroupToInterviewForm
            handleGroupAddSubmit={this.handleGroupAddSubmit}
            groups={this.props.groups}
            handleChange={this.handleChange}
            selectedGroupId={this.state.selectedGroupId}
            showModal={this.showModal}
          />

          <GroupsList
            focusGroups={this.state.focusGroupsIds.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            additionalGroups={this.state.additionalGroupsIds.map((groupId) =>
              this.props.groups.find((group) => group.id === groupId)
            )}
            handleNewAttrSubmit={this.handleAttrAdd}
            handleAttrRemove={this.handleAttrRemove}
          />

          <Modal show={this.state.createModalShow} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleCreateGroupSubmit}>
                <div className="input-group">
                  <input
                    id="newGroupName"
                    name="newGroupName"
                    placeholder="Group name"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleCreateGroupSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
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
      createGroup: bindActionCreators(groupActions.createGroup, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInterview);
