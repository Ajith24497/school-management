import axios from "axios";

export const login = (user, password) =>
  axios({
    method: "post",
    url: "/login",
    responseType: "json",
    data: {
      login_name: user,
      login_pass: password,
    },
  });
