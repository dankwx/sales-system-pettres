'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    console.log({ response });
    if (!response?.error) {
      router.push('/');
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* E-mail */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          E-mail
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Seu e-mail"
          required
        />
      </div>

      {/* Senha */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Senha
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Sua senha"
          required
        />

      </div>

      {/* Botão de Entrar */}
      <Button type='submit' className="w-full">Entrar</Button>
    </form>
  );
}
