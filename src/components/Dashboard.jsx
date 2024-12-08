import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Line } from "react-chartjs-2";  // For Chart.js Line Chart
import Chart from "chart.js/auto";
import ReactApexChart from "react-apexcharts"; // For ApexCharts
import { useUnit } from "../UnitContext.tsx";

const Dashboard = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [feedbackData, setFeedbackData] = useState([]);
    const { selectedUnit } = useUnit();
    // Fetch data for inventory, sales, and feedback (simulate API calls)
    useEffect(() => {
        fetch(`https://maxhelp-api.onrender.com/inventory/${selectedUnit}`)
            .then((res) => res.json())
            .then((data) => setInventoryData(data));

        fetch(`https://maxhelp-api.onrender.com/sales/${selectedUnit}`)
            .then((res) => res.json())
            .then((data) => setSalesData(data));

        fetch(`https://maxhelp-api.onrender.com/feedback/${selectedUnit}`)
            .then((res) => res.json())
            .then((data) => setFeedbackData(data));
    }, []);

    
    const salesChartData = {
        labels: salesData.map((sale) => new Date(sale.date).toLocaleDateString("en-US")),  // X-axis labels (dates)
        datasets: [
            {
                label: "Sales Amount",
                data: salesData.map((sale) => sale.amount), // Y-axis data (sales amount)
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };


    // Calculate sentiment counts
    const positiveCount = feedbackData.filter((item) => item.sentiment === "positive").length;
    const negativeCount = feedbackData.filter((item) => item.sentiment === "negative").length;
    const neutralCount = feedbackData.filter((item) => item.sentiment === "neutral").length;

    // ApexCharts Data for Feedback Sentiment Analysis
    const feedbackChartOptions = {
        chart: {
            type: "pie",
        },
        labels: ["Positive", "Negative", "Neutral"],
        series: [positiveCount, negativeCount, neutralCount], // Pie chart data
    };


    // Example for Inventory Overview (simulated data)
    const inventoryChartData = {
        labels: inventoryData.map((item) => item.product),
        datasets: [
            {
                label: "Stock Level",
                data: inventoryData.map((item) => item.stock),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="min-h-screen  bg-gray-100 p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard for {selectedUnit}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Inventory Overview Section with Chart.js */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold">Inventory Overview</h2>
                            <p className="text-sm text-gray-500">Real-time stock levels</p>
                            <Line data={inventoryChartData} />
                        </div>

                        {/* Sales Insights Section with Chart.js */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold">Sales Insights</h2>
                            <p className="text-sm text-gray-500">Daily, weekly, and monthly trends</p>
                            <Line data={salesChartData} />
                        </div>

                        {/* Feedback Summary Section with ApexCharts */}
                        <div className="p-4 bg-white shadow-lg rounded-lg">
                            <h2 className="text-lg font-semibold">Feedback Summary</h2>
                            <p className="text-sm text-gray-500">Customer sentiment analysis</p>
                            <ReactApexChart
                                options={feedbackChartOptions}
                                series={feedbackChartOptions.series}
                                type="pie"
                                width="320"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
