import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import axios from "axios";
import AssignTablet from "../components/AssignTablet.jsx";
import Footer from "../components/Footer.jsx";

const apiUrl = process.env.REACT_APP_API_URL;

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const { user } = useAuthContext();
  const id = user.userID;
  const [assignedTablets, setAssignedTablets] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/user/${id}`).then((response) => {
      setUserData(response.data);
    });
  }, [id]);

  useEffect(() => {
    axios.get(`${apiUrl}/user/${id}/assigned`).then((response) => {
      setAssignedTablets(response.data);
    });
  }, [id]);

  const splashStyle = {
    position: "fixed",
    borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
    opacity: "0.25",
    filter: "blur(60px)",
    zIndex: "0",
    mixBlendMode: "multiply",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background color splashes */}
      <div
        style={{
          ...splashStyle,
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle at 30% 40%, rgba(76, 201, 240, 1), rgba(67, 97, 238, 0.4) 70%)",
          top: "-5%",
          left: "-2%",
          transform: "rotate(15deg)",
        }}
      />
      <div
        style={{
          ...splashStyle,
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle at 70% 60%, rgba(72, 149, 239, 0.9), rgba(58, 12, 163, 0.3) 60%)",
          bottom: "-10%",
          right: "5%",
          transform: "rotate(-10deg)",
        }}
      />
      <div
        style={{
          ...splashStyle,
          width: "420px",
          height: "380px",
          background:
            "radial-gradient(ellipse at center, rgba(63, 55, 201, 0.7), transparent 70%)",
          top: "30%",
          right: "10%",
          transform: "rotate(25deg)",
        }}
      />

      <Navbar />

      <div
        className="container mt-5"
        style={{ position: "relative", zIndex: "1" }}
      >
        {/* Page Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "16px",
                padding: "20px 30px",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  background: "linear-gradient(90deg, #4cc9f0, #4361ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                My Dashboard
              </h1>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Profile Information Section */}
          <div className="col-lg-5 mb-4">
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
          </div>

          {/* Assigned Tablets Section */}
          <div className="col-lg-7 mb-4">
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
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
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
                            background:
                              "linear-gradient(135deg, #4895ef, #3a0ca3)",
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
          </div>
        </div>

        {/* Assign Tablet Section (Moderator only) */}
        {userData.role === "Moderator" && (
          <div className="row" style={{ paddingBottom: "100px" }}>
            <div className="col-12">
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
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
