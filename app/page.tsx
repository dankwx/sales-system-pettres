import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { app, database } from '../fireBaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default async function Home() {
  const session = await getServerSession();

  // https://www.freecodecamp.org/news/nextjs-firebase-tutorial-build-an-evernote-clone/

  if (!session) {
    redirect('/login');
  }
  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div>
        <h1 className="text-center">oi</h1>
        <p>pagina inicial, só pode vela com login</p>
      </div>
    </main>
  );
}
