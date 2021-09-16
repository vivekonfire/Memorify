import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import authContext from "../../Context/AuthContext/authcontext";

const Navbar = () => {
    const AuthContext = useContext(authContext);

    const { isAuth, logout, clearMemories } = AuthContext;

    const onLogout = () => {
        logout();
        clearMemories();
    };

    const homeLinks = (
        <Fragment>
            <li className="my-auto px-6">
                <a onClick={onLogout} href="/login">
                    Logout
                </a>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li className="my-auto px-6">
                <Link to="/login">Login</Link>
            </li>
            <li className="my-auto px-6">
                <Link to="/register">Sign Up</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="w-full flex justify-between h-16 bg-navbar shadow-lg absolute inset-0">
            <div className="flex">
                <i className="fas fa-bookmark fa-2x my-auto px-8"></i>
                <h1 className="text-3xl my-auto">Memorify</h1>
            </div>
            <ul className="flex">{isAuth ? homeLinks : authLinks}</ul>
        </div>
    );
};

export default Navbar;
