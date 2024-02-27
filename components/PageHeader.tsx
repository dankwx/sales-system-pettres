import Image from 'next/image';
import Icon from '../public/icon.png';

export default function PageHeader() {
  return (
    <main className="w-full" style={{ height: '10%', backgroundColor: 'red' }}>
      <div className="flex w-full h-full bg-slate-300">
        <div className="flex w-96 m-w-full bg-red-300">
          <div className="flex min-w-48 bg-blue-200 h-full justify-center items-center">
            <div className="flex w-2/6 bg-blue-300 h-2/3 items-center justify-center rounded-md">
              <Image src={Icon} width={30} height={30} alt="paquimetro" />
            </div>
            <h2 className='text-2xl font-sans antialiased m-3 font-bold text-slate-700'>Pettres</h2>
          </div>
          <div className='flex min-w-48 bg-yellow-200'>
            <div className='flex w-full bg-red-500'></div>
          </div>
        </div>
        <h1>aa</h1>
      </div>
    </main>
  );
}
