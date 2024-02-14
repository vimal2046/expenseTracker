import { useEffect, useState } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseItem from "./Components/ExpenseItem";
import axios from "axios";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch existing entries on mount
    axios.get('https://expense-tracker-api-8bby.onrender.com/get-entry')
      .then(res => {
        console.log(res.data);
        setExpenses(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addExpense = (title, amount) => {
    // Add an entry locally
    const nextId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    const newExpense = { id: nextId, title: title, amount: amount };
    setExpenses([...expenses, newExpense]);
  
    // Send a POST request to add the entry on the server
    axios.post('https://expense-tracker-api-8bby.onrender.com/add-entry', newExpense)
      .then(res => {
        console.log(res.data);
        // Optionally update state with the response from the server
        // setExpenses(res.data);
      })
      .catch(err => console.log(err));
  };

  const deleteExpense = (id) => {
    // Delete an entry locally
    setExpenses(expenses.filter((exp) => exp.id !== id));

    // Send a DELETE request to remove the entry on the server
    axios.delete(`https://expense-tracker-api-8bby.onrender.com/delete-entry/${id}`)
      .then(res => {
        console.log(res.data);
        // Optionally update state with the response from the server
        // setExpenses(res.data);
      })
      .catch(err => console.log(err));
  };

  let income = 0, expense = 0;
  expenses.forEach((exp) => {
    if (exp.amount > 0) {
      income += exp.amount;
    } else {
      expense -= exp.amount;
    }
  });

  return (
    <>
      <div>
        {/* You can add content here if needed */}
      </div>
      <div>
        <div className="heading">Expense Tracker</div>
        <div className="balance">Balance: {income - expense}</div>
        <div className="income-expense-container">
          <div className="income">
            <span className="title">Income</span>
            <span>{income}</span>
          </div>
          <div className="block"></div>
          <div className="expense">
            <span className="title">Expense</span>
            <span>{expense}</span>
          </div>
        </div>
      </div>
      <ExpenseForm addExpense={addExpense} />
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} deleteExpense={deleteExpense} />
      ))}
    </>
  );
};

export default App;
