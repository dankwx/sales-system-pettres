import ButtonLogout from '@/components/ButtonLogout';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div>
        <h1 className="text-center">oi</h1>
        <p>pagina inicial, só pode vela com login</p>
        <ButtonLogout />
      </div>
    </main>
  );
}
