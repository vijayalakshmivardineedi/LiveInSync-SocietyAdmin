import React from "react";
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
    LinePlot,
    MarkPlot,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const LineChart = () => {
    return (
        <ChartContainer
            width={500}
            height={250}
            series={[{ type: 'line', data: pData }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
                [`& .${lineElementClasses.root}`]: {
                    stroke: '#630000',
                    strokeWidth: 3,
                },
                [`& .${markElementClasses.root}`]: {
                    stroke: '#630000',
                    scale: '0.6',
                    fill: '#630000',
                    strokeWidth: 5,
                },
                marginTop: - 5
            }}
            disableAxisListener
        >
            <LinePlot />
            <MarkPlot />
        </ChartContainer >
    )
}
export default LineChart