import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListTable from "../Common/ListTable";
import CenteredModal from "../Common/CenteredModal";
import { useGetAllProcessesQuery } from "../../redux/services/process";

function ProcessListPage() {
  const [detailsModalShown, setDetailsModalShown] = useState(false);
  const [detailsModalObject, setDetailsModalObject] = useState({});

  const { data: processes } = useGetAllProcessesQuery();

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
          to="/processes/create"
          xs={1}
          className="ms-auto mb-2"
        >
          New Process
        </Button>
      </div>
      {processes?.length > 0 && (
        <ListTable>
          <ListTable.Header>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th># of Steps</th>
              <th></th>
            </tr>
          </ListTable.Header>
          <ListTable.Body>
            {processes.map((process) => (
              <tr key={process.id} onClick={() => showDetailsModal(process)}>
                <td>{process.name}</td>
                <td className="d-none d-md-table-cell">
                  {process.description}
                </td>
                <td></td>
                <td>
                  <div className="d-flex justify-content-end">
                    <div className="btn-group">
                      <Button
                        as={Link}
                        to={`/processes/${process.id}`}
                        variant="outline-success"
                      >
                        Edit
                      </Button>
                      <Button variant="outline-danger">Delete</Button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </ListTable.Body>
        </ListTable>
      )}
      <CenteredModal
        show={detailsModalShown}
        title={detailsModalObject.name}
        onHide={hideDetailsModal}
      >
        <ul>
          <li>{detailsModalObject.name}</li>
          <li>{detailsModalObject.description}</li>
        </ul>
      </CenteredModal>
    </>
  );
}

export default ProcessListPage;
