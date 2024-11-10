"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found!" };
  }

  try {
    const transaction = await db.transaction.findMany({
      where: { userId },
    });

    const balance = transaction.reduce(
      (sum: number, transaction: { amount: number }) =>
        sum + transaction.amount,
      0
    );

    return { balance };
  } catch {
    return { error: "Database error" };
  }
}

export default getUserBalance;
