import React from "react";
import SchoolForm from "./SchoolForm";

const initialValue = {
  name: "",
  branch: "",
  syllabus: "",
  email: "",
  address: "",
  tel_no: "",
};

export default function AddSchool() {
  return <SchoolForm type="add" initialValue={initialValue} />;
}
