import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
