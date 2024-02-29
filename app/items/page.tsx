"use client"

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { ClientForm } from './ClientForm';
import { db } from '../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { useEffect, useState } from "react";


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
      <div className="container mx-auto py-10">
        <ClientForm onClientAdded={handleClientAdded} />
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
  
  async function getDataFromFirebase(): Promise<Payment[]> {
    try {
      const data = await getDocs(collection(db, 'registro'));
      const registroArray: Payment[] = [];
      data.forEach((doc) => {
        const { cliente, servico, valor } = doc.data() as DocumentData;
        registroArray.push({ id: doc.id, cliente, servico, preco: valor });
      });
      return registroArray;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      return [];
    }
  }