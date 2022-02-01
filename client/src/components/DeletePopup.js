import React from "react";
import { Button } from "react-bootstrap";
import { deleteAdmin } from "../api/admin_api";
import { deleteSchool } from "../api/school_api";
import "../css/delete-popup.css";
import useAuth from "../hooks/useAuth";
import tryCatch from "./TryCatch";

export default function DeletePopup(props) {
  const { token } = useAuth();

  const cancelButtonHandler = () => {
    props.popupToggle(false);
  };

  const deleteButtonhandler = async () => {
    if (props.listName === "School") {
      const [deleteSchoolData, deleteSchoolError] = await tryCatch(
        deleteSchool(token, props.keyId)
      );
      if (!deleteSchoolError) {
        window.alert("School Deleted Successfully");
        props.popupToggle(false);
      } else {
        window.alert("Something went wrong");
        props.popupToggle(false);
      }
    } else if (props.listName === "Admin") {
      const [deleteAdminData, deleteAdminError] = await tryCatch(
        deleteAdmin(token, props.keyId)
      );

      if (!deleteAdminError) {
        window.alert("Admin Deleted Successfully");
        props.popupToggle(false);
      } else {
        window.alert("Something went wrong");
        props.popupToggle(false);
        console.log(deleteAdminError.response);
      }
    }
  };

  return (
    <div className="delete_popup">
      <div className="delete_popup_text">
        <h3>Confirm Delete?</h3>
      </div>
      <div className="delete_popup_action_buttons">
        <Button onClick={cancelButtonHandler} variant="primary">
          Cancel
        </Button>
        <Button
          onClick={deleteButtonhandler}
          className="delete_popup_action_button_delete"
          variant="warning"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
