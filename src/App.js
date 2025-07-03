import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import DriversPage from './components/Drivers/DriversPage';
import TeamsPage from './components/Teams/TeamsPage';
import Parse from "parse";
import Env from "./environment.js";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;
function App() {
    return (
        <Router>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/drivers" element={<DriversPage/>}/>
                <Route path="/teams" element={<TeamsPage/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
