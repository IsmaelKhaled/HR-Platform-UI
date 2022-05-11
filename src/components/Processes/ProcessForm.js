import React from "react";
import TextInput from "../Common/FormInputs/TextInput";
import FormCard from "../Common/FormCard";
import ProcessSteps from "./ProcessSteps";

export default function ProcessForm(props) {
  const title = props.process.id ? "Edit Process" : "Create New Process";
  return (
    <>
      <FormCard
        title={title}
        formText={
          <>
            <span className="text-danger">*</span> indicates required fields
          </>
        }
      >
        <form onSubmit={props.onSubmit} className="row gy-3">
          <TextInput
            name="name"
            label="Name"
            value={props.process.name}
            onChange={props.onChange}
            required
          />
          <TextInput
            name="description"
            label="Description"
            value={props.process.description}
            onChange={props.onChange}
          />
          <ProcessSteps steps={props.process.steps} setSteps={props.setSteps} />
          <button className="btn btn-primary col-6 offset-3" type="submit">
            Save
          </button>
        </form>
      </FormCard>
    </>
  );
}
