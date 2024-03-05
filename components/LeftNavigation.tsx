import Image from 'next/image';
import dashboardIcon from '../public/dasboardIco.png';
import buysIcon from '../public/buysIcon.png';
import peopleIcon from '../public/peopleIcon.png';
import logoutIcon from '../public/logoutIcon.png';
import { getServerSession } from 'next-auth';
import Logout from '@/app/logout';

export default async function LeftNavigation() {
  const session = await getServerSession();
  return (
    <main className="flex flex-col h-full min-w-48 border-solid border-r-2 border-gray-100">
      <div className="flex flex-col w-full h-full m-4">
        <div className="flex w-fit items-center">
          <Image
            src={dashboardIcon}
            width={25}
            height={25}
            alt="dashboardIcon"
          />
          <a href="/">
            <p className="m-3 font-semibold text-lg">Início</p>
          </a>
        </div>
        <div className="flex w-fit items-center">
          <Image src={buysIcon} width={25} height={25} alt="buysIcon" />
          <p className="m-3 font-semibold text-lg">Serviços</p>
        </div>
        <div className="flex w-fit items-center">
          <Image src={peopleIcon} width={25} height={25} alt="people icon" />
          <p className="m-3 font-semibold text-lg">Pessoas</p>
        </div>
        {!!session && (
          <div className="flex w-fit items-center">
            <Image src={logoutIcon} width={25} height={25} alt="people icon" />
            <Logout />
          </div>
        )}
      </div>
    </main>
  );
}
