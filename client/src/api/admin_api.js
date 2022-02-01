import axios from "axios";

export const getAllAdmin = (token) =>
  axios({
    method: "GET",
    url: "/admin",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addAdmin = (token, userName, loginName, loginPass, schoolId) =>
  axios({
    method: "POST",
    url: "/admin",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_name: userName,
      user_type: "098a9594-0bc5-4289-844d-2a36950034e3",
      login_name: loginName,
      login_pass: loginPass,
      school_id: schoolId,
    },
  });

export const getAdmin = (uuid, token) =>
  axios({
    method: "GET",
    url: `/admin/${uuid}`,
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteAdmin = (token, adminId) =>
  axios({
    method: "DELETE",
    url: "/admin",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      uuid: adminId,
    },
  });

export const updateAdmin = (token, name, userName, schoolId, adminId) =>
  axios({
    method: "PUT",
    url: "/admin",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      user_name: name,
      login_name: userName,
      school_id: schoolId,
      uuid: adminId,
    },
  });
