'use client'

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from '@/firebase/clientApp';

interface AuthProps {
  children: React.ReactNode;
}

export const AuthContext = createContext(false);

export default function AuthProvider( {children} : AuthProps ) {
    const [loggedIn, setLoggedIn] = useState(false);
  
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    return (
        <>
            <AuthContext.Provider value={loggedIn}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
