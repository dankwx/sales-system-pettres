import { Button } from '@/components/ui/button';
import Form from './form';

export default async function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div className="flex items-center justify-center ">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          {/* Formulário */}
          <Form />
        </div>
      </div>
    </main>
  );
}
