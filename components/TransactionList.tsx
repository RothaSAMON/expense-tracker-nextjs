import getTransactions from "@/app/actions/getTransactions";
import { Transaction } from "@/types/Transaction";

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <p key={transaction.id}>{transaction.text}</p>
          ))}
      </ul>
    </>
  );
};

export default TransactionList;
