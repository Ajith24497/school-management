import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { userTypes } from "../components/UserTypes";

export const AuthContext = createContext();

const initialState = {
  isAuth: false,
  userType: 0,
  userId: "",
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth":
      return { ...state, isAuth: action.payload };
    case "usertype":
      return { ...state, userType: action.payload };
    case "token":
      return { ...state, token: action.payload };
    case "user":
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth Context");
  });

  const setIsAuth = (payload) => {
    dispatch({ type: "auth", payload });
  };

  const setUserType = (payload) => {
    dispatch({ type: "usertype", payload });
  };

  const setToken = (payload) => {
    dispatch({ type: "token", payload });
  };

  const setUser = (payload) => {
    dispatch({ type: "user", payload });
  };

  const updateAuthInfo = (auth, token, user, userType, from) => {
    setIsAuth(auth);
    setToken(token);
    setUser(user);
    setUserType(userType);
    navigate(`/home/${userTypes[userType]}`);
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        setIsAuth,
        setUserType,
        setToken,
        setUser,
        updateAuthInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
