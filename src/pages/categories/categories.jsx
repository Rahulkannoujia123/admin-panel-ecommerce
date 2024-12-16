import React, { useState, useEffect } from "react";
import axios from "axios";
import "./categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    parentCategory: "",
    metaDescription: "",
    image: null,
  });

  useEffect(() => {
    // Fetch categories from the API when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-backend-eight-umber.vercel.app/user/get-category"
        );
        if (response.data.message === "Categories fetched successfully.") {
          setCategories(response.data.data); // Set fetched categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Error fetching categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  const handleAddOrEditCategory = async () => {
    if (formData.categoryName.trim() === "") {
      alert("Please enter a category name.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.categoryName.trim());
      formDataToSend.append("subcategories", JSON.stringify([]));
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        "https://ecommerce-backend-eight-umber.vercel.app/user/add-category",
        formDataToSend
      );

      if (response.data.message === "Category added successfully") {
        setCategories([...categories, response.data.category]); // Add new category
        alert("Category added successfully!");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    }

    setFormData({ categoryName: "", parentCategory: "", metaDescription: "", image: null });
    setIsPopupOpen(false);
    setIsEditMode(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsEditMode(true);
    setFormData({
      categoryName: category.name,
      parentCategory: "",
      metaDescription: "",
      image: null,
    });
    setIsPopupOpen(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedCategories(!selectAll ? categories.map((cat) => cat._id) : []);
  };

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <button
        onClick={() => {
          setIsPopupOpen(true);
          setIsEditMode(false);
          setFormData({ categoryName: "", parentCategory: "", metaDescription: "", image: null });
        }}
        className="open-popup-button"
      >
        Add Category
      </button>

      <table className="categories-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => handleCategorySelect(category._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <img src={category.image} alt={category.name} width={50} height={50} />
              </td>
              <td>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="edit-category-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="delete-category-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{isEditMode ? "Edit Category" : "Add Category"}</h2>
            <form className="add-category-form">
              <label>
                Category Name:
                <input
                  type="text"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Select Image:
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </label>
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={() => {
                    setIsPopupOpen(false);
                    setIsEditMode(false);
                  }}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddOrEditCategory}
                  className="submit-button"
                >
                  {isEditMode ? "Save Changes" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
