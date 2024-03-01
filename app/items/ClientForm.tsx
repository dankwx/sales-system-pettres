// ClientForm.tsx
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ClientFormProps {
  onClientAdded: () => void;
}

export function ClientForm({ onClientAdded }: ClientFormProps) {
  const [clientData, setClientData] = useState({
    cliente: '',
    servico: '',
    valor: 0,
    data: new Date(), // Adiciona o campo data com o valor atual
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: name === 'data' ? new Date(value) : value, // Converte para timestamp se o campo for 'data'
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Adiciona os dados ao Firebase
      const docRef = await addDoc(collection(db, 'registro'), clientData);

      // Limpa o formulário e chama a função de callback
      setClientData({
        cliente: '',
        servico: '',
        valor: 0,
        data: new Date(),
      });
      onClientAdded();
      console.log('Cliente adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  flex-col w-fit mb-8 border-solid border-slate-500 border-1 m-0"
    ><h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Novo Serviço</h1>
      <div className="flex">
        <Input
          className="mr-2"
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={clientData.cliente}
          onChange={handleInputChange}
          required
        />

        <Input
          className="mr-2"
          type="text"
          name="servico"
          placeholder="Serviço"
          value={clientData.servico}
          onChange={handleInputChange}
          required
        />

        <Input
          className="mr-2"
          type="number"
          name="valor"
          placeholder="0"
          value={clientData.valor}
          onChange={handleInputChange}
          required
        />
        <Button className='mt-0 w-32' type="submit">Adicionar</Button>
      </div>


    </form>
  );
}
