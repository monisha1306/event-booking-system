import React, { useEffect, useState } from 'react';

export default function AttendeeTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(data);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Transactions</h2>
      {transactions.length === 0 ? <p>No transactions found.</p> : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Event</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td>{tx.eventTitle}</td>
                <td>₹{tx.amount}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}