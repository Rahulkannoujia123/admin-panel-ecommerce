import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './order.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating an API call to fetch orders (replace with actual API call)
    const fetchedOrders = [
      { id: 1, customerName: 'John Doe', product: 'Laptop', status: 'Pending' },
      { id: 2, customerName: 'Jane Smith', product: 'Smartphone', status: 'Shipped' },
      { id: 3, customerName: 'Alice Brown', product: 'Headphones', status: 'Delivered' },
      { id: 4, customerName: 'John Doe', product: 'Laptop', status: 'Pending' },
      { id: 5, customerName: 'Jane Smith', product: 'Smartphone', status: 'Shipped' },
      { id: 6, customerName: 'Alice Brown', product: 'Headphones', status: 'Delivered' },
    ];
    setOrders(fetchedOrders);

    // If orderId is present, show the specific order's details
    if (orderId) {
      const selectedOrder = fetchedOrders.find(order => order.id === parseInt(orderId));
      setSelectedOrder(selectedOrder);
    }
  }, [orderId]);

  const handleOrderClick = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleBackClick = () => {
    navigate('/orders');
    setSelectedOrder(null);
  };

  const handleEditClick = (id) => {
    navigate(`/orders/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      // You can also make an API call to delete the order on the server
    }
  };

  return (
    <div className="orders-container">
      {selectedOrder ? (
        <div className="order-insight-container">
          <h1>Order #{selectedOrder.id} Details</h1>
          <div className="order-details">
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button className="back-button" onClick={handleBackClick}>
              Back to Orders List
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Orders</h1>
          <p>Manage and view customer orders here.</p>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Product</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.product}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() => handleOrderClick(order.id)}
                      className="view-details-button"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEditClick(order.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
