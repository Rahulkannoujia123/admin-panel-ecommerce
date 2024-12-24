import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formMode, setFormMode] = useState(''); // 'add', 'edit', or ''
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stock: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [priceFilter, setPriceFilter] = useState(0);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-eight-umber.vercel.app/user/get-product');
        if (response.data.message === 'Products retrieved successfully') {
          setProducts(response.data.products);
        } else {
          console.error('Error fetching products:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-eight-umber.vercel.app/user/get-category');
        if (response.data.message === 'Categories fetched successfully.') {
          setCategories(response.data.data);
        } else {
          console.log('Error: Categories not fetched');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] });
  };

  // Handle form submission for adding or editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      let response;
      if (formMode === 'add') {
        response = await axios.post('https://ecommerce-backend-eight-umber.vercel.app/user/add-product', formData);
      } else if (formMode === 'edit') {
        response = await axios.post(
          `https://ecommerce-backend-eight-umber.vercel.app/user/update-product?id=${editingProduct._id}`,
          formData
        );
      }

      if (response.data.message.includes('successfully')) {
        if (formMode === 'add') {
          setProducts((prev) => [...prev, response.data.product]);
        } else {
          setProducts((prev) =>
            prev.map((product) => (product._id === editingProduct._id ? response.data.product : product))
          );
        }
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message || 'Operation failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }

    setLoading(false);
    setFormMode('');
    setFormValues({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      stock: 0,
      image: null,
    });
    setEditingProduct(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const url = `https://ecommerce-backend-eight-umber.vercel.app/user/delete-product?id=${id}`;
        const response = await axios.delete(url);
  
        if (response.data.message === 'Product deleted successfully') {
          setProducts((prev) => prev.filter((product) => product._id !== id));
          setMessage(response.data.message);
        } else {
          setMessage('Failed to delete product.');
        }
      } catch (error) {
        console.error('Error deleting product:', error.response || error.message);
      }
    }
  };
  
  // Filter products by price
  const filteredProducts = products.filter((product) => product.price >= priceFilter);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render product table
  const renderProductTable = () => (
    <div>
      <button className="add-product-button" onClick={() => setFormMode('add')}>
        Add Product
      </button>

      <div className="price-filter">
        <label>Filter by Price:</label>
        <input
          type="number"
          placeholder="Minimum Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>

      <table className="product-list">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="product-image" />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                {product.description.length > 100
                  ? `${product.description.substring(0, 100)}...`
                  : product.description}
              </td>
              <td>{product.categoryId?.name }</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => {
                    setFormMode('edit');
                    setEditingProduct(product);
                    setFormValues({
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      categoryId: product.categoryId._id || '',
                      stock: product.stock,
                      image: null,
                    });
                  }}
                  className="edit-button"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

  // Render form
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>{formMode === 'add' ? 'Add Product' : 'Edit Product'}</h2>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formValues.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoryId">Product Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formValues.categoryId}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Product Description</label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formValues.stock}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Product Image</label>
        <input type="file" id="image" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : formMode === 'add' ? 'Add Product' : 'Update Product'}
      </button>
      {message && <p className="message">{message}</p>}
    </form>
  );

  return (
    <div>
      {formMode ? renderForm() : renderProductTable()}
    </div>
  );
};

export default Products;
