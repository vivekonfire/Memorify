import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER,
    AUTH_ERROR,
} from "../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
                isAuth: true,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.data.token);
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                isAuth: false,
                error: action.payload,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
