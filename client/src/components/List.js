import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import "../css/list.css";

import back_icon from "../assets/images/left.png";
import DeletePopup from "./DeletePopup";

export default function List({
  baseUrl,
  listUrl,
  tableList,
  setDeletePopupToggle,
  deletePopupToggle,
  isLoaded,
  listName,
}) {
  const [deleteKey, setDeleteKey] = useState("");
  const navigate = useNavigate();

  const actionBtnHandler = (url) => {
    navigate(url);
  };

  const deleteHandler = (keyId) => {
    setDeleteKey(keyId);
    setDeletePopupToggle(true);
  };

  return (
    <div className="list_main">
      {deletePopupToggle && (
        <DeletePopup
          popupToggle={setDeletePopupToggle}
          keyId={deleteKey}
          listName={listName}
        />
      )}
      <div className="list_back_btn">
        <img src={back_icon} alt="back_icon" />
        <h6 onClick={() => actionBtnHandler(baseUrl)}>back</h6>
      </div>
      <div className="lists_info">
        <h2>{listName}s List</h2>
        <Button
          onClick={() => actionBtnHandler(`${baseUrl}/${listUrl}/add`)}
          variant="success"
        >
          Add {listName}
        </Button>
      </div>
      <div className="list_table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded ? (
              <tr>
                <td colSpan={4}>Loading..</td>
              </tr>
            ) : !tableList.length ? (
              <tr>
                <td colSpan={4}>No {listName}s Found</td>
              </tr>
            ) : (
              tableList.map((val, index) => {
                return (
                  <tr key={val.uuid}>
                    <td width={"5%"}>{index + 1}</td>
                    <td width={"70%"}>{val.name}</td>
                    <td width={"10%"}>
                      <Button
                        onClick={() =>
                          actionBtnHandler(
                            `${baseUrl}/${listUrl}/edit/${val.uuid}`
                          )
                        }
                        variant="primary"
                      >
                        Edit
                      </Button>
                    </td>
                    <td width={"10%"}>
                      <Button
                        onClick={() => deleteHandler(val.uuid)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
