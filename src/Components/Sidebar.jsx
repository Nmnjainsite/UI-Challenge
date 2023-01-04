import React from "react";
import { Offcanvas } from "react-bootstrap";

export default function Sidebar({ show, handleClose, showData }) {
  return (
    <div>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton style={{ background: "#F2F2F2" }}>
          <Offcanvas.Title>{showData.home_team.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ fontWeight: "500", fontSize: "1.2rem" }}>
          <p>Team Full Name: {showData.home_team.full_name}</p>
          <p>Total Games In 2021: 88</p>
          <h4>Random Game Details</h4>{" "}
          <p style={{ marginTop: "1rem" }}>Date: {showData.date}</p>
          <p>Home Team: {showData.home_team.name}</p>
          <p>Home Team Score: {showData.home_team_score}</p>
          <p>Visitor Team: {showData.visitor_team_score}</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
