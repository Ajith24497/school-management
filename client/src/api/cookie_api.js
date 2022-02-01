import axios from "axios";
axios.defaults.withCredentials = true;

export const createCookie = async (
  cookieName = "token",
  cookieValue,
  expireSeconds
) => {
  await axios({
    method: "POST",
    url: "/cookie/create",
    responseType: "json",
    data: {
      cookieName,
      cookieValue,
      expireSeconds,
    },
  });
};

export const deleteCookie = async (cookieName) =>
  await axios({
    method: "POST",
    url: "/cookie/delete",
    responseType: "json",
    data: {
      cookieName,
    },
  });

export const getCookies = () =>
  axios({
    method: "POST",
    url: "/cookie/get",
    responseType: "json",
  });
