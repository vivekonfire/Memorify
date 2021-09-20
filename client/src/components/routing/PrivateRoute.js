import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/authcontext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authcontext = useContext(AuthContext);
    const { isAuth } = authcontext;
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth === false ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
