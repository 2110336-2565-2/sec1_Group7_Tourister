"use client";

import { useState } from "react";

type AccountType = 'tourist' | 'guide';

const registerForm = () => {
  const [accountType, setAccountType] = useState('tourist');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}}onSubmit={handleSubmit}>
      <div>
         <label>
          <input
            type="radio"
            value="tourist"
            checked={accountType === 'tourist'}
            onChange={(e) => setAccountType(e.target.value as AccountType)}
          />
          Tourist
        </label>
        <label>
          <input
            type="radio"
            value="guide"
            checked={accountType === 'guide'}
            onChange={(e) => setAccountType(e.target.value as AccountType)}
          />
          Guide
        </label>
      </div>
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Surname</label>
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <label>Citizen ID</label>
      <input
        type="text"
        placeholder="Citizen Number"
        value={citizenId}
        onChange={(e) => setCitizenId(e.target.value)}
      />
      <label>Phone number</label>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      <label>Confirm Password</label>
      <div>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? 'Hide' : 'Show'} Password
        </button>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default registerForm;