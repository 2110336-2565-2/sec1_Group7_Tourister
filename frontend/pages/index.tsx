import { AuthProvider, useAuth } from "@/components/AuthProvider";
import Router, { useRouter } from 'next/router'
import { useEffect } from "react";
import LandingPage from "@/components/landing/landing";
export default function Landing() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}