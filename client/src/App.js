import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";

const App = () => {
    return (
        <div className="bg-background min-h-screen min-w-screen">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={SignUp} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
