import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/Layout/Navbar";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Alert from "./components/Layout/Alert";
import Home from "./components/Pages/Home";

import AuthState from "./Context/AuthContext/AuthState";
import AlertState from "./Context/AlertContext/AlertState";
import MemoryState from "./Context/MemoryContext/MemoryState";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <div className="bg-background min-h-screen min-w-screen">
            <AuthState>
                <AlertState>
                    <MemoryState>
                        <Router>
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route
                                    exact
                                    path="/register"
                                    component={SignUp}
                                />
                                <Route exact path="/" component={Home} />
                            </Switch>
                            <Alert />
                            <Navbar />
                        </Router>
                    </MemoryState>
                </AlertState>
            </AuthState>
        </div>
    );
};

export default App;
