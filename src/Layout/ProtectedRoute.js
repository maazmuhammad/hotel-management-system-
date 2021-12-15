import React, { useState } from "react";
import { Route, } from "react-router-dom";
import Login from '../Screens/Login/Login';


export const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => {
    console.log(currentUser,"user")

    if (currentUser && Object.keys(currentUser).length !=0 ) {
        return (
            <Component {...rest} />
        )
    }
    else {
        return <Login />
    }

}
