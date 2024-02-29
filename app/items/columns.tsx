"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Timestamp } from "firebase/firestore"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  cliente: string
  preco: number
  servico: string
  data: Timestamp // ou qualquer tipo que você decidir usar para representar a data
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "cliente",
    header: "Cliente",
  },
  {
    accessorKey: "servico",
    header: "Serviço",
  },
  {
    accessorKey: "preco",
    header: "Preço",
  },
  {
    accessorKey: "data",
    header: "Data",
  },
]