import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-ui-kit/css/mdb.min.css';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import Navbar from "./components/Navbar.jsx";

function Redirect(props) {
    return null;
}

function App() {
  return (
    <div className={"App"}>
        <Router>
            <Routes>
                <Route exact path={"/login"} element={<LoginPage />} />
                <Route exact path={"/tablets"} element={<TabletSearch />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App
