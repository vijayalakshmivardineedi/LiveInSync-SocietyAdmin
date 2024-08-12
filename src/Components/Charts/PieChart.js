// import React, { useEffect } from "react";
// import { PieChart } from '@mui/x-charts/PieChart';
// import { fetchVisitors } from "../../Pages/VisitorRecord/ListSlice";
// import { useDispatch, useSelector } from "react-redux";

// const PieCharts = () => {
//     const dispatch = useDispatch();
//     const visitors = useSelector(state => state.visitorsRecords.visitors);
//     const status = useSelector(state => state.visitorsRecords.status);
//     const error = useSelector(state => state.visitorsRecords.error);

//     useEffect(() => {
//       dispatch(fetchVisitors());
//     }, [dispatch]);

//     // Count the number of visitors for each status
//     const countStatus = (status) => {
//         return visitors.filter(visitor => visitor.status === status).length;
//     };

//     const checkinCount = countStatus("Check In");
//     const waitingCount = countStatus("Waiting");
//     const checkoutCount = countStatus("Check Out");

//     return (
//         <PieChart
//             series={[
//                 {
//                     data: [
//                         { value: checkinCount, label: 'Check In' },
//                         { value: checkoutCount, label: 'Check Out' },
//                         { value: waitingCount, label: 'Waiting' },
//                     ],
//                 },
//             ]}
//             width={350}
//             height={150}
//         />
//     );
// };

// export default PieCharts;
import React, { useEffect, useState } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchVisitors } from "../../Pages/VisitorRecord/ListSlice";
import { useDispatch, useSelector } from "react-redux";

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
};

const PieCharts = () => {
    const dispatch = useDispatch();
    const visitors = useSelector(state => state.visitorsRecords.visitors);
    const status = useSelector(state => state.visitorsRecords.status);
    const error = useSelector(state => state.visitorsRecords.error);
    const todayDate = getTodayDate(); // Get today's date

    const [hasVisitors, setHasVisitors] = useState(false);

    useEffect(() => {
        dispatch(fetchVisitors());
    }, [dispatch]);

    useEffect(() => {
        const todayVisitors = visitors.filter(visitor => visitor.date === todayDate);
        setHasVisitors(todayVisitors.length > 0);
    }, [visitors, todayDate]);

    // Filter visitors for today
    const todayVisitors = visitors.filter(visitor => visitor.date === todayDate);

    // Count the number of visitors for each status
    const countStatus = (status) => {
        return todayVisitors.filter(visitor => visitor.status === status).length;
    };

    const checkinCount = countStatus("Check In");
    const waitingCount = countStatus("Waiting");
    const checkoutCount = countStatus("Check Out");

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {!hasVisitors ? (
                <p>No Visits</p>
            ) : (
                <PieChart
                    series={[
                        {
                            data: [
                                { value: checkinCount, label: 'Check In' },
                                { value: checkoutCount, label: 'Check Out' },
                                { value: waitingCount, label: 'Waiting' },
                            ],
                        },
                    ]}
                    width={350}
                    height={150}
                />
            )}
        </div>
    );
};

export default PieCharts;
