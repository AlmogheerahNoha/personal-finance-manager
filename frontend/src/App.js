import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TransactionForm from './components/TransactionForm';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Lấy dữ liệu giao dịch từ backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, [transactions]);

  const calculateTotal = (data) => {
    const income = data.filter((item) => item.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
    const expense = data.filter((item) => item.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  return (
    <div className="App">
      <h1>Personal Finance Manager</h1>
      <TransactionForm />
      <div className="summary">
        <h2>Total Income: ${totalIncome}</h2>
        <h2>Total Expense: ${totalExpense}</h2>
        <h2>Balance: ${totalIncome - totalExpense}</h2>
      </div>
    </div>
  );
}

export default App;
