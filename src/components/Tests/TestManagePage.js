import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TestForm from "./TestForm";
import { emptyTest } from "../../json-mock-api/mockData";
import {
  useGetAllTestsQuery,
  useSaveTestMutation,
} from "../../redux/services/test";

function TestManagePage(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [test, setTest] = useState(emptyTest);

  const { data: tests } = useGetAllTestsQuery();
  const [saveTest] = useSaveTestMutation();

  useEffect(() => {
    if (id && tests?.length > 0) {
      setTest(getTestById(tests, id) || emptyTest);
    }
  }, [tests, id]);

  const handleChange = (event) => {
    setTest({ ...test, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveTest({ test })
      .then(navigate("/tests/"))
      .catch((error) => {
        alert("Saving test failed. Error: " + error);
      });
  };
  return (
    <>
      <div className="col-md-6 offset-md-3 col">
        <TestForm test={test} onChange={handleChange} onSubmit={handleSubmit} />
      </div>
    </>
  );
}

function getTestById(tests, id) {
  return tests.find((test) => test.id === id) || null;
}

export default TestManagePage;
