import React, { useEffect, useReducer } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getSuperAdmin, updateSuperAdmin } from "../../api/super_admin_api";
import useAuth from "../../hooks/useAuth";
import tryCatch from "../TryCatch";

const initialState = {
  name: "",
  userName: "",
};

const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "name":
      return { ...state, name: payload };
    case "userName":
      return { ...state, userName: payload };
    case "updateState":
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function SuperAdminProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { uuid } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, userName } = state;
    const [userData, userError] = await tryCatch(
      updateSuperAdmin(token, name, userName, uuid)
    );

    if (!userError) {
      window.alert("User Updated Successfully");
      navigate(-1);
    } else {
      window.alert("Something went wrong");
    }
  };

  const getUserDetails = async () => {
    const [superAdminData, superAdminError] = await tryCatch(
      getSuperAdmin(token, uuid)
    );
    if (!superAdminError) {
      const {
        user: { user_name: name, login_name: userName },
      } = superAdminData.data;
      dispatch({ type: "updateState", payload: { name, userName } });
    } else {
      console.log(superAdminError.response);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
        <Form.Label>User Name</Form.Label>
        <Form.Control
          onChange={changeHandler}
          required
          name="userName"
          type="text"
          placeholder="Admin"
          value={state.userName}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
