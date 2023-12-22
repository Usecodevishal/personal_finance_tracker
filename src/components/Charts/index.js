import React from "react";
import { Line, Pie } from "@ant-design/charts";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  const findalSpendings = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key].amount += obj.amount;
    }

    return acc;
  }, {});

  const config = {
    data: data,

    width: 500,
    xField: "date",
    yField: "amount",
  };

  const spendingConfig = {
    data: Object.values(findalSpendings),

    width: 500,
    angleField: "amount",
    colorField: "tag",
  };

  let chart;
  let PieChart;

  return (
    <div className="charts-wrapper">
      <div>
        <h2 style={{ marginTop: 0 }}>Line Chart</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
      </div>

      <div>
        <h2>Pie Chart</h2>
        {spendingData == [] ? (
          <>
            <p>Seems that your have't expense anything till now</p>
          </>
        ) : (
          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (PieChart = chartInstance)}
          />
        )}
      </div>
    </div>
  );
}

export default ChartComponent;
