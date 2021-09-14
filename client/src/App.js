import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

import AuthState from "./Context/AuthContext/AuthState";

const App = () => {
    return (
        <div className="bg-background min-h-screen min-w-screen">
            <AuthState>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={SignUp} />
                    </Switch>
                    <Navbar />
                </Router>
            </AuthState>
        </div>
    );
};

export default App;
