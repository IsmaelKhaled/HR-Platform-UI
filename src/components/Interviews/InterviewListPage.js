import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListTable from "../Common/ListTable";
import CenteredModal from "../Common/CenteredModal";
import { Button } from "react-bootstrap";
import { useGetAllGroupsQuery } from "../../redux/services/group";
import {
  useDeleteInterviewMutation,
  useGetAllInterviewsQuery,
} from "../../redux/services/interview";

function InterviewListPage(props) {
  const [detailsModalShown, setDetailsModalShown] = useState(false);
  const [detailsModalObject, setDetailsModalObject] = useState({});
  const { data: groups } = useGetAllGroupsQuery();
  const { data: interviews } = useGetAllInterviewsQuery();

  const [deleteInterview] = useDeleteInterviewMutation();

  const showDetailsModal = (obj) => {
    setDetailsModalShown(true);
    setDetailsModalObject(obj);
  };

  const hideDetailsModal = () => {
    setDetailsModalShown(false);
  };

  return (
    <>
      <div className="d-flex">
        <Button
          variant="outline-dark"
          as={Link}
          to="/interviews/create"
          xs={1}
          className="ms-auto mb-2"
        >
          New Interview
        </Button>
      </div>
      {interviews?.length > 0 ? (
        <ListTable>
          <ListTable.Header>
            <tr>
              <th>Name</th>
              <th>Groups</th>
              <th>Created by</th>
              <th></th>
            </tr>
          </ListTable.Header>
          <ListTable.Body>
            {interviews.map((interview) => (
              <tr
                key={interview.id}
                onClick={() => showDetailsModal(interview)}
              >
                <td>{interview.name}</td>
                <td>
                  {interview.groups.focus.length +
                    interview.groups.additional.length}
                </td>
                <td>{interview.createdBy || "-"}</td>
                <td>
                  <div className="d-flex justify-content-end">
                    <div className="btn-group">
                      <Button
                        as={Link}
                        to={`/interviews/${interview.id}`}
                        variant="outline-success"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteInterview({ interview })}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </ListTable.Body>
        </ListTable>
      ) : (
        <h2 className="text-muted text-center display-2">No interviews yet</h2>
      )}
      <CenteredModal
        show={detailsModalShown}
        title={detailsModalObject.name}
        onHide={hideDetailsModal}
      >
        <ul>
          <li>
            Focus Groups:{" "}
            <ul>
              {detailsModalObject.groups?.focus.map((group) => (
                <li key={group}>{groups.find((x) => x.id === group).name}</li>
              ))}
            </ul>
          </li>
          <li>
            Additional Groups:{" "}
            <ul>
              {detailsModalObject.groups?.additional.map((group) => (
                <li key={group}>{groups.find((x) => x.id === group).name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </CenteredModal>
    </>
  );
}

export default InterviewListPage;
