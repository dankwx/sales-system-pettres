'use client';

import { db } from './firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

interface Registro {
  cliente: string;
  servico: string;
  valor: number;
}

export default function Home() {
  const [registroData, setRegistroData] = useState<Registro[]>([]);

  useEffect(() => {
    const fetchRegistroData = async () => {
      try {
        const data = await getDocs(collection(db, 'registro'));
        const registroArray: Registro[] = [];
        data.forEach((doc) => {
          // Certifique-se de adaptar isso à estrutura real do seu documento
          const { cliente, servico, valor } = doc.data() as DocumentData;
          registroArray.push({ cliente, servico, valor });
        });
        setRegistroData(registroArray);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchRegistroData();
  }, []); // Executar apenas uma vez ao montar o componente

  return (
    <main className="flex flex-grow flex-col items-center justify-center bg-gray-100 h-full w-full">
      <div>
        <h1 className="text-center">Registro</h1>
        <p>Registro de Vendas</p>

        {/* Renderizar os dados recuperados */}
        <ul>
          {registroData.map((item, index) => (
            <li key={index}>
              Cliente: {item.cliente}, Serviço: {item.servico}, Valor:{' '}
              {item.valor}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
