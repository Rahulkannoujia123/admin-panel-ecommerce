import React, { useState } from "react";
import "./refundorder.css";

const RefundOrderList = () => {
  const [refundOrders, setRefundOrders] = useState([
    {
      id: 1,
      orderNo: "ORD12345",
      paymentId: "PAY12345",
      orderDate: "2024-12-01",
      walletAmount: 23.0,
      status: "Refunded",
    },
    {
      id: 2,
      orderNo: "ORD22124",
      paymentId: "PAY22124",
      orderDate: "2024-12-02",
      walletAmount: 456.0,
      status: "Pending",
    },
    {
      id: 3,
      orderNo: "ORD54321",
      paymentId: "PAY54321",
      orderDate: "2024-12-03",
      walletAmount: 199.0,
      status: "Refunded",
    },
    {
      id: 4,
      orderNo: "ORD78965",
      paymentId: "PAY78965",
      orderDate: "2024-12-04",
      walletAmount: 60.0,
      status: "Pending",
    },
    {
      id: 5,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 500.0,
      status: "Refunded",
    },
    {
      id: 6,
      orderNo: "ORD78963",
      paymentId: "PAY78965",
      orderDate: "2024-12-05",
      walletAmount: 400.0,
      status: "Refunded",
    },
    {
      id: 7,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 432.0,
      status: "Refunded",
    },
    {
      id: 8,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 435.0,
      status: "Refunded",
    },
    {
      id: 9,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 123.0,
      status: "Refunded",
    },
    {
      id: 10,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 566.0,
      status: "Refunded",
    },
    {
      id: 11,
      orderNo: "ORD78961",
      paymentId: "PAY78961",
      orderDate: "2024-12-05",
      walletAmount: 399.0,
      status: "Refunded",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(refundOrders.length / itemsPerPage);

  // Handle refund action
  const handleRefund = (id) => {
    setRefundOrders(
      refundOrders.map((order) =>
        order.id === id ? { ...order, status: "Refunded" } : order
      )
    );
  };

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = refundOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="refund-order-container">
      <h1>Refund Order List</h1>
      <table className="refund-order-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order No</th>
            <th>Payment ID</th>
            <th>Order Date</th>
            <th>Wallet Amount ($)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderNo}</td>
                <td>{order.paymentId}</td>
                <td>{order.orderDate}</td>
                <td>{order.walletAmount.toFixed(2)}</td>
                <td>
                  <span
                    className={`status ${
                      order.status.toLowerCase() === "refunded"
                        ? "refunded"
                        : "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  {order.status === "Pending" && (
                    <button
                      className="refund-button"
                      onClick={() => handleRefund(order.id)}
                    >
                      Refund
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No refund orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RefundOrderList;
