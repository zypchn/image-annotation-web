import React from "react";
import AssignTablet from "../AssignTablet.jsx";

const ManageAssignments = ({ assignedTablets }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        paddingBottom: "0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "8px",
          background: "linear-gradient(90deg, #3a0ca3, #7209b7)",
        }}
      ></div>

      <div className="d-flex align-items-center mb-4">
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #3a0ca3, #7209b7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
          }}
        >
          <i
            className="fa-solid fa-user-plus"
            style={{ color: "white", fontSize: "1.2rem" }}
          ></i>
        </div>
        <h2 className="m-0" style={{ fontWeight: "600" }}>
          Assign Tablets to Students
        </h2>
      </div>

      <AssignTablet assignedTablets={assignedTablets} />
    </div>
  );
};

export default ManageAssignments;
