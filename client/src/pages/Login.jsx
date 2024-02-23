import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

function Login() {

  const [ login ] = useMutation(LOGIN_USER);
  const [email, setEmail] = useState(''); // set initial state to empty string
  const [password, setPassword] = useState(''); // set initial state to empty string
  const navigate = useNavigate();
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          email: email,
          password: password,
        },
      });
      const token = data.login.token;
      Auth.login(token); // login the user after successful sign up
      alert('Login successful!'); 
      console.log('Navigating to /account'); // Add logging
      navigate('/account'); // redirect to account page
    } catch (e) {
      console.error('Error during login:', e); // Add more detailed error message
    }
  }


  return (
    <div className='w-full h-screen flex'>

      <div className='w-full bg-[#1a1a1a] flex justify-center items-center'>
        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' 
        onSubmit={handleLogin} >

          {/* Username Input */}
          <label className='text-white'>Email</label>
          <br />
          <input type='text' name='Email' placeholder='Email' className='w-full h-10 border rounded-lg pl-3 mb-5' value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />

          {/* Password Input */}
          <label className='text-white'>Password</label>
          <br />
          <input type='password' name='password' placeholder='Password' className='w-full h-10 border rounded-lg pl-3 mb-5' value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          {/* Submit Button */}
          <button type='submit' className='w-[200px] h-10 border rounded-lg bg-[#1a1a1a] text-white hover:bg-teal-900'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login