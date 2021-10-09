import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from "../helpers/GeneralHelpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    return <Route {...rest} render={props => (
        isAuthenticated() ?
            <Component {...props} />
            : <Redirect to="/login" />
    )} />
    // if (isAuthenticated()) {
    //     return <Route {...rest} render={props => {
    //         return <Component {...props} />
    //     }} />
    // } else {
    //     <Redirect to="/login" />
    // }
};

export default PrivateRoute;