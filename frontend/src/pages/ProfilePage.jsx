import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext.js";
import axios from "axios";
import Footer from "../components/Footer.jsx";
import ProfileInformation from "../components/profile/ProfileInformation.jsx";
import AssignedTablets from "../components/profile/AssignedTablets.jsx";
import ManageAssignments from "../components/profile/ManageAssignments.jsx";
import BackgroundSplash from "../components/ui/BackgroundSplash.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

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

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundSplash
        width="500px"
        height="500px"
        background="radial-gradient(circle at 30% 40%, rgba(76, 201, 240, 1), rgba(67, 97, 238, 0.4) 70%)"
        position={{ top: "-5%", left: "-2%" }}
        transform="rotate(15deg)"
      />
      <BackgroundSplash
        width="450px"
        height="450px"
        background="radial-gradient(circle at 70% 60%, rgba(72, 149, 239, 0.9), rgba(58, 12, 163, 0.3) 60%)"
        position={{ bottom: "-10%", right: "5%" }}
        transform="rotate(-10deg)"
      />
      <BackgroundSplash
        width="420px"
        height="380px"
        background="radial-gradient(ellipse at center, rgba(63, 55, 201, 0.7), transparent 70%)"
        position={{ top: "30%", right: "10%" }}
        transform="rotate(25deg)"
      />

      <Navbar />

      <div
        className="container mt-5"
        style={{ position: "relative", zIndex: "1" }}
      >
        <PageHeader title="My Dashboard" />

        <div className="row">
          <div className="col-lg-5 mb-4">
            <ProfileInformation userData={userData} />
          </div>

          <div className="col-lg-7 mb-4">
            <AssignedTablets assignedTablets={assignedTablets} />
          </div>
        </div>

        {userData.role === "Moderator" && (
          <div className="row" style={{ paddingBottom: "100px" }}>
            <div className="col-12">
              <ManageAssignments assignedTablets={assignedTablets} />
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
