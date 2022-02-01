import React, { useEffect, useState } from "react";

import { getAllSchools } from "../../../api/school_api";
import useAuth from "../../../hooks/useAuth";
import List from "../../List";

export default function School() {
  const [deletePopupToggle, setDeletePopupToggle] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [schoolsList, setSchoolsList] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getAllSchools(token)
      .then((res) => {
        setSchoolsList(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err.response));
  }, [deletePopupToggle]);

  return (
    <List
      baseUrl="/home/superadmin"
      listUrl="school"
      tableList={schoolsList}
      isLoaded={isLoaded}
      setDeletePopupToggle={setDeletePopupToggle}
      deletePopupToggle={deletePopupToggle}
      listName="School"
    />
  );
}
