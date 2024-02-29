"use client"

import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { db } from '../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';


export default async function DemoPage() {
    const data = await getDataFromFirebase();
  
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
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