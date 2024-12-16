import React, { useState, useEffect } from 'react';
import './product.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-eight-umber.vercel.app/user/get-product');
        const result = await response.json();
        if (response.ok && result.message === 'Products retrieved successfully') {
          setProducts(result.products);
        } else {
          console.error('Error fetching products:', result.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://ecommerce-backend-eight-umber.vercel.app/user/get-category');
        const result = await response.json();
        if (result.message === 'Categories fetched successfully.') {
          setCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('categoryId', formValues.categoryId);
    formData.append('stock', formValues.stock);
    formData.append('image', formValues.image);

    try {
      const response = await fetch('https://ecommerce-backend-eight-umber.vercel.app/user/add-product', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.message === 'Product added successfully') {
        setProducts((prev) => [
          ...prev,
          {
            id: result.product._id,
            name: result.product.name,
            price: result.product.price,
            description: result.product.description,
            image: result.product.image,
            stock: result.product.stock,
            categoryId: result.product.categoryId,
          },
        ]);
        setMessage('Product added successfully!');
      } else {
        setMessage(result.message || 'Failed to add product!');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product!');
    }

    setLoading(false);
    setFormValues({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      stock: 0,
      image: null,
    });
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  };

  const filteredProducts = products.filter((product) => product.price >= priceFilter);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="products-container">
      <h1>{isEditing ? 'Edit Product' : 'Product Listing'}</h1>

      {message && <p className="success-message">{message}</p>}

      {!isEditing && (
        <div>
          <button
            className="add-product-button"
            onClick={() => setIsEditing(true)}
          >
            Add Product
          </button>

          <div className="price-filter">
            <label>Filter by Price:</label>
            <input
              type="number"
              placeholder="Minimum Price"
              value={priceFilter}
              onChange={handlePriceFilter}
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
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
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
                  <td>{product.categoryId ? getCategoryName(product.categoryId._id || product.categoryId) : 'Unknown'}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="add-product-form">
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
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
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

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Products;
