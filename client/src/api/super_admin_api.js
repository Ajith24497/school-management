import axios from "axios";

export const getSuperAdmin = (token, uuid) =>
  axios({
    method: "get",
    url: `/superadmin/${uuid}`,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateSuperAdmin = (token, userName, loginName, userId) =>
  axios({
    method: "PUT",
    url: `/superadmin`,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_name: userName,
      login_name: loginName,
      uuid: userId,
    },
  });
