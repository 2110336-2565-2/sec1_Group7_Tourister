import { useState, MouseEvent } from "react";
import Link from 'next/link';
import { COLOR } from "@/theme/globalTheme";
import styled from "styled-components";

type AccountType = 'tourist' | 'guide';

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  
  
  width: 100%;
  background: transparent;
  padding: 1.5rem;
`

const Icon = styled.div`
  background: red;
`

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
      {/* <ButtonContainer>
        <div>Test1</div>
        <div>Test2</div>
        <div>Test3</div>
      </ButtonContainer> */}
      
      {/* <ButtonContainer>
        <Icon>???</Icon>
        <Link href="./manage_account/editProfile" style={{width:"60%"}} passHref><button type="button">Edit Profile</button></Link>
        <Icon style={{width:"20%"}}>???</Icon>
      </ButtonContainer>
      <ButtonContainer>
        <Icon style={{width:"20%"}}>???</Icon>
        <Link href="" style={{width:"60%"}} passHref><button type="button">Transfer Funds</button></Link>
        <Icon style={{width:"20%"}}>???</Icon>
      </ButtonContainer>
      <ButtonContainer>
        <Icon style={{width:"20%"}}>???</Icon>
        <Link href="" style={{width:"60%"}} passHref><button type="button">Log Out</button></Link>
        <Icon style={{width:"20%"}}>???</Icon>
      </ButtonContainer> */}


      <Link href="./manage_account/editProfile" passHref><button type="button">Edit Profile</button></Link>
      <Link href="../register" passHref><button type="button">Transfer Funds</button></Link>
    </form>
  );
};

export default manageAccount;