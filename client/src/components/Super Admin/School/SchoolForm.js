import React, { useEffect, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { addSchool, updateSchool } from "../../../api/school_api";
import useAuth from "../../../hooks/useAuth";
import tryCatch from "../../TryCatch";

const initialState = {
  name: "",
  branch: "",
  syllabus: "",
  email: "",
  address: "",
  tel_no: "",
};

const reducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case "name":
      return { ...state, name: payload };
    case "branch":
      return { ...state, branch: payload };
    case "syllabus":
      return { ...state, syllabus: payload };
    case "email":
      return { ...state, email: payload };
    case "address":
      return { ...state, address: payload };
    case "telno":
      return { ...state, tel_no: payload };
    default:
      return { ...state, ...payload };
  }
};

export default function SchoolForm({ initialValue, type }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { uuid } = useParams();

  useEffect(() => {
    dispatch({
      type: "others",
      payload: initialValue,
    });
  }, [initialValue.name, initialValue]);

  const changeHandler = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, branch, syllabus, email, address, tel_no } = state;

    if (type === "add") {
      const [schoolData, schoolError] = await tryCatch(
        addSchool(token, name, branch, syllabus, address, email, tel_no)
      );

      if (!schoolError) {
        window.alert("Record Submitted Successfully");
        navigate("/home/superadmin/school");
      } else {
        console.log(schoolError.response);
        window.alert("Something went wrong");
      }
    } else if (type === "edit") {
      const [schoolData, schoolError] = await tryCatch(
        updateSchool(
          token,
          name,
          branch,
          syllabus,
          address,
          email,
          tel_no,
          uuid
        )
      );

      if (!schoolError) {
        window.alert("Record Updated Successfully");
        navigate("/home/superadmin/school");
      } else {
        console.log(schoolError.response);
        window.alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={changeHandler}
            required
            name="name"
            type="text"
            placeholder="School Name"
            value={state.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBranch">
          <Form.Label>Branch</Form.Label>
          <Form.Control
            onChange={changeHandler}
            name="branch"
            type="text"
            placeholder="Branch"
            value={state.branch}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSyllabus">
          <Form.Label>Syllabus</Form.Label>
          <Form.Control
            onChange={changeHandler}
            name="syllabus"
            required
            type="text"
            placeholder="Syllabus"
            value={state.syllabus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={changeHandler}
            required
            minLength={10}
            name="address"
            type="text"
            placeholder="Address"
            value={state.address}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={changeHandler}
            required
            name="email"
            type="email"
            placeholder="Email"
            value={state.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTel No">
          <Form.Label>Tel No</Form.Label>
          <Form.Control
            onChange={changeHandler}
            required
            name="telno"
            type="text"
            placeholder="Tel No"
            value={state.tel_no}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
