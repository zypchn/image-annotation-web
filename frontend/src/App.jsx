import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./pages/LoginPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TabletSearch from "./pages/TabletSearch";
import Canvas from "./containers/Canvas";
import {useEffect, useState} from "react";
function App() {
  
  return (
    <>
        <div className={"App"}>
            <Router>
                <Routes>
                    <Route exact path={"/login"} element={<LoginPage />} />
                    <Route exact path={"/tablets"} element={<TabletSearch />} />
                    <Route exact path={"/tablets/:tabletName"} element={<Canvas />} />
                    <Route exact path={"tablets/label"} element={<Canvas />} />
                </Routes>
            </Router>
        </div>
    </>
  )
}

export default App
