
import { useState } from "react"
const ExpenseForm = (props)=>{
    const {addExpense} = props
    const [title,setTitle]=useState('')

    const [amount,setAmount]=useState(0);
    const [errors, setErrors ] = useState({});
    
    //submit handler

    const handleSubmit =(e)=>{
        e.preventDefault()
        let err = {}
       
        if(title.length <3) {
            err.title = 'Please enter atleast 3 letters'
        }if(!amount){
            err.amount = 'Please enter a valid amount'
        }
        if (Object.keys(err).length > 0){
            setErrors({...err})
            return
        }
        addExpense(title, amount)
        setTitle('')
        setAmount(0)
    }
    const handleTitleChange =(e)=>{
        setTitle(e.target.value)
        setErrors({...errors, title: ''})
    }
    const handleAmountChange =(e)=>{
            setAmount(parseInt(e.target.value))
            setErrors({...errors, amount: ''})
        
        
    }
   return(
    <>
    <div className="card">
    <form  onSubmit={handleSubmit}>
    <div className="add-expense-container">
    <h3 className="h2">Add New Expense</h3>
     <input type="text" placeholder="Title" onChange={handleTitleChange} />
     {errors.title ?  <div className="error">{errors.title}</div> : null}
     <input type="number" placeholder="Amount" step="0.01" onChange={handleAmountChange} />
     {errors.amount ?  <div className="error">{errors.amount}</div> : null}
     <button type="submit" on>Add</button>
   </div>
   </form>
   </div>
   </>
   )
}
export default ExpenseForm