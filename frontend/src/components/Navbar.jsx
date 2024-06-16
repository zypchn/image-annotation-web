import {useLogout} from "../hooks/useLogout.js";
const Navbar = ({isSearch}) => {
    
    const { logout } = useLogout();
    const handleClick = () => { logout() }
    
    return (
        <nav className={"navbar navbar-light bg-body-tertiary mx-5 my-3"}>
            <div className={"container-fluid"}>
                <form className={"d-flex input-group w-auto"} style={{visibility:isSearch}}>
                    <input type={"text"} placeholder={"search"} name={"search"}/>
                    <button type={"submit"}><i className={"fa fa-search"}></i></button>
                </form>
                <div className={"navbar-btn"}>
                    <button className={"mx-3"}><i className={"fa-regular fa-address-card"}/> My Profile</button>
                    <button className={"me-3"}><i className={"fa-regular fa-rectangle-list"}></i> All Tablets</button>
                    <button onClick={handleClick}><i className={"fa-solid fa-arrow-right-from-bracket"}/> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;