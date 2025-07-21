'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: number;
  name: string;
  price: number;
}

interface Employee {
  id: number;
  name: string;
}

interface Sale {
  id: number;
  serviceId: number;
  employeeId: number;
  price: number;
  date: string;
  service: Service;
  employee: Employee;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newSale, setNewSale] = useState({
    serviceId: 0,
    employeeId: 0,
    price: 0
  });

  const fetchData = async () => {
    try {
      const [salesRes, servicesRes, employeesRes] = await Promise.all([
        fetch('http://localhost:3001/api/sales'),
        fetch('http://localhost:3001/api/services'),
        fetch('http://localhost:3001/api/employees')
      ]);

      const [salesData, servicesData, employeesData] = await Promise.all([
        salesRes.json(),
        servicesRes.json(),
        employeesRes.json()
      ]);

      setSales(salesData);
      setServices(servicesData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleServiceChange = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    setNewSale({
      ...newSale,
      serviceId,
      price: service ? service.price : 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSale),
      });
      if (response.ok) {
        setNewSale({ serviceId: 0, employeeId: 0, price: 0 });
        fetchData();
      }
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Vendas</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Nova Venda</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Serviço</label>
            <select
              value={newSale.serviceId}
              onChange={(e) => handleServiceChange(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - R$ {service.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Funcionário</label>
            <select
              value={newSale.employeeId}
              onChange={(e) => setNewSale({ ...newSale, employeeId: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um funcionário</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              value={newSale.price}
              onChange={(e) => setNewSale({ ...newSale, price: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Registrar Venda
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(sale.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    R$ {sale.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
