import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextTwo } from '../../contexts/AuthProviderTwo';


const PrivateRouteTwo = ({children}) => {
    const {userTwo, loadingTwo} = useContext(AuthContextTwo);
    const location = useLocation();

    if(loadingTwo){
        return <progress className="progress w-56"></progress>
    }

    if (userTwo){
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRouteTwo;