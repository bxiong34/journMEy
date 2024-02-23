import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Account() {
  const { data } = useQuery(QUERY_USER);
  const { user } = data;

  return (
    <div className='w-full h-screen bg-[#1a1a1a] text-white flex justify-center items-center'>
      <h2 className='text-4xl'>Hello {user.username}</h2>
    </div>
  );
}

export default Account;