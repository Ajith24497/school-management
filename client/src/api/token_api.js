import axios from "axios";

export const checkToken = (userToken = null) =>
  axios({
    url: "/checktoken",
    method: "GET",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

export const getUserFromToken = (userToken = null) =>
  axios({
    url: "/checktoken",
    method: "POST",
    responseType: "json",
    data: {
      token: userToken,
    },
  });
