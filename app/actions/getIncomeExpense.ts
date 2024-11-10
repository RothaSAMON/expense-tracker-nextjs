"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

interface Transaction {
  amount: number;
}

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found!" };
  }

  try {
    const amounts: Transaction[] = await db.transaction.findMany({
      where: { userId },
    });

    const income = amounts
      .filter((item) => item.amount > 0)
      .reduce((acc: number, item: Transaction) => acc + item.amount, 0);

    const expense = amounts
      .filter((item) => item.amount < 0)
      .reduce((acc: number, item: Transaction) => acc + item.amount, 0);

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    console.error("Database error:", error);
    return { error: "Database error" };
  }
}

export default getIncomeExpense;
