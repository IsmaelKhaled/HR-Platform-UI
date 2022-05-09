import React from "react";
import NumberInput from "../Common/FormInputs/NumberInput";
import TextInput from "../Common/FormInputs/TextInput";
import FormCard from "../Common/FormCard";

export default function TestForm(props) {
  const title = props.test.id ? "Edit Test" : "Create New Test";
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
            value={props.test.name}
            onChange={props.onChange}
            required
          />
          <NumberInput
            name="maxScore"
            label="Max Score"
            value={props.test.maxScore}
            onChange={props.onChange}
          />
          <NumberInput
            name="acceptanceScore"
            label="Acceptance Score"
            value={props.test.acceptanceScore}
            onChange={props.onChange}
          />
          <TextInput
            name="URL"
            label="Test URL"
            value={props.test.URL}
            onChange={props.onChange}
            required
          />
          <NumberInput
            name="duration"
            label="Duration"
            value={props.test.duration}
            onChange={props.onChange}
            required
          />
          <button className="btn btn-primary col-6 offset-3" type="submit">
            Save
          </button>
        </form>
      </FormCard>
    </>
  );
}
