import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import Canvas from "./components/Canvas.jsx";
import UploadTablet from "./pages/UploadTablet.jsx";

function App() {
  
  return (
    <>
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route exact path={"/login"} element={<LoginPage />} />
                    <Route exact path={"/tablets"} element={<TabletSearch />} />
                    <Route exact path={"/tablets/:tabletName"} element={<Canvas />} />
                    <Route exact path={"/tablets/create"} element={<UploadTablet />} />
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App
