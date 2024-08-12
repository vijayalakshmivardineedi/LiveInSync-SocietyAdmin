import React, { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { useDispatch, useSelector } from "react-redux";
import { fetchBillsBySocietyId } from "../../Pages/SocietyBills/SocietyBillsSlice";
import { getAllMonthsBySocietyId } from "../../Pages/Dashboard/DashboardSlice";

const xLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const BarCharts = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.societyBills.bills);
    const AllMaintainance = useSelector((state) => state.dashboardList.dashboard) || [];
    const [chartData, setChartData] = useState({
        income: [],
        expenses: [],
    });

    const getCurrentMonthAndYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    };

    const processExpenses = (expenses) => {
        const monthlyTotals = Array(12).fill(0);

        expenses.forEach(expense => {
            const { monthAndYear, amount } = expense;
            const [year, month] = monthAndYear.split('-');
            const monthIndex = parseInt(month, 10) - 1;

            if (monthIndex >= 0 && monthIndex < 12) {
                monthlyTotals[monthIndex] += parseInt(amount, 10) || 0;
            }
        });

        return monthlyTotals;
    };

//    const processIncome = () => {
//     const monthlyTotals = Array(12).fill(0);

//     if (!Array.isArray(AllMaintainance)) {
//         return monthlyTotals;
//     }

//     AllMaintainance.forEach(maintenance => {
//         const { monthAndYear, paymentDetails } = maintenance;

//         if (!Array.isArray(paymentDetails)) {
//             return;
//         }

//         const [year, month] = monthAndYear.split('-');
//         const monthIndex = parseInt(month, 10) - 1;

//         if (monthIndex >= 0 && monthIndex < 12) {
//             paymentDetails.forEach(payment => {
//                 // Ensure amounts are parsed correctly
//                 const paidAmount = parseInt(payment.paidAmount, 10) || 0;
//                 if (paidAmount > 0) {
//                     console.log(`Adding ${paidAmount} to month index ${monthIndex}`); // Debug logging
//                     monthlyTotals[monthIndex] += paidAmount;
//                 }
//             });
//         }
//     });

//     console.log("Monthly Totals:", monthlyTotals); // Debug logging
//     return monthlyTotals;
// };
const processIncome = () => {
    const monthlyTotals = Array(12).fill(0);

    if (!Array.isArray(AllMaintainance)) {
        return monthlyTotals;
    }

    AllMaintainance.forEach(maintenance => {
        const { monthAndYear, paymentDetails } = maintenance;

        if (!Array.isArray(paymentDetails)) {
            return;
        }

        const [year, month] = monthAndYear.split('-');
        const monthIndex = parseInt(month, 10) - 1;

        if (monthIndex >= 0 && monthIndex < 12) {
            paymentDetails.forEach(payment => {
                // Ensure amounts are parsed correctly
                const paidAmount = parseInt(payment.paidAmount, 10) || 0;
                if (paidAmount > 0) {
                    console.log(`Adding ${paidAmount} to month index ${monthIndex}`); // Debug logging
                    monthlyTotals[monthIndex] += paidAmount;
                }
            });
        }
    });

    console.log("Monthly Totals:", monthlyTotals); // Debug logging
    return monthlyTotals;
};


    useEffect(() => {
        dispatch(fetchBillsBySocietyId());
        dispatch(getAllMonthsBySocietyId());
    }, [dispatch]);

    useEffect(() => {
        console.log("AllMaintainance:", AllMaintainance); // Log the value to debug
        const processedExpenses = processExpenses(expenses);
        const processedIncome = processIncome();
        
        setChartData({
            income: processedIncome,
            expenses: processedExpenses
        });
    }, [expenses, AllMaintainance]);

    return (
        <BarChart
            width={700}
            height={300}
            series={[
                { data: chartData.income, label: 'Income', id: 'incomeId' },
                { data: chartData.expenses, label: 'Expenses', id: 'expensesId' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
    );
};

export default BarCharts;
