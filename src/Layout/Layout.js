import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";

import Login from '../Screens/Login/Login'
import Signup from '../Screens/Signup/Signup'
import Dashboard from "../Screens/Dahboard/Dahboard"
import PageNotFound from '../Screens/NotFound/PageNotFound';

import { ProtectedRoute } from './ProtectedRoute';
import { connect } from "react-redux";

const routesArr = [
    {
        path: '/',
        Component: Dashboard
    }
]

const Layout = (props) => {
    const { currentUser } = props;
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
            {routesArr.map((route) => {
                return (
                    <Route
                        key={route.path}
                        //exact={route.exact}
                        path={route.path}
                        element={<ProtectedRoute component={route.Component} currentUser={currentUser} />}
                    //render={(props) => <route.component {...props} />}
                    />
                );
            })}
        </Routes>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.user.data,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
