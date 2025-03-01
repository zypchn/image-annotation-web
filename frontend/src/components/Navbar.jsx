import { useLogout } from "../hooks/useLogout.js";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [isHoveredInfo, setIsHoveredInfo] = useState(false);
  const [isHoveredShortcuts, setIsHoveredShortcuts] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const TOKENS = [
    "Özel Tokenler : ",
    "Heceler Arası :    -",
    "Kelime Sonu :     ,",
    "Satır Sonu :    *",
    "Paragraf Sonu :    .",
    "Yeni Sütun : +",
  ];

  const KEYBOARD_SHORTCUTS = [
    "Klavye Kısayolları :",
    "Yapılan işaretleri kaydetmek : ALT + S",
  ];

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const buttonStyle = {
    backgroundColor: "white",
    color: "#333",
    border: "1px solid #dedede",
    transition: "all 0.2s ease",
    borderRadius: "25px",
    padding: "0.5rem 1rem",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3a0ca3",
    color: "white",
    fontWeight: "bold",
    border: "2px solid #3a0ca3",
  };

  const hoverStyle = {
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
    transform: "scale(1.05)",
  };

  const activeHoverStyle = {
    boxShadow: "0 0 15px #4621be",
    transform: "scale(1.05)",
  };

  return (
    <div
      className={"navbar navbar-light my-3 d-flex"}
      style={{
        width: "75%",
        margin: "0 auto",
        borderRadius: "30px",
        position: "relative",
        background:
          "linear-gradient(90deg, rgba(76, 201, 240, 0.7), rgba(72, 149, 239, 0.7), rgba(67, 97, 238, 0.7), rgba(63, 55, 201, 0.7), rgba(58, 12, 163, 0.7))",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        paddingRight: "5.5rem",
        justifyContent: "space-between",
      }}
    >
      {/* Left side buttons */}
      <div
        className={"navbar-btn"}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flex: "1",
        }}
      >
        <a href={"/profile"}>
          <button
            id={"profile-btn"}
            className={"me-3 btn"}
            style={currentPath === "/profile" ? activeButtonStyle : buttonStyle}
            onMouseEnter={(e) => {
              const effectToApply =
                currentPath === "/profile" ? activeHoverStyle : hoverStyle;
              Object.assign(e.target.style, effectToApply);
            }}
            onMouseLeave={(e) => {
              const baseStyle =
                currentPath === "/profile" ? activeButtonStyle : buttonStyle;
              for (const prop in hoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
              for (const prop in activeHoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
            }}
          >
            <i className={"fa-regular fa-address-card"} /> Profilim
          </button>
        </a>
        <a href={"/tablet"}>
          <button
            className={"me-3 btn"}
            style={currentPath === "/tablet" ? activeButtonStyle : buttonStyle}
            onMouseEnter={(e) => {
              const effectToApply =
                currentPath === "/tablet" ? activeHoverStyle : hoverStyle;
              Object.assign(e.target.style, effectToApply);
            }}
            onMouseLeave={(e) => {
              const baseStyle =
                currentPath === "/tablet" ? activeButtonStyle : buttonStyle;
              for (const prop in hoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
              for (const prop in activeHoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
            }}
          >
            <i className={"fa-regular fa-rectangle-list"} /> Tüm Resimler
          </button>
        </a>
        <a href={"/tablet/create"}>
          <button
            className={"me-3 btn"}
            style={
              currentPath === "/tablet/create" ? activeButtonStyle : buttonStyle
            }
            onMouseEnter={(e) => {
              const effectToApply =
                currentPath === "/tablet/create"
                  ? activeHoverStyle
                  : hoverStyle;
              Object.assign(e.target.style, effectToApply);
            }}
            onMouseLeave={(e) => {
              const baseStyle =
                currentPath === "/tablet/create"
                  ? activeButtonStyle
                  : buttonStyle;
              for (const prop in hoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
              for (const prop in activeHoverStyle) {
                e.target.style[prop] = baseStyle[prop] || "";
              }
            }}
          >
            <i className={"fa-solid fa-upload"}></i> Resim Yükle
          </button>
        </a>
      </div>

      {/* Right side buttons */}
      <div
        className={"info-buttons-div"}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          id={"token-info-btn"}
          className={"me-3 btn"}
          style={buttonStyle}
          onMouseEnter={(e) => {
            setIsHoveredInfo(true);
            Object.assign(e.target.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            setIsHoveredInfo(false);
            for (const prop in hoverStyle) {
              e.target.style[prop] = buttonStyle[prop] || "";
            }
          }}
        >
          <i className={"fa-solid fa-code"} />
        </button>
        {isHoveredInfo && (
          <div className={"info-buttons"}>
            {TOKENS.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}

        <button
          id={"shortcut-info-btn"}
          className={"me-3 btn"}
          style={buttonStyle}
          onMouseEnter={(e) => {
            setIsHoveredShortcuts(true);
            Object.assign(e.target.style, hoverStyle);
          }}
          onMouseLeave={(e) => {
            setIsHoveredShortcuts(false);
            for (const prop in hoverStyle) {
              e.target.style[prop] = buttonStyle[prop] || "";
            }
          }}
        >
          <i className={"fa-regular fa-keyboard"} />
        </button>
        {isHoveredShortcuts && (
          <div className={"info-buttons"}>
            {KEYBOARD_SHORTCUTS.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}

        <button
          className={"btn"}
          style={buttonStyle}
          onClick={handleClick}
          onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
          onMouseLeave={(e) => {
            for (const prop in hoverStyle) {
              e.target.style[prop] = buttonStyle[prop] || "";
            }
          }}
        >
          <i className={"fa-solid fa-arrow-right-from-bracket"} /> Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Navbar;
