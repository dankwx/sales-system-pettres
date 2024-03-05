"use client"

import { Payment, columns } from "../components/home/columns"
import { DataTable } from "../components/home/data-table"
import { ClientForm } from '../components/home/ClientForm';
import { db } from './firebaseConfig';
import { collection, getDocs, DocumentData, query, orderBy, Timestamp } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { format } from 'date-fns';


export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    fetchData(); // Busca os dados quando a página é carregada
  }, []);

  const fetchData = async () => {
    try {
      const newData = await getDataFromFirebase();
      setData(newData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleClientAdded = () => {
    fetchData(); // Atualiza os dados após adicionar um cliente
  };

  return (
    <div className="container mx-auto py-4">
      <ClientForm onClientAdded={handleClientAdded} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

async function getDataFromFirebase(): Promise<Payment[]> {
  try {
    const data = await getDocs(query(collection(db, 'registro'), orderBy('data', 'desc')));
    const registroArray: Payment[] = [];
    data.forEach((doc) => {
      const { cliente, servico, valor, data } = doc.data() as { cliente: string, servico: string, valor: number, data: Timestamp };
      registroArray.push({ id: doc.id, cliente, servico, preco: valor, data });
    });
    return registroArray.map(payment => ({
      ...payment,
      data: format(payment.data.toDate(), 'dd/MM/yyyy HH:mm:ss'),
    })) as unknown as Payment[]; // Garante que o tipo de retorno seja Payment[]
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}