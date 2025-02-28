import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup.js";
import { useOTPVerification } from "../hooks/useOTPVerification.js";
import OTPInput from "../components/OTPInput.jsx";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [OTP, setOTP] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { signup, signupError, otpSent } = useSignup();
  const { otpVerification, otpError } = useOTPVerification();

  const isFormFilled =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    role !== "";

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    const originalPosition = document.body.style.position;

    // Disable scrolling
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";

    return () => {
      // Restore original styles
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password, role);
  };

  const handleOtpChange = (otp) => {
    setOTP(otp);
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    await otpVerification(email, OTP);
  };

  const handlePasswordVisibility = () => {
    let passwordField = document.getElementById("input-password");
    const newVisibility = passwordField.type === "password";
    passwordField.type = newVisibility ? "text" : "password";
    setPasswordVisible(newVisibility);
  };

  return (
    <div
      className="container-fluid"
      style={{
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="row vh-100" style={{ overflow: "hidden" }}>
        <div
          className="col-md-6 d-none d-md-block p-0"
          style={{ overflow: "hidden" }}
        >
          <img
            src="/onboarding.jpg"
            alt="onboarding"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{
            background: "#181818",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <div className="d-flex align-items-center justify-content-center w-100 h-100">
            <form
              className="signup"
              onSubmit={otpSent ? handleOTP : handleSubmit}
              style={{ width: "80%", backgroundColor: "#181818" }}
            >
              <div
                className="bg-dark text-white mx-auto"
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  backgroundColor: "#181818",
                }}
              >
                <div
                  className="p-5 d-flex flex-column align-items-center"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    backgroundColor: "#181818",
                    borderWidth: "0px",
                    borderColor: "#181818",
                  }}
                >
                  <h2 className="fw-bold mb-4">Sign Up</h2>

                  <input
                    className="form-control mb-4"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      padding: "12px 20px",
                      fontSize: "16px",
                      borderRadius: "30px",
                      height: "55px",
                      width: "450px",
                    }}
                  />

                  <input
                    className="form-control mb-4"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: "12px 20px",
                      fontSize: "16px",
                      borderRadius: "30px",
                      height: "55px",
                      width: "450px",
                    }}
                  />

                  <div style={{ position: "relative", width: "450px" }}>
                    <input
                      id="input-password"
                      className="form-control mb-4"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        padding: "12px 20px",
                        fontSize: "16px",
                        borderRadius: "30px",
                        height: "55px",
                        width: "100%",
                        paddingRight: "40px",
                      }}
                    />
                    <i
                      id="eye-icon"
                      className={
                        passwordVisible
                          ? "fa-regular fa-eye"
                          : "fa-regular fa-eye-slash"
                      }
                      onClick={handlePasswordVisibility}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "48%",
                        right: "17px",
                        transform: "translateY(-50%)",
                        zIndex: "10",
                        color: "#6c757d",
                      }}
                    />
                  </div>

                  <div
                    className="radio-group mb-4"
                    style={{
                      width: "450px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "30px",
                    }}
                  >
                    <div className="form-check">
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="Student"
                        className="form-check-input"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="student" className="form-check-label">
                        Student
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="moderator"
                        name="role"
                        value="Moderator"
                        className="form-check-input"
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label htmlFor="moderator" className="form-check-label">
                        Moderator
                      </label>
                    </div>
                  </div>

                  {otpSent && (
                    <div
                      className="alert alert-info text-center mb-2"
                      style={{
                        borderRadius: "30px",
                        padding: "8px 15px",
                        width: "450px",
                      }}
                    >
                      One-Time Password has been sent to the following
                      recipient: <b>{email}</b>
                    </div>
                  )}

                  {otpSent && (
                    <div style={{ margin: "0 0 10px", width: "450px" }}>
                      <OTPInput length={4} onChange={handleOtpChange} />
                    </div>
                  )}

                  {signupError && (
                    <div
                      className="alert alert-danger text-center"
                      style={{
                        borderRadius: "30px",
                        padding: "12px 20px",
                        width: "450px",
                      }}
                    >
                      {signupError}
                    </div>
                  )}

                  {otpError && (
                    <div
                      className="alert alert-danger text-center"
                      style={{
                        borderRadius: "30px",
                        padding: "12px 20px",
                        width: "450px",
                      }}
                    >
                      {otpError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={
                      isFormFilled ? "btn btn-light" : "btn btn-outline-light"
                    }
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      borderRadius: "30px",
                      height: "55px",
                      width: "450px",
                      fontSize: "16px",
                      padding: "12px 20px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      backgroundColor: isFormFilled
                        ? isHovered
                          ? "#D0D0D0"
                          : "#ffffff"
                        : isHovered
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                      color: isFormFilled ? "#212529" : "#fff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {otpSent ? "Verify" : "Sign Up"}
                  </button>

                  <h6 className="mt-4">
                    Already a member?{" "}
                    <a href="/login" style={{ textDecoration: "none" }}>
                      Login
                    </a>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
