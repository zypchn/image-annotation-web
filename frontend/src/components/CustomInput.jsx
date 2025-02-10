import {useState} from "react";

const CustomInput = ({ value, onChange, onDelete }) => {
    
    const CUSTOM_CHARS = ["ṷ", "Ṷ", "ḫ", "Ḫ", "ṣ", "Ṣ", "š", "Š", "á", "Á", "à", "Á", "é", "É", "è", "È", "í",
        "Í", "ì", "Ì", "ú", "Ú", "ù", "Ù"];
    const languages = ["Hititçe", "Sümerce", "Akadca", "Hurrice", "Luwice", "Hattice", "Palaca"];
    const halfLength = Math.ceil(CUSTOM_CHARS.length / 2);
    const firstRow = CUSTOM_CHARS.slice(0, halfLength);
    const secondRow = CUSTOM_CHARS.slice(halfLength);
    
    return (
        <div style={{ 
            display: "inline-grid",
            flexDirection: "column",
            margin: 5,
            position: "relative",
            zIndex: 1
        }}>
            <input
                type={"text"}
                value={value}
                onChange={(e) => onChange(e.target.value, "text")}
                placeholder="Enter text"
                style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px"
                }}
                id={"textField"}
            />
            <table>
                <tbody>
                <tr
                    onClick={(e) => {
                        const textField = document.getElementById("textField");
                        textField.value += e.target.innerText;
                        onChange(textField.value);
                    }}
                >
                    {firstRow.map((char, index) => (
                        <td key={`row1-custom-char-${index}`} className={"accent-cell"}>
                            {char}
                        </td>
                    ))}
                </tr>
                <tr
                    onClick={(e) => {
                        const textField = document.getElementById("textField");
                        textField.value += e.target.innerText;
                        onChange(textField.value, "text");
                    }}
                >
                    {secondRow.map((char, index) => (
                        <td key={`row1-custom-char-${index}`} className={"accent-cell"}>
                            {char}
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CustomInput;
