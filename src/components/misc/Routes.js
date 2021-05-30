import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router';
import axios from 'axios';

export const PublicRoute = ({ component: Component, state, setState, ...rest }) => {
    return (
        <Route render={(props) => {
            return (<Component {...rest} {...props} state={state} setState={setState}/>)
        }}></Route>
    )
}

export const ProtectedRoute = ({ component: Component, state, setState, ...rest }) => {
    const [isAuthenticated, setauth] = useState(false);

    console.log(isAuthenticated)
    return (
    <Route {...rest} render={(props) => {
        return isAuthenticated === true ? <Component {...rest} {...props} state={state} setState={setState}/> : <Redirect to='/'/>
    }}>
    </Route>
    )
}