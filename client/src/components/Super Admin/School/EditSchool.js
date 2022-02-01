import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getSchool } from "../../../api/school_api";
import useAuth from "../../../hooks/useAuth";
import tryCatch from "../../TryCatch";
import SchoolForm from "./SchoolForm";

const initialValue = {
  name: "",
  branch: "",
  syllabus: "",
  email: "",
  address: "",
  tel_no: "",
};

const reducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "state":
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};

export default function EditSchool() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const { token } = useAuth();
  const { uuid } = useParams();

  const getSchoolDetails = async () => {
    const [schoolData, schoolError] = await tryCatch(getSchool(token, uuid));
    if (!schoolError) {
      const { address, branch, email, name, syllabus, tel_no } =
        schoolData.data;
      dispatch({
        type: "state",
        payload: { address, branch, email, name, syllabus, tel_no },
      });
    } else {
      console.log(schoolError.response);
    }
  };

  useEffect(() => {
    getSchoolDetails();
  }, []);

  return <SchoolForm type="edit" initialValue={state} />;
}
