import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {


    const location = useLocation()

    const {user,loading}=UseAuth()



    if(loading){
        return <p>Loading ...</p>

    }

    if(user){
        return children

    }


    return <Navigate state={location?.pathname} to="/login" />; 
};

export default PrivateRoute;