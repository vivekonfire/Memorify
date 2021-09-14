import React, { useReducer } from "react";
import AuthContext from "./authcontext";
import AuthReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER,
    AUTH_ERROR,
} from "../types";

const AuthState = (props) => {
    const initialState = {
        laoding: true,
        user: null,
        isAuth: false,
        token: localStorage.getItem("token"),
        error: null,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async () => {
        if (localStorage.token) setAuthToken(localStorage.token);
        try {
            const res = await axios.get("/api/auth");

            dispatch({
                type: LOAD_USER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };

    const login = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "Application/json",
            },
        };

        try {
            const res = await axios.post("/api/auth", formData, config);

            dispatch({ type: LOGIN_SUCCESS, payload: res });

            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }
    };

    const register = async (formData) => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios.post("/api/users", formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res });

            loadUser();
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                laoding: state.loading,
                error: state.error,
                user: state.user,
                token: state.token,
                isAuth: state.isAuth,
                loadUser: loadUser,
                login: login,
                register: register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
