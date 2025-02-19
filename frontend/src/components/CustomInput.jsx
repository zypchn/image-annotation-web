import {useState} from "react";

const CustomInput = ({
                         // eslint-disable-next-line react/prop-types
                         comments, onTextChange, selectedId, langs, onLanguageChange,
                         // eslint-disable-next-line react/prop-types
                         rows, onRowChange, cols, onColChange, onDelete
                     }) => {
    
    const CUSTOM_CHARS = ["ṷ", "Ṷ", "ḫ", "Ḫ", "ṣ", "Ṣ", "š", "Š", "á", "Á", "à", "Á", "é", "É", "è", "È", "í",
        "Í", "ì", "Ì", "ú", "Ú", "ù", "Ù"];
    const languages = ["Hititçe", "Sümerce", "Akadca", "Hurrice", "Luwice", "Hattice", "Palaca"];
    
    const halfLength = Math.ceil(CUSTOM_CHARS.length / 2);
    const firstRow = CUSTOM_CHARS.slice(0, halfLength);
    const secondRow = CUSTOM_CHARS.slice(halfLength);
    const [text, setText] = useState(comments[selectedId] || null);
    const [lang, setLang] = useState(langs[selectedId] || null);
    const [row, setRow] = useState(rows[selectedId] || 0);
    const [col, setCol] = useState(cols[selectedId] || 0);
    const [alert, setAlert] = useState(false);
    
    return ( // TODO : Implement old method
        <form className={"custom-input"} onSubmit={(e) => {
            e.preventDefault();
            onTextChange(selectedId, text);
            onLanguageChange(selectedId, lang);
            onRowChange(selectedId, row);
            onColChange(selectedId, col);
            
        }}>
            <div className={"input-column"}>
                <input
                    type="text"
                    onChange={(e) => {
                        e.preventDefault();
                        setText(e.target.value)
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
                            setText(textField.value);
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
                            setText(textField.value);
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
                <button type={"submit"} className={"btn btn-success"} onClick={() => {
                    setAlert(true);
                    setTimeout(() => setAlert(false), 1000);
                }}><i className="fa-solid fa-check"></i></button>
                <button className={"btn btn-danger input-del"} onClick={async () => {
                    await onDelete(selectedId);
                }}><i className={"fa-solid fa-trash-can"}></i></button>
                {alert &&
                <button className={"thumbs-up-btn"}><i className={"fa-regular fa-thumbs-up"}/></button> }
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
                        <option value={"null"}>dil seçiniz</option>
                        {languages && languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </p>
                
                <p><strong> Satır : </strong>
                    <input id={"row-no"} type={"number"}
                           defaultValue={rows[selectedId] || 0} min={0}
                           onChange={(e) => {
                               setRow(Number(e.target.value))
                           }}/>
                </p>
                
                <p><strong> Sütun : </strong>
                    <input id={"col-no"} type={"number"}
                           defaultValue={cols[selectedId] || 0} min={0}
                           onChange={(e) => {
                               setCol(Number(e.target.value));
                           }}/>
                </p>
            </div>
        </form>
    );
};

export default CustomInput;