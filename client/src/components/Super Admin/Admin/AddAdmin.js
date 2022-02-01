import React, { useEffect, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../../api/admin_api";
import { getAllSchools } from "../../../api/school_api";
import useAuth from "../../../hooks/useAuth";
import tryCatch from "../../TryCatch";

const initialState = {
  name: "",
  userName: "",
  userType: "",
  password: "",
  school: "",
  schoolList: [],
  schoolListLoaded: false,
};

const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "name":
      return { ...state, name: payload };
    case "userName":
      return { ...state, userName: payload };
    case "userType":
      return { ...state, userType: payload };
    case "password":
      return { ...state, password: payload };
    case "school":
      return { ...state, school: payload };
    case "schoolList":
      return { ...state, schoolList: payload };
    case "schoolListLoaded":
      return { ...state, schoolListLoaded: payload };
    default:
      return { ...state };
  }
};

export default function AddAdmin() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { token } = useAuth();

  const getSchools = async () => {
    const [schoolData, schoolError] = await tryCatch(getAllSchools(token));

    if (!schoolError) {
      dispatch({
        type: "schoolList",
        payload: schoolData.data,
      });
    } else {
      console.log(schoolError.response);
    }
    dispatch({
      type: "schoolListLoaded",
      payload: true,
    });
  };

  useEffect(() => {
    getSchools();
  }, []);

  const changeHandler = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, userName, password, school } = state;
    const [adminData, adminError] = await tryCatch(
      addAdmin(token, name, userName, password, school)
    );

    if (!adminError) {
      window.alert("Admin Added Successfully");
      navigate("/home/superadmin/admin");
    } else {
      window.alert("Something Went Wrong");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={changeHandler}
          required
          name="name"
          type="text"
          placeholder="Full Name"
          value={state.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>User Type</Form.Label>
        <Form.Control
          onChange={changeHandler}
          required
          name="userType"
          type="text"
          placeholder="Admin"
          value="Admin"
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>School</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="school"
          value={state.school}
          onChange={changeHandler}
          required
        >
          <option value="" disabled>
            {!state.schoolListLoaded ? "Loading..." : "Select School"}
          </option>
          {state.schoolList.map((el) => (
            <option key={el.uuid} value={el.uuid}>
              {el.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          onChange={changeHandler}
          required
          name="userName"
          type="text"
          placeholder="User Name"
          value={state.userName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={changeHandler}
          required
          name="password"
          type="text"
          placeholder="Password"
          value={state.password}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
