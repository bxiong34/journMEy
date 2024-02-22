import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

function SignUp() {
  /*
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3002/register');
    console.log(response.data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:3002/register', { email, username, password})
    .then(() => {
      alert('SignUp Successful');
      setEmail('');
      setUsername('');
      setPassword('');
      fetchUsers();
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    })
  }
  */

  return (
    <div className='w-full h-screen flex'>

      <div className='w-full bg-[#1a1a1a] flex justify-center items-center'>
        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' 
        /* onSubmit={handleSubmit} */ >

          {/* Email Input */}
          <label className='text-white'>Email</label>
          <br />
          <input type='email' name='email' placeholder='Email' className='w-full h-10 border rounded-lg pl-3 mb-5' /* value={email} onChange={(e) => setEmail(e.target.value)} */ />
          <br />

          {/* Username Input */}
          <label className='text-white'>Username</label>
          <br />
          <input type='text' name='username' placeholder='Username' className='w-full h-10 border rounded-lg pl-3 mb-5' /* value={username} onChange={(e) => setUsername(e.target.value)} */ />
          <br />

          {/* Password Input */}
          <label className='text-white'>Password</label>
          <br />
          <input type='password' name='password' placeholder='Password' className='w-full h-10 border rounded-lg pl-3 mb-5' /* value={password} onChange={(e) => setPassword(e.target.value)} */ />
          <br />
          <br />
          {/* Submit Button */}
          <button type='submit' className='w-[200px] h-10 border rounded-lg bg-[#1a1a1a] text-white hover:bg-teal-900'>Sign Up</button>
        </form>
      </div>
      </div>
  )
}

export default SignUp