import React, { Component } from "react";

export class AttributeGroup extends Component {
  state = {
    attrInput: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let group = this.props.group;
    this.props.handleNewAttrSubmit(group, this.state.attrInput);
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
        <div className="row align-items-center mt-2">
          <p className="d-inline-block col-auto mb-0">
            {this.props.group.name}
          </p>
          <form
            onSubmit={this.handleSubmit}
            className="row d-flex mb-2 ms-auto col-sm-6 col-xs"
          >
            <div className="input-group">
              <input
                type="text"
                name="new-attr"
                key={this.props.group.id}
                onChange={this.handleChange}
                placeholder={`Add new attribute to ${this.props.group.name}`}
                className="form-control"
              />
              <button type="submit" className="btn btn-outline-success">
                &#43;
              </button>
            </div>
          </form>
        </div>
        <div className="list-group">
          {this.props.group.attrs.map((attr) => (
            <div
              key={attr}
              className="list-group-item justify-content-between d-flex"
              style={{ borderLeft: "5px solid grey" }}
            >
              <div className="col-9">{attr}</div>
              <button
                className="btn btn-danger"
                onClick={() => this.handleRemove(attr)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default AttributeGroup;
