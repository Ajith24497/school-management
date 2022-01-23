import React from "react";
import { Button, Table } from "react-bootstrap";
import "../css/school.css";

import back_icon from "../assets/images/left.png";

export default function School() {
  return (
    <div className="school_main">
      <div className="school_back_btn">
        <img src={back_icon} alt="back_icon" />
        <h6>back</h6>
      </div>
      <div className="schools_info">
        <h2>Schools List</h2>
        <Button variant="success">Add School</Button>
      </div>
      <div className="school_table">
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
            <tr>
              <td>1</td>
              <td>
                Mardddddddddddddddddddddddddddddddddddddddddddddddddddddddddk
              </td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
