import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Router, { useRouter } from 'next/router'
import { useEffect } from "react";

export default function Landing() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        } else {
            if(user?.isGuide) router.push("/trips")
            else router.push("/search")
        }
    }, [])
    return <></>
}