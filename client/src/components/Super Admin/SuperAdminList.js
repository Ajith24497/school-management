import React from "react";

import admin_icon from "../../assets/images/admin_128.png";
import school_icon from "../../assets/images/school_128.png";
import ListComponent from "../ListComponent";

export default function SuperAdminList() {
  return (
    <>
      <ListComponent name="School" link="school" img={school_icon} />
      <ListComponent name="Admin" link="admin" img={admin_icon} />
    </>
  );
}
