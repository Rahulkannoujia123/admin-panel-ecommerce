import React, { useState } from "react";
import "./stockreport.css";

const StockReportList = () => {
  const stockReports = [
    { id: 1, productName: "Hariguru Fashion Womens Georgette Silk Foil Printed Gown (Multicolor)", hsnCode: "1234", totalSales: 200, available: 50 },
    { id: 2, productName: "Ceremonial Print Nehru Jacket with Welt Pocket", hsnCode: "5678", totalSales: 150, available: 30 },
    { id: 3, productName: "SkyTara Net Semi Stitched Anarkali Gown", hsnCode: "9101", totalSales: 300, available: 75 },
    { id: 4, productName: "Siril Art Silk & Khadi Silk Multicolor & Off-White Color Saree with Blouse piece | sarees for Women| saree | sarees", hsnCode: "1121", totalSales: 100, available: 20 },
    { id: 5, productName: "Floral Printed Casual Kurti", hsnCode: "1314", totalSales: 400, available: 40 },
    { id: 6, productName: "Men's Plain Shirt", hsnCode: "1516", totalSales: 350, available: 80 },
    { id: 7, productName: "Classic Cotton Saree", hsnCode: "1718", totalSales: 250, available: 30 },
    { id: 8, productName: "Branded Silk Dupatta", hsnCode: "1910", totalSales: 320, available: 60 },
    { id: 9, productName: "Rayon Printed Palazzo Pants", hsnCode: "2122", totalSales: 500, available: 90 },
    { id: 10, productName: "Designer Anarkali Suit", hsnCode: "2324", totalSales: 600, available: 100 },
    { id: 11, productName: "Handwoven Kanjeevaram Saree", hsnCode: "2526", totalSales: 700, available: 110 },
    { id: 12, productName: "Ethnic Kurta for Men", hsnCode: "2728", totalSales: 450, available: 70 },
  ];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search Filter Logic
  const filteredReports = stockReports.filter((report) =>
    report.productName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="stock-report-container">
      <h1 className="stock-report-title">Stock Report</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="search-input"
        />
      </div>

      {/* Table */}
      <table className="stock-report-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>HSN Code</th>
            <th>Total Sales</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.productName}</td>
                <td>{report.hsnCode}</td>
                <td>{report.totalSales}</td>
                <td>{report.available}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-data">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StockReportList;
