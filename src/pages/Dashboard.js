import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import moment from "moment";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionTable from "../components/TransactionTable";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransaction";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      if (!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document: ", e);

      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    //Get all docs from a collection
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log("Transaction Array : ", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (user) {
        if (transaction.type === "income") {
          incomeTotal += transaction.amount;
        } else {
          expensesTotal += transaction.amount;
        }
        setIncome(incomeTotal);
    setExpense(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
      }
    });

    // setIncome(incomeTotal);
    // setExpense(expensesTotal);
    // setCurrentBalance(incomeTotal - expensesTotal);
  };

  const sortedTransactions = transactions.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  })

  function reset(){
    console.log("resetting");
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            currentBalance={currentBalance}
            income={income}
            expense={expense}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            reset={reset}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          {transactions.length === 0 ? (
            <>
              <NoTransactions />
            </>
          ) : (
            <>
              <ChartComponent  sortedTransactions={sortedTransactions}/>

              <TransactionTable
                transactions={transactions}
                fetchTransactions={fetchTransactions}
                addTransaction={addTransaction}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
