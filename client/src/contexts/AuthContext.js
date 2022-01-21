import React, { createContext, useReducer, useEffect } from "react";
import { getCookies } from "../api/cookie_api";

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

  useEffect(() => {
    getCookies().then((res) => {
      if (!res.data.status === "notok") {
        const { token, id, user_type_id } = res.data;
        setIsAuth(true);
        setToken(token);
        setUserType(user_type_id);
        setUser(id);
      }
    });
  }, []);

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

  return (
    <AuthContext.Provider
      value={{ state, setIsAuth, setUserType, setToken, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
