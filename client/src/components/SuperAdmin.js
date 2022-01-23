import React from "react";
import { Outlet } from "react-router-dom";
import "../css/super-admin.css";

export default function SuperAdmin() {
  return (
    <div className="super_admin_main">
      <Outlet />
    </div>
  );
}
