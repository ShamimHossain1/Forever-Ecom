import React, { useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // Simple handlers to update individual state variables
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

  const handleBestsellerChange = (e) => {
    setBestseller(e.target.checked);
  };

  // Minimal submit stub — prevents default and prepares payload for the API
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
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

      console.log(formData);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
        document.getElementById("addProductForm").reset();
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setTitle("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, { autoClose: 1500, position: "top-center" });
    }

    // console.log("Prepared productData:", productData);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form
        onSubmit={onSubmitHandler}
        id="addProductForm"
        encType="multipart/form-data"
        className="flex flex-col gap-6"
      >
        {/* Image Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 font-semibold text-gray-700">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            <label htmlFor="image1" className="cursor-pointer">
              <img
                className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              name="image1"
              id="image1"
              hidden
            />
            <label htmlFor="image2" className="cursor-pointer">
              <img
                className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              name="image2"
              id="image2"
              hidden
            />
            <label htmlFor="image3" className="cursor-pointer">
              <img
                className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              name="image3"
              id="image3"
              hidden
            />
            <label htmlFor="image4" className="cursor-pointer">
              <img
                className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              name="image4"
              id="image4"
              hidden
            />
          </div>
        </div>

        {/* Product Details Section */}
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

        {/* Pricing, Category, and Type Section */}
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
              placeholder="$0.00"
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

        {/* Sizes and Bestseller Section */}
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
