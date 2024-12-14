import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import UploadTablet from "./pages/UploadTablet.jsx";
import AnnotPage from "./pages/AnnotPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import {useAuthContext} from "./hooks/useAuthContext.js";
import Footer from "./components/Footer.jsx";
import BBoxAnnotPage from "./pages/BBoxAnnotPage.jsx";
import BBoxAnnotTool from "./components/BBoxAnnotTool.jsx";

function App() {
    
    const {user, loading} = useAuthContext();
    
    if (loading) {return <div>Loading...</div>}
    
    
    return (
        <>
            <div className={"App"}>
                <Router>
                    <Routes>
                        <Route exact path={"/"} element={<Navigate to={"/signup"}/>}/>
                        <Route exact path={"/signup"} element={!user ? <SignupPage/> : <Navigate to={"/profile"}/>}/>
                        <Route exact path={"/login"} element={!user ? <LoginPage/> : <Navigate to={"/profile"}/>}/>
                        <Route exact path={"/tablet"} element={user ? <TabletSearch/> : <Navigate to={"/login"}/>}/>
                        <Route exact path={"/tablet/create"} element={user ? <UploadTablet/> : <Navigate to={"/login"}/>}/>
                        <Route exact path={"/tablet/:id"} element={user ? <AnnotPage/> : <Navigate to={"/login"}/>}/>
                        <Route exact path={"/profile"} element={user ? <ProfilePage/> : <Navigate to={"/login"}/>}/>
                    </Routes>
                </Router>
                {/*<Footer />*/}
            </div>
        </>
    );
    
}

export default App
