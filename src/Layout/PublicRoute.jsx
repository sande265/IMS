import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../helpers/GeneralHelpers";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    // if (isAuthenticated) {
    // }
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isAuthenticated() && restricted ?
                <Redirect to="/login" />
                : <Component {...props} />
        )} />
    );
    // return <Redirect to="/login" />
};

export default PublicRoute;