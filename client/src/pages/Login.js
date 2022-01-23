import { React, useReducer, useContext } from "react";

import { login } from "../api/login_api";
import { createCookie } from "../api/cookie_api";
import "../css/login-page.css";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

const initialState = {
  user: "",
  password: "",
  isCorrectDetails: true,
  auth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "user":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "password":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "isCorrectDetails":
      return {
        ...state,
        isCorrectDetails: action.payload,
      };
    default:
      return state;
  }
}

function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateAuthInfo } = useContext(AuthContext);

  const handleChange = (e) => {
    dispatch({
      type: e.target.name,
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const setIsCorrectDetails = (boolean) => {
    dispatch({
      type: "isCorrectDetails",
      payload: boolean,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { user, password } = state;
    login(user, password).then((res) => {
      if (res.data.status === "OK") {
        const { token, userType, userId } = res.data;
        setIsCorrectDetails(true);
        createCookie("token", token, 10 * 60);
        updateAuthInfo(true, token, userId, userType, "login");
      } else {
        setIsCorrectDetails(false);
      }
    });
  };

  return (
    <div className="login_main">
      <div className="login_form">
        <div className="login_form_logo">
          <h1>School Management</h1>
        </div>
        <Form onSubmit={handleSubmit} id="login_form">
          <FloatingLabel
            controlId="floatingInput"
            label="User Name"
            className="mb-3"
          >
            <Form.Control
              required
              name="user"
              type="text"
              onChange={handleChange}
              placeholder="User Name"
              value={state.user}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              required
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Password"
              value={state.password}
            />
          </FloatingLabel>
          <Button
            type="submit"
            form="login_form"
            className="form_submit_button"
            variant="outline-primary"
          >
            Login
          </Button>
          <p className="validation_password mt-2">
            {state.isCorrectDetails
              ? ""
              : "User Name and Password does'nt match!"}
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
