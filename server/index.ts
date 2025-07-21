import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Employee routes
app.get('/api/employees', async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

app.post('/api/employees', async (req, res) => {
  const { name, role } = req.body;
  const employee = await prisma.employee.create({
    data: { name, role }
  });
  res.json(employee);
});

// Product routes
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post('/api/products', async (req, res) => {
  const { name, price, quantity } = req.body;
  const product = await prisma.product.create({
    data: { name, price, quantity }
  });
  res.json(product);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, quantity }
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Service routes
app.get('/api/services', async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
});

app.post('/api/services', async (req, res) => {
  const { name, price } = req.body;
  const service = await prisma.service.create({
    data: { name, price }
  });
  res.json(service);
});

app.put('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const service = await prisma.service.update({
      where: { id: Number(id) },
      data: { name, price }
    });
    res.json(service);
  } catch (error) {
    res.status(404).json({ error: 'Service not found' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.service.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Service not found' });
  }
});

// Purchase routes
app.get('/api/purchases', async (req, res) => {
  const purchases = await prisma.purchase.findMany({
    include: {
      product: true,
      employee: true,
    },
  });
  res.json(purchases);
});

app.post('/api/purchases', async (req, res) => {
  const { productId, employeeId, quantity } = req.body;
  
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const totalPrice = product.price * quantity;

  const purchase = await prisma.purchase.create({
    data: {
      productId,
      employeeId,
      quantity,
      totalPrice,
    },
    include: {
      product: true,
      employee: true,
    },
  });

  // Update product quantity
  await prisma.product.update({
    where: { id: productId },
    data: { quantity: product.quantity - quantity },
  });

  res.json(purchase);
});

// Sale routes
app.get('/api/sales', async (req, res) => {
  const sales = await prisma.sale.findMany({
    include: {
      service: true,
      employee: true,
    },
  });
  res.json(sales);
});

app.post('/api/sales', async (req, res) => {
  const { serviceId, employeeId, price } = req.body;
  const sale = await prisma.sale.create({
    data: {
      serviceId,
      employeeId,
      price,
    },
    include: {
      service: true,
      employee: true,
    },
  });
  res.json(sale);
});

// Report routes
app.get('/api/reports/sales', async (req, res) => {
  const sales = await prisma.sale.findMany({
    include: {
      service: true,
      employee: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  const totalSales = sales.reduce((acc: number, sale: { price: number }) => acc + sale.price, 0);
  
  res.json({
    sales,
    totalSales,
  });
});

app.get('/api/reports/purchases', async (req, res) => {
  const purchases = await prisma.purchase.findMany({
    include: {
      product: true,
      employee: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  const totalPurchases = purchases.reduce((acc: number, purchase: { totalPrice: number }) => acc + purchase.totalPrice, 0);
  
  res.json({
    purchases,
    totalPurchases,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
