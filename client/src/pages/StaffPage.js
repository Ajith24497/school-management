import React from "react";
import { Outlet } from "react-router-dom";

function StaffPage() {
  return (
    <div>
      <h1>StaffPage</h1>
      <Outlet />
    </div>
  );
}

export default StaffPage;
