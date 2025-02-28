import TabletCards from "../components/TabletCards";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";

const apiUrl = process.env.REACT_APP_API_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const TabletSearch = () => {
  const [listOfTablets, setListOfTablets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      axios
        .get(`${apiUrl}/tablets`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          setListOfTablets(response.data);
        });
    }
  }, [user]);

  const filteredTablets = searchTerm
    ? listOfTablets.filter(
        (tablet) =>
          tablet.id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (tablet.name &&
            tablet.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : listOfTablets;

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
      {/* Background color splashes - distinct from ProfilePage */}
      <div
        style={{
          ...splashStyle,
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle at 60% 40%, rgba(247, 127, 0, 0.9), rgba(252, 191, 73, 0.4) 70%)",
          bottom: "10%",
          left: "-5%",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        style={{
          ...splashStyle,
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.8), rgba(156, 39, 176, 0.3) 65%)",
          top: "-10%",
          right: "0%",
          transform: "rotate(20deg)",
        }}
      />
      <div
        style={{
          ...splashStyle,
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.6), transparent 70%)",
          bottom: "5%",
          right: "10%",
          transform: "rotate(-5deg)",
        }}
      />

      <Navbar />

      <div
        className="container mt-5"
        style={{ position: "relative", zIndex: "1" }}
      >
        {/* Page Header */}
        <div className="row mb-4">
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
                  background: "linear-gradient(90deg, #f77f00, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tablet Collection
              </h1>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="row mb-4">
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
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "8px",
                  background: "linear-gradient(90deg, #f77f00, #fcbf49)",
                }}
              ></div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #f77f00, #fcbf49)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "20px",
                    }}
                  >
                    <i
                      className="fa-solid fa-tablet-screen-button"
                      style={{ color: "white", fontSize: "1.2rem" }}
                    ></i>
                  </div>
                  <h2 className="m-0" style={{ fontWeight: "600" }}>
                    Browse Tablets
                  </h2>
                </div>
                <div
                  style={{
                    background: "#fff8e6",
                    color: "#f77f00",
                    fontWeight: "600",
                    padding: "5px 15px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                  }}
                >
                  Total: {filteredTablets.length}
                </div>
              </div>

              <div className="mt-4">
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      background: "linear-gradient(135deg, #f77f00, #fcbf49)",
                      border: "none",
                      color: "white",
                    }}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tablets by ID or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      borderRadius: "0 8px 8px 0",
                      padding: "10px 15px",
                      fontSize: "1.1rem",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablets Grid */}
        <div className="row mb-5 " style={ {paddingBottom: "100px" }}>
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
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "8px",
                  background: "linear-gradient(90deg, #ec4899, #ef4444)",
                }}
              ></div>

              <div
                className="custom-scrollbar"
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}
              >
                <div
                  id="tablets"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {filteredTablets && filteredTablets.length > 0 ? (
                    filteredTablets.map((tablet) => (
                      <TabletCards key={tablet.id} listOfTablets={tablet} />
                    ))
                  ) : (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        padding: "50px 20px",
                        textAlign: "center",
                        color: "#888",
                        fontSize: "1.2rem",
                      }}
                    >
                      <i className="fa-regular fa-face-sad-tear me-2"></i>
                      {searchTerm
                        ? "No tablets found matching your search criteria."
                        : "Loading tablets..."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default TabletSearch;
