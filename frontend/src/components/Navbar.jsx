import { useLogout } from "../hooks/useLogout.js";
import { useState } from "react";
const Navbar = () => {
  const [isHoveredInfo, setIsHoveredInfo] = useState(false);
  const [isHoveredShortcuts, setIsHoveredShortcuts] = useState(false);

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
  };

  return (
    <div
      className={"navbar navbar-light my-3 d-flex"}
      style={{
        width: "80%",
        margin: "0 auto",
        borderRadius: "30px",
        position: "relative",
        background:
          "linear-gradient(90deg, rgba(76, 201, 240, 0.7), rgba(72, 149, 239, 0.7), rgba(67, 97, 238, 0.7), rgba(63, 55, 201, 0.7), rgba(58, 12, 163, 0.7))",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        padding: "0.75rem 1.5rem",
      }}
    >
      <div
        className={"navbar-btn"}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flex: "1",
        }}
      >
        <a href={"/profile"}>
          <button id={"profile-btn"} className={"me-3 btn"} style={buttonStyle}>
            <i className={"fa-regular fa-address-card"} /> Profilim
          </button>
        </a>
        <a href={"/tablet"}>
          <button className={"me-3 btn"} style={buttonStyle}>
            <i className={"fa-regular fa-rectangle-list"} /> Tüm Resimler
          </button>
        </a>
        <a href={"/tablet/create"}>
          <button className={"me-3 btn"} style={buttonStyle}>
            <i className={"fa-solid fa-upload"}></i> Resim Yükle
          </button>
        </a>
        <button className={"btn"} style={buttonStyle} onClick={handleClick}>
          <i className={"fa-solid fa-arrow-right-from-bracket"} /> Çıkış Yap
        </button>
      </div>

      <div
        className={"info-buttons-div"}
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          id={"token-info-btn"}
          className={"me-3 btn"}
          style={buttonStyle}
          onMouseEnter={() => setIsHoveredInfo(true)}
          onMouseLeave={() => setIsHoveredInfo(false)}
        >
          <i className={"fa-solid fa-code"} /> Special Tokens
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
          className={"btn"}
          style={buttonStyle}
          onMouseEnter={() => setIsHoveredShortcuts(true)}
          onMouseLeave={() => setIsHoveredShortcuts(false)}
        >
          <i className={"fa-regular fa-keyboard"} /> Keyboard Shortcuts
        </button>
        {isHoveredShortcuts && (
          <div className={"info-buttons"}>
            {KEYBOARD_SHORTCUTS.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
