'use client';

import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <p className='m-3 font-semibold text-lg cursor-pointer'
      onClick={() => {
        signOut();
      }}
    >
      Sair
    </p>
  );
}