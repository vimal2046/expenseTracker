import { useEffect,useState } from "react";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseItem from "./Components/ExpenseItem"
import axios from "axios";

const App =()=>{
  const [expenses, setExpenses] = useState([])

  useEffect(()=>{
    axios.get('https://expensetracker-api2.onrender.com/entry')
  .then(res=>{
    console.log(res.data)
    setExpenses(res.data)
  })
  .catch(err=>console.log(err))
  },[])
  const addExpense =(title,amount)=>{
    const nextId=expenses[expenses.length-1].id+1
    setExpenses([...expenses,{id:nextId ,title:title,amount:amount}])
  }
  const deleteExpense =(id)=>{
    setExpenses(expenses.filter((exp)=>exp.id !== id))
  }

  let income=0,expense=0;
  expenses.forEach((exp)=>{
    if(exp.amount>0){
      income += exp.amount
    }else{
      expense -= exp.amount
    }
  })
  return(
    <>
    <div> 
      
    </div>
    <div>
     <div className="heading">Expense Tracker</div>
     <div className="balance">Balance:{income - expense}</div>
     <div className="income-expense-container">
      <div className="income"> 
        <span className="title">Income</span>
        <span>{income }</span>
      </div>
      <div className="block"></div>
      <div className = "expense">
        <span className="title">Expense</span>
        <span>{expense}</span>
      </div>
      
     </div>
   </div>
   <ExpenseForm addExpense={addExpense}   />
  

   {expenses.map((expense)=>(
    <ExpenseItem key={expense.id} title={expense.title} amount={expense.amount} deleteExpense={deleteExpense}/>
   ))}

   
   </>
  )
}
export default App