import React from "react";
import AttributeGroup from "./AttributeGroup";
import AddGroupToInterviewForm from "./AddGroupToInterviewForm";

class CreateInterview extends React.Component {
  state = {
    groupSelect: [
      { id: 0, name: "Soft skills", attrs: ["Intelligence", "Humor"] },
      { id: 1, name: "Technical attributes", attrs: ["C++", "C#"] },
    ],
    focusGroups: [],
    additionalGroups: [],
    selectedGroup: null,
    focusGroupChecked: false,
  };

  handleGroupSelectChange = (e) => {
    this.setState({
      selectedGroup: this.state.groupSelect.find(
        (x) => x.id === parseInt(e.target.value)
      ),
    });
  };

  handleGroupAddSubmit = (e) => {
    e.preventDefault();
    const group = this.state.selectedGroup;
    let groups = this.state.focusGroups.concat(this.state.additionalGroups);
    if (groups.filter((x) => x.id === group.id).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (this.state.focusGroupChecked) {
      this.setState({ focusGroups: [...this.state.focusGroups, group] });
    } else {
      this.setState({
        additionalGroups: [...this.state.additionalGroups, group],
      });
    }
  };

  handleFocusGroupCheckChange = (e) => {
    this.setState({ focusGroupChecked: e.target.checked });
  };

  handleNewAttrSubmit = (group) => {
    let groups = this.state.groupSelect;
    let selectedGroup = groups.find((x) => x.id === group.id);
    selectedGroup.attrs = group.attrs;
    this.setState({ groupSelect: groups });
  };

  handleAttrRemove = (group, attr) => {
    let groups = this.state.groupSelect;
    let selectedGroup = groups.find((x) => x.id === group.id);
    selectedGroup.attrs = group.attrs.filter((e) => e !== attr);
    this.setState({ groupSelect: groups });
  };

  render() {
    return (
      <>
        <div className="container mt-4">
          <AddGroupToInterviewForm
            handleGroupAddSubmit={this.handleGroupAddSubmit}
            handleFocusGroupCheckChange={this.handleFocusGroupCheckChange}
            groupSelect={this.state.groupSelect}
            handleGroupSelectChange={this.handleGroupSelectChange}
            selectedGroup={this.state.selectedGroup}
          />

          {/* Button to add a new group, currently not functional
          <button className="btn btn-success col-2 d-flex offset-2 mt-1">
            New Group
          </button> */}
          <div className="list-group-flush">
            {this.state.focusGroups.length > 0 && (
              <div className="list-group-item card">
                <h2>Focus Groups</h2>
                {this.state.focusGroups.map((group) => (
                  <AttributeGroup
                    key={group.id}
                    group={group}
                    handleNewAttrSubmit={this.handleNewAttrSubmit}
                    handleAttrRemove={this.handleAttrRemove}
                  />
                ))}
              </div>
            )}
            {this.state.additionalGroups.length > 0 && (
              <div className="list-group-item">
                <h2>Additional Groups</h2>
                {this.state.additionalGroups.map((group) => (
                  <AttributeGroup
                    key={group.id}
                    group={group}
                    handleNewAttrSubmit={this.handleNewAttrSubmit}
                    handleAttrRemove={this.handleAttrRemove}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CreateInterview;
