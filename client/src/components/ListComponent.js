import React from "react";
import { Link } from "react-router-dom";
import "../css/list-component.css";

export default function ListComponent(props) {
  return (
    <Link to={props.link}>
      <div className="list_component">
        <img src={props.img} alt="school_icon" />
        <h2>{props.name}</h2>
      </div>
    </Link>
  );
}
