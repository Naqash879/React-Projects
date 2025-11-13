import React, { useEffect, useState } from "react";
import "./expenseTracker.css";

function ExpenseTracker() {
  const [transactions, setTransactions] = useState(() => {
    const storedData = localStorage.getItem("transaction-data");
    if (storedData) {
      return JSON.parse(storedData); // return parsed data as initial state
    } else {
      console.log("Local Storage data not found");
      return [];
    }
  });

  let [balance, setBalance] = useState(() => {
    let getBalance = localStorage.getItem("total-balance");
    if (getBalance) {
      let parse = JSON.parse(getBalance);
      return parse;
    } else {
      return setError("Some Problem to getting data");
    }
  });
  const [error, setError] = useState(
    "To make this Transaction!Recharge Account"
  );
  function addTransaction(e) {
    e.preventDefault();

    const selectedOption = e.target.selectoption.value;
    const description = e.target.description.value;
    const amount = +e.target.amount.value;
    if (selectedOption === "income") {
      setBalance((balance += amount));
    } else if (selectedOption === "expense") {
      setBalance((balance -= amount));
    }
    const newTransaction = {
      des: description,
      am: amount,
      type: selectedOption,
    };
    console.log(balance);
    setTransactions((prev) => [...prev, newTransaction]);
  }
  function deleteTransaction(index) {
    let postDeleteData = transactions.filter((t, i) => i !== index);
    setTransactions(postDeleteData);
  }
  useEffect(() => {
    localStorage.setItem("transaction-data", JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem("total-balance", JSON.stringify(balance));
  }, [balance]);

  return (
    <div className="app-container">
      <h1>💰 Expense Tracker</h1>

      <div className={balance < 0 ? "less-balance" : "balance"}>
        <h2>{balance < 0 ? `${error}` : "Balance is : " + `${balance}`}</h2>
      </div>
      <div>
        <form className="transaction-form" onSubmit={(e) => addTransaction(e)}>
          <input type="text" name="description" placeholder="Description" />
          <input type="number" name="amount" placeholder="Amount" />
          <select
            name="selectoption"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="income">Income</option>
            {balance >= 0 && <option value="expense">Expense</option>}
          </select>
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      {/* Transaction History */}
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <ul>
          {transactions.map((t, index) => (
            <li key={index} className={t.type}>
              {t.des} - ${t.am}
              <button onClick={() => deleteTransaction(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseTracker;
