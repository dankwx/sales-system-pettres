import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/")
  }
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div className="flex  flex-col items-center justify-center ">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-4">Tornearia Pettres</h2>
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Login</h1>

          {/* Formulári o */}
          <Form />
        </div>
      </div>
    </main>
  );
}
