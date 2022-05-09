import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as groupActions from "../../redux/actions/groupActions";

function AttributeGroup(props) {
  const [attrInput, setAttrInput] = useState("");

  const handleChange = (e) => {
    setAttrInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let group = props.group;
    props.actions.addAttribute(group, attrInput).catch((error) => {
      alert("Adding attribute failed: " + error);
    });
  };
  const handleRemove = (attr) => {
    let group = props.group;
    props.actions.removeAttribute(group, attr).catch((error) => {
      alert("Removing attribute failed: " + error);
    });
  };

  return (
    <>
      <div className="row align-items-center mt-2">
        <p className="d-inline-block col-auto mb-0">{props.group.name}</p>
        <form
          onSubmit={handleSubmit}
          className="row d-flex mb-2 ms-md-auto col-sm-6 col-xs"
        >
          <div className="input-group">
            <input
              type="text"
              name="new-attr"
              key={props.group.id}
              onChange={handleChange}
              placeholder={`Add new attribute to ${props.group.name}`}
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-success">
              &#43;
            </button>
          </div>
        </form>
      </div>
      <div className="list-group">
        {props.group.attrs.map((attr) => (
          <div
            key={attr}
            className="list-group-item justify-content-between d-flex"
            style={{ borderLeft: "5px solid grey" }}
          >
            <div className="col-9">{attr}</div>
            <button
              className="btn btn-danger"
              onClick={() => handleRemove(attr)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addAttribute: bindActionCreators(groupActions.addAttribute, dispatch),
      removeAttribute: bindActionCreators(
        groupActions.removeAttribute,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttributeGroup);
