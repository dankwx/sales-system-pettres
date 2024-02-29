// ClientForm.tsx
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

interface ClientFormProps {
  onClientAdded: () => void;
}

export function ClientForm({ onClientAdded }: ClientFormProps) {
  const [clientData, setClientData] = useState({
    cliente: '',
    servico: '',
    preco: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
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
        preco: 0,
      });
      onClientAdded();
      console.log('Cliente adicionado com ID:', docRef.id);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2">
        Cliente:
        <input
          type="text"
          name="cliente"
          value={clientData.cliente}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="block mb-2">
        Serviço:
        <input
          type="text"
          name="servico"
          value={clientData.servico}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className="block mb-2">
        Preço:
        <input
          type="number"
          name="preco"
          value={clientData.preco}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Adicionar Cliente
      </button>
    </form>
  );
}
