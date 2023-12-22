import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";
function Cards({showExpenseModal, showIncomeModal,currentBalance,income, expense, reset  }) {
  return (
    <div>
      <Row className="my-row">
        <Card className="card-style" title="Current Balance">
         <p>${currentBalance}</p>

          <Button blue={true} text={"Reset Balance"} onClick={reset}/>
        </Card>
        <Card className="card-style" title="Total Income">
         <p>${income}</p>

          <Button blue={true} text={"Add Income"} onClick={showIncomeModal}/>
        </Card>
        <Card className="card-style" title="Total Expenses">
         <p>${expense}</p>

          <Button blue={true} text={"Add Expense"} onClick={showExpenseModal}/>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
