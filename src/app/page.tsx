'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  employeeCount: number;
  lowStockProducts: Array<{
    id: number;
    name: string;
    quantity: number;
  }>;
  recentSales: Array<{
    id: number;
    service: { name: string };
    employee: { name: string };
    price: number;
    date: string;
  }>;
}

export default function Home() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalPurchases: 0,
    employeeCount: 0,
    lowStockProducts: [],
    recentSales: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [salesRes, purchasesRes, employeesRes, productsRes] = await Promise.all([
          fetch('http://localhost:3001/api/reports/sales'),
          fetch('http://localhost:3001/api/reports/purchases'),
          fetch('http://localhost:3001/api/employees'),
          fetch('http://localhost:3001/api/products')
        ]);

        const [salesData, purchasesData, employeesData, productsData] = await Promise.all([
          salesRes.json(),
          purchasesRes.json(),
          employeesRes.json(),
          productsRes.json()
        ]);

        setStats({
          totalSales: salesData.totalSales,
          totalPurchases: purchasesData.totalPurchases,
          employeeCount: employeesData.length,
          lowStockProducts: productsData.filter((p: any) => p.quantity < 10),
          recentSales: salesData.sales.slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    { name: 'Nova Venda', href: '/sales', icon: '💰', color: 'bg-green-500' },
    { name: 'Nova Compra', href: '/purchases', icon: '🛍️', color: 'bg-blue-500' },
    { name: 'Adicionar Funcionário', href: '/employees', icon: '👥', color: 'bg-purple-500' },
    { name: 'Ver Relatórios', href: '/reports', icon: '📊', color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Controle</h1>
          <p className="mt-2 text-sm text-gray-600">Bem-vindo ao sistema de gestão</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`${action.color} rounded-lg p-5 flex items-center justify-between text-white transition-transform hover:scale-105`}
            >
              <span className="text-lg font-medium">{action.name}</span>
              <span className="text-2xl">{action.icon}</span>
            </Link>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">💵</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total em Vendas</dt>
                    <dd className="text-lg font-medium text-gray-900">R$ {stats.totalSales.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🛒</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total em Compras</dt>
                    <dd className="text-lg font-medium text-gray-900">R$ {stats.totalPurchases.toFixed(2)}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Funcionários</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.employeeCount}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert & Recent Sales */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Produtos com Baixo Estoque</h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {stats.lowStockProducts.map((product) => (
                      <li key={product.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-sm text-gray-500">Quantidade: {product.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Vendas Recentes</h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {stats.recentSales.map((sale) => (
                      <li key={sale.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {sale.service.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {sale.employee.name} • {new Date(sale.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              R$ {sale.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
