import React from "react";

const ProfileInformation = ({ userData }) => {
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
          background: "linear-gradient(90deg, #4cc9f0, #4361ee)",
        }}
      ></div>

      <div className="d-flex align-items-center mb-4">
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4cc9f0, #4361ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "20px",
            color: "white",
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        >
          {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
        </div>
        <h2 className="m-0" style={{ fontWeight: "600" }}>
          My Profile
        </h2>
      </div>

      <div
        className="profile-grid"
        style={{ display: "grid", gridGap: "20px" }}
      >
        <div className="profile-item">
          <h5
            style={{
              color: "#666",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            <i
              className="fa-regular fa-user me-2"
              style={{ color: "#4cc9f0" }}
            ></i>
            Name
          </h5>
          <p
            id="name"
            style={{
              fontSize: "1.2rem",
              padding: "10px 15px",
              background: "#f8f9fa",
              borderRadius: "8px",
              margin: "0",
            }}
          >
            {userData.name}
          </p>
        </div>

        <div className="profile-item">
          <h5
            style={{
              color: "#666",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            <i
              className="fa-regular fa-envelope me-2"
              style={{ color: "#4361ee" }}
            ></i>
            Email
          </h5>
          <p
            id="email"
            style={{
              fontSize: "1.2rem",
              padding: "10px 15px",
              background: "#f8f9fa",
              borderRadius: "8px",
              margin: "0",
            }}
          >
            {userData.email}
          </p>
        </div>

        <div className="profile-item">
          <h5
            style={{
              color: "#666",
              marginBottom: "8px",
              fontWeight: "500",
            }}
          >
            <i
              className="fa-solid fa-user-shield me-2"
              style={{ color: "#3a0ca3" }}
            ></i>
            Role
          </h5>
          <p
            id="role"
            style={{
              fontSize: "1.2rem",
              padding: "10px 15px",
              background: "#f8f9fa",
              borderRadius: "8px",
              margin: "0",
              fontWeight: userData.role === "Moderator" ? "500" : "400",
            }}
          >
            {userData.role === "Moderator" ? (
              <span style={{ color: "#3a0ca3" }}>{userData.role}</span>
            ) : (
              userData.role
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
