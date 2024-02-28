'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div>
        <h1 className="text-center">oi</h1>
        <Button onClick={() => signIn('google, github', { callbackUrl: '/' })}>
          Login
        </Button>
      </div>
    </main>
  );
}
