import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import authContext from "../../Context/AuthContext/authcontext";
import MemoryContext from "../../Context/MemoryContext/memoryContext";

const Navbar = (props) => {
    const AuthContext = useContext(authContext);
    const { token, logout } = AuthContext;

    const memoryContext = useContext(MemoryContext);
    const { clearMemories } = memoryContext;

    const onLogout = () => {
        logout();
        clearMemories();
    };

    const newLinks = (
        <Fragment>
            <li className="my-auto px-6">
                <Link to="/">Home</Link>
            </li>
            <li className="my-auto px-6">
                <a onClick={onLogout} href="/login">
                    Logout
                </a>
            </li>
        </Fragment>
    );

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

    const location = useLocation();

    return (
        <div className="w-full flex justify-between h-16 bg-navbar shadow-lg absolute inset-0">
            <div className="flex">
                <i className="fas fa-bookmark fa-2x my-auto px-8"></i>
                <h1 className="text-3xl my-auto">Memorify</h1>
            </div>
            <ul className="flex">
                {token !== null
                    ? location.pathname === "/"
                        ? homeLinks
                        : newLinks
                    : authLinks}
            </ul>
        </div>
    );
};

export default Navbar;
