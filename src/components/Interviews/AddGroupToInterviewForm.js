import React, { Component } from "react";

export default class AddGroupToInterviewForm extends Component {
  render() {
    return (
      <form
        onSubmit={this.props.handleGroupAddSubmit}
        className="row align-items-center"
      >
        <div className="col-6">
          <select
            name="group"
            className="form-select"
            onChange={this.props.handleGroupSelectChange}
          >
            <option>---</option>
            {this.props.groupSelect.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-check d-inline-block col-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="focus_group_check"
            onChange={this.props.handleFocusGroupCheckChange}
          />
          <label className="form-check-label" htmlFor="focus_group_check">
            Focus Group?
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary col-2"
          disabled={!this.props.selectedGroup}
        >
          Add Group
        </button>
      </form>
    );
  }
}
