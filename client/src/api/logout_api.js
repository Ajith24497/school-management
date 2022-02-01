import axios from "axios";

export const logout = (userToken) =>
  axios({
    method: "get",
    url: "/logout",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
