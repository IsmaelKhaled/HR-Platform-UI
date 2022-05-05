import React, { Component } from "react";
import NumberInput from "../Common/FormInputs/NumberInput";
import TextInput from "../Common/FormInputs/TextInput";
import FormCard from "../Common/FormCard";

export default class TestForm extends Component {
  render() {
    const title = this.props.test.id ? "Edit Test" : "Create New Test";
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
          <form onSubmit={this.props.onSubmit} className="row gy-3">
            <TextInput
              name="name"
              label="Name"
              value={this.props.test.name}
              onChange={this.props.onChange}
              required
            />
            <NumberInput
              name="maxScore"
              label="Max Score"
              value={this.props.test.maxScore}
              onChange={this.props.onChange}
            />
            <NumberInput
              name="acceptanceScore"
              label="Acceptance Score"
              value={this.props.test.acceptanceScore}
              onChange={this.props.onChange}
            />
            <TextInput
              name="URL"
              label="Test URL"
              value={this.props.test.URL}
              onChange={this.props.onChange}
              required
            />
            <NumberInput
              name="duration"
              label="Duration"
              value={this.props.test.duration}
              onChange={this.props.onChange}
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
}
