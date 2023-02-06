"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';

type AccountType = 'tourist' | 'guide';

const editProfileGuide = () => {
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
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
      <Link href="./manage_account" passHref><button type="button">Back</button></Link>
      <label>Profile</label>
      <label>Name</label>
      <input
        type="text"
        placeholder="Admin"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Surname</label>
      <input
        type="text"
        placeholder="Tester"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <label>Citizen ID</label>
      <input
        type="text"
        placeholder="190xx-xxxxx-xx-x"
        // value={citizenId}
        readOnly = {true}
        // onChange={(e) => setCitizenId(e.target.value)}
      />
      <label>Guide License ID</label>
      <input
        type="guideLicenseID"
        placeholder="License number"
        value={guideLicenseID}
        onChange={(e) => setGuideLicenseID(e.target.value)}
      />
      <label>Phone number</label>
      <input
        type="text"
        placeholder="0xx-xxx-xxxx"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default editProfileGuide;