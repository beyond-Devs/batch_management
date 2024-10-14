import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
    { name: "Jan", total: 4000 },
    { name: "Feb", total: 1890 },
    { name: "Mar", total: 3800 },
    { name: "Apr", total: 5400 },
    { name: "May", total: 5500 },
    { name: "Jun", total: 5000 },
    { name: "Jul", total: 3800 },
    { name: "Aug", total: 4000 },
    { name: "Sep", total: 5200 },
    { name: "Oct", total: 1600 },
    { name: "Nov", total: 2100 },
    { name: "Dec", total: 3400 },
];

const MyBarChart = () => {
    return (
        <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
    );
};

export default MyBarChart;