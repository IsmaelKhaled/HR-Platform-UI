import React, { Component } from "react";

export default class AddGroupToInterviewForm extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form
            onSubmit={this.props.handleGroupAddSubmit}
            className="row align-items-center gy-2 gx-3"
          >
            <div className="col-md-6 col-12">
              <select
                name="selectedGroupId"
                className="form-select"
                onChange={this.props.handleChange}
              >
                <option value="">---</option>
                {this.props.groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-check col-auto">
              <input
                className="form-check-input"
                type="checkbox"
                id="focus_group_check"
                name="focusGroupChecked"
                onChange={this.props.handleChange}
              />
              <label className="form-check-label" htmlFor="focus_group_check">
                Focus Group?
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary col-md-2 col-xs ms-auto me-4"
              disabled={!this.props.selectedGroupId}
            >
              Add Group
            </button>
            <button
              type="button"
              className="btn btn-dark col-md-2 col-xs "
              onClick={this.props.showModal}
            >
              Create group
            </button>
          </form>
        </div>
      </div>
    );
  }
}
