import {useLogout} from "../hooks/useLogout.js";
import {useState} from "react";
const Navbar = () => {
    
    const [isHoveredInfo, setIsHoveredInfo] = useState(false);
    const [isHoveredShortcuts, setIsHoveredShortcuts] = useState(false);
    
    const TOKENS = ["Özel tokenler ve anlamları :",
        "<EOL> (End of Line) : satır sonundaki heceden sonra koyulmalı",
        "<BOP> (Beginning of Paragraph) : paragraf başlangıcındaki heceden önce koyulmalı",
        "<EOP> : (End of Paragraph) : paragrafın son hecesinden sonra koyulmalı",
        "<SSEP> : (Syllable Seperation) : hece sonuna koyulmalı -eğer hece, kelimenin son hecesi değil ise-",
        "<WSEP> : (Word Seperation) : kelimenin son hecesinden sonra koyulmalı",
        "<PRED> : (Pre-Determinatif) : pre-deterministik hece varsa ikisinin arasına koyulmalı",
        "<POSTD> : (Post-Determinatif) : post-deterministik hece varsa ikisinin arasına koyulmalı "];
    const KEYBOARD_SHORTCUTS = ["Klavye Kısayolları :",
        "Tablet üzerinde YUKARI yönüne gitmek : YUKARI OK TUŞU",
        "Tablet üzerinde AŞAĞI yönüne gitmek : AŞAĞI OK TUŞU",
        "Tablet üzerinde SOL yönüne gitmek : SOL OK TUŞU",
        "Tablet üzerinde SAĞ yönüne gitmek : SAĞ OK TUŞU",
        "Yapılan son işlemi geri almak : DELETE / DEL (konum: klavye sağ üst)",
        "Geri alınan son işlemi yeniden yapmak : ENTER",
        "Yapılan işaretleri kaydetmek : ALT + S"];
    
    const infoBtnsStyle = {
        position: 'absolute',
        top: '110%',
        left: '15%',
        transform: 'translateX(-50%)',
        background: "black",
        color: "white",
        padding: "5px",
        whiteSpace: 'nowrap',
        zIndex: 9999
    }
    
    
    const { logout } = useLogout();
    const handleClick = () => { logout() }
    
    return (
        <div className={"navbar navbar-light bg-body-tertiary mx-5 my-3 d-flex"}>
            <div className={"navbar-btn"}>
                <a href={"/profile"}> <button className={"me-3 btn btn-info"} style={{marginLeft: 100}}><i className={"fa-regular fa-address-card"}/> My Profile </button> </a>
                <a href={"/tablet"}> <button className={"me-3 btn btn-info"}><i className={"fa-regular fa-rectangle-list"}/> All Tablets </button> </a>
                <button className={"btn btn-info"} onClick={handleClick}><i className={"fa-solid fa-arrow-right-from-bracket"}/> Logout </button>
            </div>
            
            <div style={{ position: "relative", display: "inline-block"}}>
                
                <button className={"btn btn-info me-3"} onMouseEnter={() => setIsHoveredInfo(true)}
                        onMouseLeave={() => setIsHoveredInfo(false)} style={{cursor: "pointer"}}>
                    <i className={"fa-solid fa-code"}/> Special Tokens </button>
                {isHoveredInfo && (
                    <div style={infoBtnsStyle}>
                        {TOKENS.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                )}
                
                <button className={"btn btn-info"} onMouseEnter={() => setIsHoveredShortcuts(true)}
                        onMouseLeave={() => setIsHoveredShortcuts(false)} style={{cursor: "pointer", marginRight: 100}}>
                    <i className={"fa-regular fa-keyboard"}/> Keyboard Shortcuts </button>
                {isHoveredShortcuts && (
                    <div style={infoBtnsStyle}>
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