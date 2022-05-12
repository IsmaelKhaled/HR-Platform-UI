import React, { useState } from "react";
import {
  useAddGroupAttributeMutation,
  useDeleteGroupAttributeMutation,
} from "../../redux/services/group";

function AttributeGroup(props) {
  const [attrInput, setAttrInput] = useState("");
  const [addAttribute] = useAddGroupAttributeMutation();
  const [deleteAttribute] = useDeleteGroupAttributeMutation();

  const handleChange = (e) => {
    setAttrInput(e.target.value);
  };

  return (
    <>
      <div className="row align-items-center mt-2">
        <p className="d-inline-block col-auto mb-0">{props.group.name}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addAttribute({ group: props.group, attr: attrInput });
          }}
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
              onClick={() => deleteAttribute({ group: props.group, attr })}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default AttributeGroup;
