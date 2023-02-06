"use client";

import { useState, MouseEvent } from "react";
import Link from 'next/link';

type AccountType = 'tourist' | 'guide';

const createTrip = () => {
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [startTime, setStartTime] = useState('');
  const [end, setEnd] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [language, setLanguage] = useState('');
  const [information, setInformation] = useState('');
  const [nameOfStartLocation, setnameOfStartLocation] = useState('');
  const [informationOfStartLocation, setInformationOfStartLocation] = useState('');
  const [nameOfEndLocation, setNameOfEndLocation] = useState('');
  const [informationOfEndLocation, setInformationOfEndLocation] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      'Name': name,
      'Start': start,
      'End': end,
      'Price': price,
      'Group Size': groupSize,
      'Language': language,
      'Start Location Name': nameOfStartLocation,
      'Start Location Information': informationOfStartLocation,
      'End Location Name': nameOfEndLocation,
      'End Location Information': informationOfEndLocation,
      'Additional Information': information,})
  };

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit}>
      {/* <Link href="../register" passHref><button type="button" onClick={handleBackButton}>Back</button></Link> */}
      <Link href="./manage_account" passHref><button type="button">Back</button></Link>
      <label>Profile</label>
      <label>Trip Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Duration</label>
      <label>Start</label>
      <div>
      <input
        type="Date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      </div>
      <label>End</label>
      <div>
      <input
        type="Date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <input
        type="Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      </div>
      <label>Price:Baht</label>
      <input
        type="guideLicenseID"
        placeholder="Price in Baht Unit"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Group Size</label>
      <input
        type="text"
        placeholder="Number of participant(s)"
        value={groupSize}
        onChange={(e) => setGroupSize(e.target.value)}
      />
      <label>Language</label>
      <input
        type="text"
        placeholder="Thai/English/Spanish"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <div>
        <input
          type="Time"
          value={startTime}
          readOnly = {true}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label>Departure</label>
      </div>
      <div>
        <label>Location :</label>
        <input
          type="text"
          placeholder="Name of Location"
          value={nameOfStartLocation}
          onChange={(e) => setnameOfStartLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="information"
          value={informationOfStartLocation}
          onChange={(e) => setInformationOfStartLocation(e.target.value)}
        />
      </div>
      <div>
        <input
          type="Time"
          value={endTime}
          readOnly = {true}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label>Return</label>
      </div>
      
      <div>
        <label>Location :</label>
        <input
          type="text"
          placeholder="Name of Location"
          value={nameOfEndLocation}
          onChange={(e) => setNameOfEndLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="information"
          value={informationOfEndLocation}
          onChange={(e) => setInformationOfEndLocation(e.target.value)}
        />
      </div>
      <label>Additional Information</label>
      <input
        type="text"
        placeholder="More Information..."
        value={information}
        onChange={(e) => setInformation(e.target.value)}
      />
      <button type="submit">Publish</button>
    </form>
  );
};

export default createTrip;