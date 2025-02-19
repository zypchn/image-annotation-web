import {useLogout} from "../hooks/useLogout.js";
import {useState} from "react";
const Navbar = () => {
    
    const [isHoveredInfo, setIsHoveredInfo] = useState(false);
    const [isHoveredShortcuts, setIsHoveredShortcuts] = useState(false);
    
    const TOKENS = ["Özel Tokenler : ", 
        "Heceler Arası :    -", 
        "Kelime Sonu :     ,", 
        "Satır Sonu :    *", 
        "Paragraf Sonu :    .", 
        "Yeni Sütun : +"];
    
    const KEYBOARD_SHORTCUTS = ["Klavye Kısayolları :",
        "Yapılan işaretleri kaydetmek : ALT + S"];
    
    const { logout } = useLogout();
    const handleClick = () => { logout() }
    
    return (
        <div className={"navbar navbar-light bg-body-tertiary mx-5 my-3 d-flex"}>
            <div className={"navbar-btn"}>
                <a href={"/profile"}> <button id={"profile-btn"} className={"me-3 btn btn-info"}><i className={"fa-regular fa-address-card"}/> Profilim </button> </a>
                <a href={"/tablet"}> <button className={"me-3 btn btn-info"}><i className={"fa-regular fa-rectangle-list"}/> Tüm Resimler </button> </a>
                <a href={"/tablet/create"}> <button className={"me-3 btn btn-info"}><i className={"fa-solid fa-upload"}></i> Resim Yükle </button> </a>
                <button className={"btn btn-info"} onClick={handleClick}><i className={"fa-solid fa-arrow-right-from-bracket"}/> Çıkış Yap </button>
            </div>
            
            <div className={"info-buttons-div"}>
                
                <button  id={"token-info-btn"} className={"btn btn-info me-3"} onMouseEnter={() => setIsHoveredInfo(true)}
                        onMouseLeave={() => setIsHoveredInfo(false)}>
                    <i className={"fa-solid fa-code"}/> Special Tokens </button>
                {isHoveredInfo && (
                    <div className={"info-buttons"}>
                        {TOKENS.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </div>
                )}
                
                <button id={"shortcut-info-btn"} className={"btn btn-info"} onMouseEnter={() => setIsHoveredShortcuts(true)}
                        onMouseLeave={() => setIsHoveredShortcuts(false)}>
                    <i className={"fa-regular fa-keyboard"}/> Keyboard Shortcuts </button>
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