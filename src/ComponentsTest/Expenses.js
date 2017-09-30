import React from 'react'

const Expense = ({expense, expenseNumber}) => (
    <div class="expense">
        { expenseNumber.toString() }: { expense.date } - ${ expense.amount }
    </div>
)

const Expenses = ({expenses}) => (
    <div className="expenses">
        {
            expenses && expenses.length > 0 &&
            <p>{`The first expense's amount is ${expenses[0].amount}`}</p>
        }
        { expenses.map( (expense, i) => <Expense key={i}expense={expense} />) }
    </div>
)

export default Expenses