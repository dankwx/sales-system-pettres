import Image from 'next/image';
import dashboardIcon from '../public/dasboardIco.png';
import buysIcon from '../public/buysIcon.png';


export default function LeftNavigation() {
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
          <p className="m-3 font-semibold text-lg">Dashboard</p>
        </div>
        <div className="flex w-fit items-center">
          <Image
            src={buysIcon}
            width={25}
            height={25}
            alt="buysIcon"
          />
          <p className="m-3 font-semibold text-lg">Compras</p>
        </div>
      </div>
    </main>
  );
}
