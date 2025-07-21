'use client';

import { useState, useEffect } from 'react';

interface Employee {
  id: number;
  name: string;
}

interface Product {
  name: string;
}

interface Service {
  name: string;
}

interface Purchase {
  id: number;
  quantity: number;
  totalPrice: number;
  date: string;
  product: Product;
  employee: Employee;
}

interface Sale {
  id: number;
  price: number;
  date: string;
  service: Service;
  employee: Employee;
}

interface SalesReport {
  sales: Sale[];
  totalSales: number;
}

interface PurchasesReport {
  purchases: Purchase[];
  totalPurchases: number;
}

export default function ReportsPage() {
  const [salesReport, setSalesReport] = useState<SalesReport>({ sales: [], totalSales: 0 });
  const [purchasesReport, setPurchasesReport] = useState<PurchasesReport>({ purchases: [], totalPurchases: 0 });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of current month
    endDate: new Date().toISOString().split('T')[0], // Today
  });

  const fetchReports = async () => {
    try {
      const [salesRes, purchasesRes] = await Promise.all([
        fetch('http://localhost:3001/api/reports/sales'),
        fetch('http://localhost:3001/api/reports/purchases')
      ]);

      const [salesData, purchasesData] = await Promise.all([
        salesRes.json(),
        purchasesRes.json()
      ]);

      setSalesReport(salesData);
      setPurchasesReport(purchasesData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filterByDate = (date: string) => {
    const dateObj = new Date(date);
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    return dateObj >= start && dateObj <= end;
  };

  const filteredSales = salesReport.sales.filter(sale => filterByDate(sale.date));
  const filteredPurchases = purchasesReport.purchases.filter(purchase => filterByDate(purchase.date));
  
  const totalSalesFiltered = filteredSales.reduce((acc, sale) => acc + sale.price, 0);
  const totalPurchasesFiltered = filteredPurchases.reduce((acc, purchase) => acc + purchase.totalPrice, 0);
  const profit = totalSalesFiltered - totalPurchasesFiltered;

  // Group sales by employee
  const salesByEmployee = filteredSales.reduce((acc, sale) => {
    const employeeName = sale.employee.name;
    acc[employeeName] = (acc[employeeName] || 0) + sale.price;
    return acc;
  }, {} as Record<string, number>);

  // Group purchases by product
  const purchasesByProduct = filteredPurchases.reduce((acc, purchase) => {
    const productName = purchase.product.name;
    acc[productName] = (acc[productName] || 0) + purchase.totalPrice;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtrar por Período</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Vendas</h3>
          <p className="text-3xl font-bold text-green-600">R$ {totalSalesFiltered.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Compras</h3>
          <p className="text-3xl font-bold text-red-600">R$ {totalPurchasesFiltered.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Lucro do Período</h3>
          <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            R$ {profit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Vendas por Funcionário</h2>
          <div className="space-y-4">
            {Object.entries(salesByEmployee).map(([employee, total]) => (
              <div key={employee} className="flex justify-between items-center">
                <span className="text-gray-700">{employee}</span>
                <span className="font-semibold">R$ {total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Compras por Produto</h2>
          <div className="space-y-4">
            {Object.entries(purchasesByProduct).map(([product, total]) => (
              <div key={product} className="flex justify-between items-center">
                <span className="text-gray-700">{product}</span>
                <span className="font-semibold">R$ {total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-6">Últimas Vendas</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSales.slice(0, 5).map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(sale.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.service.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {sale.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold p-6">Últimas Compras</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPurchases.slice(0, 5).map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(purchase.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{purchase.product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      R$ {purchase.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
