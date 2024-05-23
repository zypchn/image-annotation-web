import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import UploadTablet from "./pages/UploadTablet.jsx";
import LabelTool from "./components/LabelTool.jsx";

function App() {
  
  return (
    <>
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route exact path={"/login"} element={<LoginPage />} />
                    <Route exact path={"/tablets"} element={<TabletSearch />} />
                    <Route exact path={"/tablets/create"} element={<UploadTablet />} />
                    <Route exact path={"/tablets/label"} element={<LabelTool />} />
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App
