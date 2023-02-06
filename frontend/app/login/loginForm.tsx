"use client";

import { useState } from "react";

type AccountType = 'tourist' | 'guide';

const LoginForm = () => {
  const [accountType, setAccountType] = useState('tourist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form style={{display:'flex', alignItems: 'center',flexDirection:'column'}} onSubmit={handleSubmit}>
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
      
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;