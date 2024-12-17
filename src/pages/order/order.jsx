import React, { useState } from "react";
import "./order.css";

const OrderList = () => {
  const [orders, setOrders] = useState([
    { id: 1, orderNo: "ORD12345", customer: "karan", amount: 250.0, area: "golden nest", city: "Delhi", pincode: "10001", status: "Delivered" },
    { id: 2, orderNo: "ORD22124", customer: "rohit", amount: 250.0, area: "indralok", city: "Mumbai", pincode: "10001", status: "Delivered" },
    { id: 3, orderNo: "ORD54321", customer: "ankit", amount: 250.0, area: "vasai road", city: "surat", pincode: "223344", status: "Delivered" },
    { id: 4, orderNo: "ORD78965", customer: "atul", amount: 250.0, area: "navghar road", city: "varanasi", pincode: "221207", status: "Pending" },
    { id: 5, orderNo: "ORD78961", customer: "sahil", amount: 250.0, area: "virar", city: "goa", pincode: "221207", status: "Shipped" },
    { id: 6, orderNo: "ORD78955", customer: "pratik", amount: 250.0, area: "nayegoan", city: "noida", pincode: "221207", status: "Delivered" },
    { id: 7, orderNo: "ORD7822", customer: "vishal", amount: 250.0, area: "mittal industrie", city: "nagpur", pincode: "221555", status: "Pending" },
    { id: 8, orderNo: "ORD7893", customer: "vijay", amount: 250.0, area: "pink city", city: "jaipur", pincode: "444545", status: "Delivered" },
    { id: 9, orderNo: "ORD4432", customer: "mukesh", amount: 250.0, area: "nalasopara", city: "palghar", pincode: "22144", status: "Pending" },
    { id: 10, orderNo: "ORD78965", customer: "pradeep", amount: 250.0, area: "assighat road", city: "varanasi", pincode: "221207", status: "Delivered" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Handle delete action
  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="order-container">
      <h1>Order List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by customer, order number, city, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order No</th>
            <th>Customer</th>
            <th>Amount ($)</th>
            <th>Area</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderNo}</td>
                <td>{order.customer}</td>
                <td>{order.amount.toFixed(2)}</td>
                <td>{order.area}</td>
                <td>{order.city}</td>
                <td>{order.pincode}</td>
                <td>
                  <span
                    className={`status ${
                      order.status.toLowerCase() === "delivered"
                        ? "delivered"
                        : order.status.toLowerCase() === "pending"
                        ? "pending"
                        : "shipped"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-data">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
