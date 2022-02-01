import React, { useEffect, useState } from "react";
import { getAllAdmin } from "../../../api/admin_api";
import useAuth from "../../../hooks/useAuth";

import List from "../../List";
import tryCatch from "../../TryCatch";

export default function AdminComponent() {
  const [deletePopupToggle, setDeletePopupToggle] = useState(false);
  const [adminsList, setAdminsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { token } = useAuth();

  const getAdmins = async () => {
    const [adminData, adminError] = await tryCatch(getAllAdmin(token));
    if (!adminError) {
      setIsLoaded(true);
      adminData.data.map((el) => {
        return (el.name = el.user.user_name);
      });
      setAdminsList(adminData.data);
    } else {
      window.alert("something went worng");
      console.log(adminError.response);
    }
  };

  useEffect(() => {
    getAdmins();
  }, [deletePopupToggle]);

  return (
    <List
      baseUrl="/home/superadmin"
      listUrl="admin"
      tableList={adminsList}
      isLoaded={isLoaded}
      setDeletePopupToggle={setDeletePopupToggle}
      deletePopupToggle={deletePopupToggle}
      listName="Admin"
    />
  );
}
