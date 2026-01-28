import React, { createContext, useEffect, useState } from 'react';
import {  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';


export const AuthContext =createContext()

const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {


    
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)




    const createUser = (email,password)=>{
           setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signIn = (email,password)=>{
           setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }


    // google signin
const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth,provider)
}

// updateUser

const updateUser = (profile)=>{
    return updateProfile(auth.currentUser,profile)
}

// Logout
const logoutUser = ()=>{
    return signOut(auth)
}

// observer
useEffect(()=>{

    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)

    })

    return ()=>{
        unsubscribe()
    }

},[])







const authData = {
    createUser,
    signIn,
    googleSignIn,
    updateUser,
    user,
    setUser,
    logoutUser,
    loading



}




     return <AuthContext value={authData}>
            {children}
        </AuthContext>
};

export default AuthProvider;