import {useState} from "react";

const CustomInput = ({
                         comments, onTextChange, selectedId, langs, onLanguageChange,
                         rows, onRowChange, cols, onColChange
                     }) => {
    
    const CUSTOM_CHARS = ["ṷ", "Ṷ", "ḫ", "Ḫ", "ṣ", "Ṣ", "š", "Š", "á", "Á", "à", "Á", "é", "É", "è", "È", "í",
        "Í", "ì", "Ì", "ú", "Ú", "ù", "Ù"];
    const languages = ["Hititçe", "Sümerce", "Akadca", "Hurrice", "Luwice", "Hattice", "Palaca"];
    
    const halfLength = Math.ceil(CUSTOM_CHARS.length / 2);
    const firstRow = CUSTOM_CHARS.slice(0, halfLength);
    const secondRow = CUSTOM_CHARS.slice(halfLength);
    const [text, setText] = useState(null);
    const [lang, setLang] = useState(null);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    
    return ( // TODO : Implement old method
        <form className={"custom-input"} onSubmit={(e) => {
            onTextChange(selectedId, text);
            onLanguageChange(selectedId, lang);
            onRowChange(selectedId, row);
            onColChange(selectedId, col);
            e.preventDefault();
            //console.log("hahah");
        }}>
            <div className={"input-column"}>
                <input
                    type="text"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onTextChange(selectedId, text);
                        }
                    }}
                    defaultValue={comments[selectedId]}
                    placeholder={"enter text"}
                    id={"textField"}
                />
                <table>
                    <tbody>
                    <tr
                        onClick={(e) => {
                            const textField = document.getElementById("textField");
                            textField.value = textField.value + e.target.innerText;
                            //onTextChange(selectedId, newValue);
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
                            textField.value = textField.value + e.target.innerText;
                            //onTextChange(selectedId, newValue);
                        }}
                    >
                        {secondRow.map((char, index) => (
                            <td key={`row2-custom-char-${index}`} className={"accent-cell"}>
                                {char}
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={"select-column"}>
                <p>
                    <strong> Dil : </strong>
                    <select
                        defaultValue={langs[selectedId] || undefined}
                        onChange={(e) => {
                            setLang(e.target.value);
                        }}
                    >
                        <option value="null">dil seçiniz</option>
                        {languages && languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </p>
                
                <p><strong> Satır : </strong>
                    <input id={"row-no"} type={"number"} style={{width: 50}}
                           defaultValue={rows[selectedId] || 0} min={0}
                           onChange={(e) => {
                               /*
                               onRowChange(selectedId, Number(e.target.value));
                               
                                */
                               setRow(Number(e.target.value))
                           }}/>
                </p>
                
                <p><strong> Sütun : </strong>
                    <input id={"col-no"} type={"number"} style={{width: 50}}
                           defaultValue={cols[selectedId] || 0} min={0}
                           onChange={(e) => {
                               setCol(Number(e.target.value))
                           }}/>
                </p>
            
            </div>
            <button type={"submit"}>lala</button>
        </form>
    );
};

export default CustomInput;