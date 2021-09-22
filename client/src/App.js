import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/Layout/Navbar";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Alert from "./components/Layout/Alert";
import Home from "./components/Pages/Home";
import New from "./components/Pages/New";
import View from "./components/Pages/View";
import Update from "./components/Pages/Update";
import PrivateRoute from "./components/routing/PrivateRoute";

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
                                <PrivateRoute exact path="/" component={Home} />
                                <PrivateRoute
                                    exact
                                    path="/new"
                                    component={New}
                                />
                                <PrivateRoute
                                    exact
                                    path="/view/:id"
                                    component={View}
                                />
                                <PrivateRoute
                                    exact
                                    path="/update/:id"
                                    component={Update}
                                />
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
