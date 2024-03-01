'use client';

import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    console.log({ response });
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
        <input
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
        <input
          type="password"
          id="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Sua senha"
          required
        />
      </div>

      {/* Botão de Entrar */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </form>
  );
}
