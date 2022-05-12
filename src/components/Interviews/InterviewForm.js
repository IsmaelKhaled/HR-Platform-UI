import React, { useState } from "react";
import GroupsList from "./GroupsList";
import GroupSelectForm from "./GroupSelectForm";
import CreateGroupModal from "./CreateGroupModal";
import FormCard from "../Common/FormCard";
import {
  useCreateGroupMutation,
  useGetAllGroupsQuery,
} from "../../redux/services/group";

function InterviewForm(props) {
  const [createModalShow, setCreateModalShow] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [createGroup] = useCreateGroupMutation();

  const { data: groups } = useGetAllGroupsQuery();

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setNewGroupName(value);
  };

  const handleCreateGroupSubmit = (e) => {
    e.preventDefault();
    createGroup({ name: newGroupName }).then(() => {
      setCreateModalShow(false);
    });
  };

  const showModal = () => {
    setCreateModalShow(true);
  };

  const hideModal = () => {
    setCreateModalShow(false);
  };
  const title = props.interview.id ? "Edit Interview" : "Create Interview";

  return (
    <FormCard title={title}>
      <div className="input-group">
        <input
          type="text"
          id="interview-name"
          name="name"
          className="form-control"
          value={props.interview.name}
          onChange={props.handleInterviewChange}
        />
        <button className="btn btn-success" onClick={props.onSave}>
          Save Interview
        </button>
      </div>

      <GroupSelectForm
        handleGroupAddSubmit={props.handleGroupAddSubmit}
        groups={groups}
        handleChange={props.onChange}
        selectedGroupId={props.selectedGroupId}
        showModal={showModal}
      />

      <GroupsList
        focusGroups={props.interview.groups.focus.map((groupId) =>
          groups.find((group) => group.id === groupId)
        )}
        additionalGroups={props.interview.groups.additional.map((groupId) =>
          groups.find((group) => group.id === groupId)
        )}
      />

      <CreateGroupModal
        hideModal={hideModal}
        showModal={showModal}
        show={createModalShow}
        handleCreateGroupSubmit={handleCreateGroupSubmit}
        onChange={handleChange}
      />
    </FormCard>
  );
}

export default InterviewForm;
