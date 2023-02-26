import { verifyToken } from '@/services/authService';
import { addHoursToDate } from '@/utils/Utils';
import Router, { useRouter } from 'next/router'
import React, { createContext, useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2';

const AuthContext = createContext({});

interface Props {
    role?: string
    children: React.ReactElement
}

export const AuthProvider = ({ role, children }: Props) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken == null){
            router.push("/login");
            clearInterval(interval);
            return;
        }
        verifyToken(accessToken, role ? role : "").then((auth) => {
            if(!auth) ForceLogout()
        })

        interval = setInterval(() => {
            const expiredAt = new Date(localStorage.getItem("token_expires") ?? addHoursToDate(new Date(), -1))
            const now = new Date();
            if (now > expiredAt) {
              ForceLogout();
            }
            
            
        }, 1000);
        
        function ForceLogout() {
            clearInterval(interval);
            localStorage.removeItem('accessToken')
            localStorage.removeItem('token_expires')
            router.push("/login");
            //ShowUnauthorizeError();
            Swal.fire("Error","Please log in", 'error')
        }

        return () => clearInterval(interval);
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)