import React from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({loggedIn, children, ...props}) => {
    return (
        <Route {...props}>{loggedIn ? children : <Redirect to="/signin"/>}</Route>
    );
};

export default ProtectedRoute;
