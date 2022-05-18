import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CenteredModal from "../Common/CenteredModal";
import ListTable from "../Common/ListTable";
import {
  useDeleteTestMutation,
  useGetAllTestsQuery,
} from "../../redux/services/test";

function TestListPage(props) {
  const [detailsModalShown, setDetailsModalShown] = useState(false);
  const [detailsModalObject, setDetailsModalObject] = useState({});

  const { data: tests } = useGetAllTestsQuery();
  const [deleteTest] = useDeleteTestMutation();

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
          to="/tests/create"
          xs={1}
          className="ms-auto mb-2"
        >
          New Test
        </Button>
      </div>
      {tests?.length > 0 ? (
        <ListTable>
          <ListTable.Header>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">
                Duration <div className="text-muted">(in minutes)</div>
              </th>
              <th>Acceptance Score</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </ListTable.Header>
          <ListTable.Body>
            {tests.map((test) => (
              <tr key={test.id} onClick={() => showDetailsModal(test)}>
                <td>{test.name}</td>
                <td className="d-none d-md-table-cell">{test.duration}</td>
                <td>
                  {test.acceptanceScore} / {test.maxScore}
                </td>
                <td>{test.createdBy || "-"}</td>
                <td>
                  <div className="d-flex justify-content-end">
                    <div className="btn-group flex-column flex-md-row">
                      <Button
                        as={Link}
                        to={`/tests/${test.id}`}
                        variant="outline-success"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          deleteTest({ test });
                        }}
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
        <h2 className="text-muted text-center display-2">No tests yet</h2>
      )}
      <CenteredModal
        show={detailsModalShown}
        title={detailsModalObject.name}
        onHide={hideDetailsModal}
      >
        <ul>
          <li>{detailsModalObject.name}</li>
          <li>{detailsModalObject.duration} minutes</li>
          <li>
            {detailsModalObject.acceptanceScore} / {detailsModalObject.maxScore}
          </li>
        </ul>
      </CenteredModal>
    </>
  );
}

export default TestListPage;
