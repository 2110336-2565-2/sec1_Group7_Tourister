import ManageAccount from '@/components/manage_account/manageAccount';
import NavBar from "@/components/layout/navBar";
import { AuthProvider } from '@/components/AuthProvider';

export default function Page() {
  return (
  <AuthProvider>
  <>
    <NavBar/>
    <div style={{paddingTop:"3rem",paddingBottom:"0.9rem",justifyContent:"center"}}>
      <h1 style={{textAlign:"center",fontWeight:"bolder"}}>TOURISTER</h1>
    </div>
    <ManageAccount/>
  </>
  </AuthProvider>
  );
}

