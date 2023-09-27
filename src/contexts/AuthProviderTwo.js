import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { app2 } from '../firebase/firebase.config';




export const AuthContextTwo = createContext();
const auth = getAuth(app2)

const AuthProviderTwo = ({children}) => {
    const [userTwo, setUser] = useState(null);
    const [loadingTwo, setLoading] = useState(true);
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo);
    }

    const logOutTwo = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser,
        signIn,
        updateUser,
        logOutTwo,
        userTwo,
        loadingTwo
    }
    return (
        <AuthContextTwo.Provider value={authInfo}>
            {children}
        </AuthContextTwo.Provider>
    );
};

export default AuthProviderTwo;