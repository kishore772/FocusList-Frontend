import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log('Signup successful', { username, password });
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="overbox">
      <div className="title">REGISTER</div>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="regname">Username</label>
          <input
            type="text"
            name="regname"
            id="regname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="regpass">Password</label>
          <input
            type="password"
            name="regpass"
            id="regpass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="reregpass">Repeat Password</label>
          <input
            type="password"
            name="reregpass"
            id="reregpass"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <span className="spin"></span>
        </div>
        <div className="button">
          <button type="submit">
            <span>NEXT</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
