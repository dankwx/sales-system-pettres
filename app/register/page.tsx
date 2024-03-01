'use client';

import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div className="flex items-center justify-center ">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          {/* Formulário */}
          <form>
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
              Registrar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
