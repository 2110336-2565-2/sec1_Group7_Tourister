import NavBar from "@/components/layout/navBar";
import { AuthProvider } from '@/components/AuthProvider';

export default function Page() {
  return (
    <AuthProvider>
  <>
    <NavBar/>
    <div style={{paddingTop:"3rem",paddingBottom:"0.9rem",justifyContent:"center"}}>
      <h1 style={{textAlign:"center",fontWeight:"bolder"}}>Notification</h1>
    </div>
  </>
  </AuthProvider>
  );
}

