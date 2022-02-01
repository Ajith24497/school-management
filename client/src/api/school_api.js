import axios from "axios";

export const getSchool = (token, schoolId) =>
  axios({
    url: `/school/${schoolId}`,
    method: "GET",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllSchools = (token) =>
  axios({
    url: "/school",
    method: "GET",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addSchool = (
  token,
  name,
  branch,
  syllabus,
  address,
  email,
  tel_no
) =>
  axios({
    url: "/school",
    method: "POST",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      branch,
      syllabus,
      address,
      email,
      tel_no,
    },
  });

export const deleteSchool = (token, schoolId) =>
  axios({
    url: "/school",
    method: "DELETE",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      uuid: schoolId,
    },
  });

export const updateSchool = (
  token,
  name,
  branch,
  syllabus,
  address,
  email,
  tel_no,
  uuid
) =>
  axios({
    url: "/school",
    method: "PUT",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name,
      branch,
      syllabus,
      address,
      email,
      tel_no,
      uuid,
    },
  });
