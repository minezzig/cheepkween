"use client";
import React from "react";
import { PurchaseType } from "@/types/types";
import {Chart as ChartJS,BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip,} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip);

interface ChartProps {
  purchases: PurchaseType[];
}

function Chart({ purchases }: ChartProps) {
  // function to retrieve total spending per month and create array
  const populateData = () => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      const sum = purchases
        .filter((purchase) => new Date(purchase.purchase_date).getMonth() === i)
        .reduce((sum, item) => (sum += item.price), 0);
      result.push(sum);
    }
    return result;
  };

  // array of months in year
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // data object used to create bar graph
  const data = {
    labels: monthsOfYear,
    datasets: [
      {
        data: populateData(),
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: [
          "hsla(50 98% 94%)",
          "hsla(50 98% 84%)",
          "hsla(50 98% 74%)",
        ],
      },
    ],
  };

  // options object to create bar graph
  const options = {
    plugins: {
      title: {
        text: "Spending Overview",
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false, //removes inability to resize chart
    scales: {
      x: {
        title: {
          display: true,
          text: "Month of Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Spending ($)",
        },
      },
    },
  };

  return (
    <div className="w-[320px] h-[220px] md:w-[800px] md:h-[400px] mx-auto mb-10">
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;
