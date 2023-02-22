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
      <Link href="./manage_account/editProfile" passHref><button type="button">Edit Profile</button></Link>
      <Link href="../register" passHref><button type="button">Transfer Funds</button></Link>
    </form>
  );
};

export default manageAccount;