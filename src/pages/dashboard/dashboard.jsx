import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './dashboard.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Sample data for the revenue chart
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 7000 },
  { month: 'Jul', revenue: 8000 },
];

// Sample data for products
const bestSellingProducts = [
  { name: 'Black & Green Long Kurti Top', visits: '12.4k' },
  { name: 'Stylish Men\'s T-Shirt', visits: '9.5k' },
  { name: 'Leather Wallet', visits: '7.1k' },
];

const topSellingCategories = [
  { name: 'Clothing', sales: '45%' },
  { name: 'Electronics', sales: '30%' },
  { name: 'Home Decor', sales: '25%' },
];

const trendingProducts = [
  { name: 'Trendy Sunglasses', visits: '15k' },
  { name: 'Smart Watch', visits: '13k' },
  { name: 'Bluetooth Speakers', visits: '11k' },
];

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="dashboard">
      <header>
        <h1>Dashboard</h1>
        <div className="date-picker">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMM dd, yyyy"
            placeholderText="Select Date"
          />
        </div>
      </header>
      <div className="stats">
        <div className="stat">
          <h3>Revenue</h3>
          <p>
            7.4k <span className="positive">+22%</span>
          </p>
        </div>
        <div className="stat">
          <h3>Orders</h3>
          <p>
            420 <span className="negative">-22%</span>
          </p>
        </div>
        <div className="stat">
          <h3>Visitors</h3>
          <p>
            12.5k <span className="positive">+49%</span>
          </p>
        </div>
        <div className="stat">
          <h3>Conversion</h3>
          <p>
            22% <span className="positive">+22%</span>
          </p>
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <div className="revenue-chart">
            <h3>Revenue</h3>
            {/* Revenue Line Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="trending-products">
            <h3>Trending Products</h3>
            <ul>
              {trendingProducts.map((product, index) => (
                <li key={index}>
                  <span>{product.name}</span>
                  <span>Visits: {product.visits}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="details">
          <div className="top-selling">
            <h3>Top Selling Categories</h3>
            <ul>
              {topSellingCategories.map((category, index) => (
                <li key={index}>
                  <span>{category.name}</span>
                  <span>Sales: {category.sales}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="best-selling">
            <h3>Best Selling Products</h3>
            <ul>
              {bestSellingProducts.map((product, index) => (
                <li key={index}>
                  <span>{product.name}</span>
                  <span>Visits: {product.visits}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
