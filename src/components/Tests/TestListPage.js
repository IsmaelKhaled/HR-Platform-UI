import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as testActions from "../../redux/actions/testActions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CenteredModal from "../Common/CenteredModal";
import ListTable from "../Common/ListTable";


function TestListPage(props) {
  const [detailsModalShown, setDetailsModalShown] = useState(false);
  const [detailsModalObject, setDetailsModalObject] = useState({});

  useEffect(() => {
    const { tests, actions } = props;

    if (tests.length === 0) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed: " + error);
      });
    }
  })

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
        {props.tests.length > 0 && (
          <ListTable>
            <ListTable.Header>
              <tr>
                <th>Name</th>
                <th className="d-none d-md-table-cell">
                  Duration <div className="text-muted">(in minutes)</div>
                </th>
                <th>Acceptance Score</th>
                <th></th>
              </tr>
            </ListTable.Header>
            <ListTable.Body>
              {props.tests.map((test) => (
                <tr key={test.id} onClick={() => showDetailsModal(test)}>
                  <td>{test.name}</td>
                  <td className="d-none d-md-table-cell">{test.duration}</td>
                  <td>
                    {test.acceptanceScore} / {test.maxScore}
                  </td>
                  <td>
                    <div className="d-flex justify-content-end">
                      <div className="btn-group">
                        <Button
                          as={Link}
                          to={`/tests/${test.id}`}
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
            <li>{detailsModalObject.duration} minutes</li>
            <li>
              {detailsModalObject.acceptanceScore} /{" "}
              {detailsModalObject.maxScore}
            </li>
          </ul>
        </CenteredModal>
      </>
  )
}



function mapStateToProps(state) {
  return {
    tests: state.tests,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTests: bindActionCreators(testActions.loadTests, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestListPage);
