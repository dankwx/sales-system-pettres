import Image from 'next/image';
import Icon from '../public/repair.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getServerSession } from 'next-auth';

export default async function PageHeader() {
  const session = await getServerSession();

  const saoPauloTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return (
    <main className="w-full" style={{ height: '10%' }}>
      <div className="flex w-full h-full justify-between align-middle">
        <div className="flex">
          {/* container*/}
          <div className="flex min-w-48 h-full justify-center items-center border-solid border-r-2 border-gray-100">
            <div className="flex w-2/6 h-14 items-center justify-center rounded-md bg-gray-800">
              <Image src={Icon} width={30} height={30} alt="paquimetro" />
            </div>
            <a href="/">
            </a>
          </div>
        </div>
        <div className='flex flex-col align-middle justify-center'>
          <p className="text-3xl font-semibold mt-4">Tornearia Pettres</p>
          <p className='text-center'>{saoPauloTime}</p>
          <hr className='mt-2 border-t-2 border-gray-500'/>
          </div>

        <div className="flex min-w-64 ">
          {/* container*/}

          <div className="flex w-full h-full items-center justify-center">
            <Avatar>
              <AvatarImage
                src={session?.user?.image ?? ''}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center w-40 m-4 h-full">
              <h3 className="text-lg font-semibold font-sans antialiased">
                {session?.user?.email ?? 'Usuário'}
              </h3>
              <p className="font-sans antialiased font-medium text-gray-400">
                {session?.user?.email == 'admin@pettres.com'
                  ? 'Administrador'
                  : 'Usuário'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
