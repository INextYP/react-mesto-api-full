import React from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({loggedIn, children, ...props}) => {
    return (
        <Route {...props}>{loggedIn ? children : <Redirect to="/login"/>}</Route>
    );
};

export default ProtectedRoute;