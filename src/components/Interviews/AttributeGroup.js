import React, { Component } from "react";

export class AttributeGroup extends Component {
  state = {
    attrInput: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let group = this.props.group;
    let modifiedGroup = {
      ...group,
      attrs: [...group.attrs, this.state.attrInput],
    };
    this.props.handleNewAttrSubmit(modifiedGroup);
  };
  handleChange = (e) => {
    this.setState({ attrInput: e.target.value });
  };
  handleRemove = (attr) => {
    let group = this.props.group;
    this.props.handleAttrRemove(group, attr);
  };
  render() {
    return (
      <>
        <p className="fw-bold">{this.props.group.name}</p>
        <form onSubmit={this.handleSubmit} className="row d-flex mb-2">
          <div className="col-4">
            <input
              type="text"
              name="new-attr"
              key={this.props.group.id}
              onChange={this.handleChange}
              placeholder={`Add new attribute to ${this.props.group.name}`}
              className="form-control col-4"
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning d-inline-block col-1"
          >
            Add
          </button>
        </form>
        <div className="list-group">
          {this.props.group.attrs.map((attr) => (
            <div
              key={attr}
              className="list-group-item row justify-content-between d-flex"
              style={{ borderLeft: "5px solid grey" }}
            >
              <div className="col-10">{attr}</div>
              <div className="btn-group col-2">
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleRemove(attr)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default AttributeGroup;
