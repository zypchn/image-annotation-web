import {useLogout} from "../hooks/useLogout.js";
const Navbar = () => {
    
    const { logout } = useLogout();
    const handleClick = () => { logout() }
    
    return (
        <div className={"navbar navbar-light bg-body-tertiary mx-5 my-3 d-inline-flex"}>
            <div className={"container"}>
                <div className={"navbar-btn"}>
                    <a href={"/profile"}> <button className={"me-3"}><i className={"fa-regular fa-address-card"}/> My Profile</button> </a>
                    <a href={"/tablet"}> <button className={"me-3"}><i className={"fa-regular fa-rectangle-list"}/> All Tablets</button> </a>
                    <button onClick={handleClick}><i className={"fa-solid fa-arrow-right-from-bracket"}/> Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;