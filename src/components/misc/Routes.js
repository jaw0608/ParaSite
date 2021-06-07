import React, {useEffect} from 'react';
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

    useEffect(() => {
    const verifyAuth = async () => {
        axios.post('http://localhost:9000/auth/verifyAuth', { headers: { authorization: 'Bearer ' + localStorage.getItem('accessToken')}})
        .then((response) => {
            setState((prevState) => {
                return {
                    ...prevState, 
                    isAuthenticated: true
                }
            })
        })
        .catch((err) => {
            setState((prevState) => {
                return {
                    ...prevState, 
                    isAuthenticated: false
                }
            })
        })
    }

    verifyAuth();
    }, [])

    return (
    <Route {...rest} render={(props) => {
       return state.isAuthenticated === true ? <Component {...rest} {...props} state={state} setState={setState}/> : <Redirect to='/'/>
    }}>
    </Route>
    )
}