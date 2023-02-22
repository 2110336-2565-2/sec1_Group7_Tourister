import { useState, MouseEvent } from "react";
import Link from 'next/link';

type AccountType = 'tourist' | 'guide';

const manageAccount = () => {
  const [name, setName] = useState('Admin');
  const [surname, setSurname] = useState('Tester');
  // const [citizenId, setCitizenId] = useState('190xx-xxxxx-xx-x');
  const [guideLicenseID, setGuideLicenseID] = useState('9-999999');
  const [phoneNumber, setPhoneNumber] = useState('099-999-9999');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      'Name': name,
      'Surname': surname,
      'Guide License ID': guideLicenseID,
      'Phone Number': phoneNumber})
  };
  // const handleBackButton = (e: MouseEvent) => {
  //   e.preventDefault();
  //   console.log({
  //     'Name': name,
  //     'Surname': surname})
  // };

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit}>
      <ProfileBox style={{backgroundColor:COLOR.primary}}>
        <div>
          <h2>{`hello ${accountType}`}</h2>
          <h1>{`${user.name} ${user.surname}`}</h1>
        {/* </div>
        <div> */}
          <h4>Total</h4>
          <h1>{`THB ${user.balance}`}</h1>
        </div>
      </ProfileBox>
      <Link href="./manage_account/editProfile" style={{width:"100%",textDecoration:"none"}} passHref>
        <Button>
          <PersonOutlinedIcon style={{width:"20%",color:"gray"}}></PersonOutlinedIcon>
          <h3 style={{width:"60%",paddingTop:"0.1rem",textAlign:"left",fontFamily:"Poppins",fontSize:"1.05rem"}}>Edit Profile</h3>
          <NavigateNextOutlinedIcon style={{width:"20%",color:"gray"}}></NavigateNextOutlinedIcon>
        </Button>
      </Link>
      <Link href="" style={{width:"100%",textDecoration:"none"}} passHref>
        <Button>
          <SwapHorizOutlinedIcon style={{width:"20%",color:"gray"}}/>
          <h3 style={{width:"60%",paddingTop:"0.1rem",textAlign:"left",fontFamily:"Poppins",fontSize:"1.05rem"}}>Transfer Funds</h3>
          <NavigateNextOutlinedIcon style={{width:"20%",color:"gray"}}/>
        </Button>
      </Link>
      <Link href="" style={{width:"100%",textDecoration:"none"}} passHref>
        <Button>
          <LogoutOutlinedIcon style={{width:"20%",color:"gray"}}/>
          <h3 style={{width:"60%",paddingTop:"0.1rem",textAlign:"left",fontFamily:"Poppins",fontSize:"1.05rem"}}>Log Out</h3>
          <NavigateNextOutlinedIcon style={{width:"20%",color:"gray"}}/>
        </Button>
      </Link>
    </form>
  );
};

export default manageAccount;