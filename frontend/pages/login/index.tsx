import LoginForm from "@/components/login/loginForm";
import { COLOR } from "@/theme/globalTheme";

export default function Page() {
  return (
    <div style={{margin: "0.0rem", backgroundColor: COLOR.background}}>
      <h1 style={{textAlign: "center", color: "white", margin: "0", paddingTop: "80px"}}>TOURISTER</h1>
      <h4 style={{textAlign: "center", color: "white", margin: "0", paddingBottom: "80px"}}>Explore new place with us</h4>
      <LoginForm />
    </div>
  );
}
