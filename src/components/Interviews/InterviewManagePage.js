import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InterviewForm from "./InterviewForm";
import { emptyInterview } from "../../json-mock-api/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllGroupsQuery } from "../../redux/services/group";
import {
  useGetAllInterviewsQuery,
  useSaveInterviewMutation,
} from "../../redux/services/interview";

function InterviewManagePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: groups, isLoading: groupsIsLoading } = useGetAllGroupsQuery();
  const { data: interviews, isLoading: interviewsIsLoading } =
    useGetAllInterviewsQuery();

  const [saveInterview] = useSaveInterviewMutation();

  const [state, setState] = useState({
    selectedGroupId: "",
    focusGroupChecked: false,
    createModalShow: false,
    interview: useSelector((state) =>
      id && interviews?.length > 0
        ? getInterviewById(interviews, id)
        : emptyInterview
    ),
  });

  useEffect(() => {
    setState({
      interview:
        id && interviews?.length > 0
          ? getInterviewById(interviews, id)
          : emptyInterview,
    });
  }, [id, interviews]);

  const handleGroupAddSubmit = (e) => {
    e.preventDefault();
    const groupId = state.selectedGroupId;
    const groupsIds = state.interview.groups.focus.concat(
      state.interview.groups.additional
    );
    if (groupsIds.filter((x) => x === groupId).length > 0) {
      alert("This group is already added!");
      return;
    }
    if (state.focusGroupChecked) {
      setState({
        interview: {
          ...state.interview,
          groups: {
            ...state.interview.groups,
            focus: [...state.interview.groups.focus, groupId],
          },
        },
      });
    } else {
      setState({
        interview: {
          ...state.interview,
          groups: {
            ...state.interview.groups,
            additional: [...state.interview.groups.additional, groupId],
          },
        },
      });
    }
  };

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const handleInterviewChange = (event) => {
    setState({
      interview: {
        ...state.interview,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSave = () => {
    saveInterview({ interview: state.interview })
      .then(() => {
        navigate("/interviews/");
      })
      .catch((error) => {
        alert("Saving interview failed: " + error);
      });
  };

  return (
    <>
      {groupsIsLoading || interviewsIsLoading ? (
        "Loading..."
      ) : (
        <InterviewForm
          interview={state.interview}
          groups={groups}
          onSave={handleSave}
          onChange={handleChange}
          handleInterviewChange={handleInterviewChange}
          selectedGroupId={state.selectedGroupId}
          handleGroupAddSubmit={handleGroupAddSubmit}
        />
      )}
    </>
  );
}

export function getInterviewById(interviews, id) {
  return interviews.find((interview) => interview.id === id) || null;
}

export default InterviewManagePage;
