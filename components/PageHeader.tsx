import Image from 'next/image';
import Icon from '../public/icon.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getServerSession } from 'next-auth';

export default async function PageHeader() {
  const session = await getServerSession();

  return (
    <main className="w-full" style={{ height: '10%' }}>
      <div className="flex w-full h-full justify-between">
        <div className="flex w-full">
          {/* container*/}
          <div className="flex min-w-48 h-full justify-center items-center border-solid border-r-2 border-gray-100">
            <div className="flex w-2/6 h-2/3 items-center justify-center rounded-md">
              <Image src={Icon} width={30} height={30} alt="paquimetro" />
            </div>
            <h2 className="text-2xl font-sans antialiased m-3 font-bold text-slate-700 ">
              Pettres
            </h2>
          </div>
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
                {session?.user?.name ?? 'Nome Sobrenome'}
              </h3>
              <p className="font-sans antialiased font-medium text-gray-400">
                {session?.user?.email == 'danielpettres@gmail.com'
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
