import React from 'react';
import {HashRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import DriversPage from './components/Drivers/DriversPage';
import TeamsPage from './components/Teams/TeamsPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AuthOnlyRoute from './components/Auth/AuthOnlyRoute';
import {AuthProvider} from './components/Auth/AuthContext';
import Parse from 'parse';
import Env from './environment';
import FlashbackIntro from "./components/Flashback/FlashbackIntro";
import FlashbackReveal from "./components/Flashback/FlashbackReveal";
import PlayRound from "./components/Flashback/PlayRound";
import Score from "./components/Flashback/Score";
import Profile from "./components/Profile/Profile";
import bgPattern from './assets/images/pattern/background_pattern_4.jpg';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

export default function App() {
    return (
        <Router>
            {/* global auth context */}
            <AuthProvider>
                <div style={{ minHeight: '100vh', backgroundImage: `url(${bgPattern})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    <Nav/>

                    <Routes>
                        {/* public landing page */}
                        <Route path="/" element={<Home/>}/>

                        {/* auth pages - available only when NOT signed-in */}
                        <Route element={<AuthOnlyRoute/>}>
                            <Route path="/auth/login" element={<Login/>}/>
                            <Route path="/auth/register" element={<Register/>}/>
                        </Route>

                        {/* protected content — accessible only when signed-in */}
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/drivers" element={<DriversPage/>}/>
                            <Route path="/teams" element={<TeamsPage/>}/>
                            <Route path="/profile"  element={<Profile/>}/>
                            <Route path="/flashback" element={<FlashbackIntro/>}/>
                            <Route path="/flashback/reveal" element={<FlashbackReveal/>}/>
                            <Route path="/flashback/play/:raceId" element={<PlayRound/>}/>
                            <Route path="/flashback/score" element={<Score/>}/>
                        </Route>
                    
                        {/* catch-all */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}