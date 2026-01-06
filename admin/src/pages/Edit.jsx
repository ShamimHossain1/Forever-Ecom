import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Edit = ({ token }) => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state || {};

  // image files (newly chosen)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // preview urls – fall back to existing product images
  const productImages = product.image || product.images || [];
  const [preview1, setPreview1] = useState(productImages[0] || null);
  const [preview2, setPreview2] = useState(productImages[1] || null);
  const [preview3, setPreview3] = useState(productImages[2] || null);
  const [preview4, setPreview4] = useState(productImages[3] || null);

  // text states

  const [title, setTitle] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [category, setCategory] = useState(product.category || "");
  const [subCategory, setSubCategory] = useState(product.subCategory || "");
  const [sizes, setSizes] = useState(product.sizes || product.size || []);
  const [bestseller, setBestseller] = useState(product.bestseller || false);

  // Handlers
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") setTitle(value);
    else if (name === "description") setDescription(value);
    else if (name === "price") setPrice(value);
    else if (name === "category") setCategory(value);
    else if (name === "subCategory") setSubCategory(value);
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSizes((prev) => {
      if (checked) return [...prev, value];
      return prev.filter((s) => s !== value);
    });
  };

  const handleBestsellerChange = (e) => setBestseller(e.target.checked);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const res = await axios.put(
        backendUrl + "/api/product/edit",
        formData,
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
        navigate("/list");
      } else {
        toast.error(res.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to update";
      toast.error(msg, { autoClose: 1500, position: "top-center" });
      console.log(err.message)
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6"
        id="editProductForm"
      >
        {/* Image section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 font-semibold text-gray-700">Update Images</p>
          <div className="flex gap-4 flex-wrap">
            {[0, 1, 2, 3].map((idx) => {
              const preview = [preview1, preview2, preview3, preview4][idx];
              const setImage = [setImage1, setImage2, setImage3, setImage4][
                idx
              ];
              const setPreview = [
                setPreview1,
                setPreview2,
                setPreview3,
                setPreview4,
              ][idx];
              const inputId = `image${idx + 1}`;
              return (
                <div key={inputId} className="relative">
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      &times;
                    </button>
                  )}
                  <label htmlFor={inputId} className="cursor-pointer">
                    <img
                      className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                      src={
                        preview ||
                        "https://via.placeholder.com/128x128?text=Upload"
                      }
                      alt="preview"
                    />
                  </label>
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    type="file"
                    name={inputId}
                    id={inputId}
                    hidden
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Basic info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="mb-2 block font-semibold text-gray-700">
              Product Title
            </label>
            <input
              name="name"
              onChange={onChangeHandler}
              value={title}
              className="w-full max-w-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter Product Title"
              required
            />
          </div>
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              onChange={onChangeHandler}
              value={description}
              className="w-full max-w-lg px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write a brief description of the product"
              required
            />
          </div>
        </div>
        {/* Pricing, Category, SubCategory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="mb-2 block font-semibold text-gray-700">
              Price
            </label>
            <input
              name="price"
              onChange={onChangeHandler}
              value={price}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              step="0.01"
              required
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="mb-2 block font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              onChange={onChangeHandler}
              value={category}
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label className="mb-2 block font-semibold text-gray-700">
              Sub-Category
            </label>
            <select
              name="subCategory"
              onChange={onChangeHandler}
              value={subCategory}
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        {/* Sizes & bestseller */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 block font-semibold text-gray-700">Sizes</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 cursor-pointer text-gray-600"
              >
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              id="bestseller"
              name="bestseller"
              type="checkbox"
              checked={bestseller}
              onChange={handleBestsellerChange}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="font-semibold text-gray-700">
              Mark as Bestseller
            </span>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 bg-black hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
