import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import SidebarUpload from "./components/SidebarUpload";
import Canvas from "./containers/Canvas";

function App() {
  return (
    <>
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route exact path={"/login"} element={<LoginPage />} />
                    <Route exact path={"/tablets"} element={<TabletSearch />} />
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App
