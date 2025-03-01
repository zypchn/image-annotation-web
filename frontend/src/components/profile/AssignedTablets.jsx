import React from "react";

const AssignedTablets = ({ assignedTablets }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "8px",
          background: "linear-gradient(90deg, #4895ef, #3a0ca3)",
        }}
      ></div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4895ef, #3a0ca3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <i
              className="fa-regular fa-rectangle-list"
              style={{ color: "white", fontSize: "1.2rem" }}
            ></i>
          </div>
          <h2 className="m-0" style={{ fontWeight: "600" }}>
            Assigned Tablets
          </h2>
        </div>
        <div
          style={{
            background: "#eef2ff",
            color: "#3a0ca3",
            fontWeight: "600",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          Total: {Object.keys(assignedTablets).length}
        </div>
      </div>

      <div
        className="custom-scrollbar"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          paddingRight: "5px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "15px",
          }}
        >
          {assignedTablets &&
            Object.keys(assignedTablets).map((tabletID) => (
              <div
                key={tabletID}
                style={{
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  border: "1px solid #eaeaea",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#666",
                      marginBottom: "3px",
                    }}
                  >
                    Tablet ID
                  </div>
                  <strong style={{ fontSize: "1.1rem" }}>
                    {assignedTablets[tabletID]
                      ? assignedTablets[tabletID]
                      : tabletID}
                  </strong>
                </div>
                <a
                  href={`/tablet/${tabletID}`}
                  id="profile-label-btn"
                  className="btn"
                  style={{
                    background: "linear-gradient(135deg, #4895ef, #3a0ca3)",
                    color: "white",
                    borderRadius: "8px",
                    padding: "6px 15px",
                    fontWeight: "500",
                    border: "none",
                  }}
                >
                  <i className="fa-solid fa-pencil me-2"></i>
                  Annotate
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AssignedTablets;
