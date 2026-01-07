import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500, position: "top-center" });
    }
  };

  // console.log(list);

  useEffect(() => {
    const getList = async () => {
      await fetchList();
    };
    getList();
  }, []);
  const removeProduct = async (id) => {
    try {
      if (!confirm("Are you sure you want to remove this product?")) return;
      const token = localStorage.getItem("token") || "";
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message, {
          autoClose: 1200,
          position: "top-center",
        });
        fetchList();
      } else {
        toast.error(res.data.message, {
          autoClose: 1500,
          position: "top-center",
        });
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to remove";
      toast.error(msg, { autoClose: 1500, position: "top-center" });
    }
  };

  return (
    <div className="bg-gray-50 p-4">
      <h3 className="text-lg font-semibold mb-4">All Products</h3>

      {list.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <div className="grid grid-cols-7 gap-4 px-4 py-3 border-b font-medium">
            <div>Image</div>
            <div className="col-span-2">Name</div>
            <div>Price</div>
            <div>Category</div>
            <div>Sizes</div>
            <div>Action</div>
          </div>

          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-7 gap-4 px-4 py-3 items-center border-b"
            >
              <div>
                <img
                  src={item.image?.[0] || item.images?.[0] || ""}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
              <div className="col-span-2">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.description?.slice(0, 80)}
                </div>
              </div>
              <div>${item.price}</div>
              <div>{item.category}</div>
              <div>
                {Array.isArray(item.size)
                  ? item.size.join(", ")
                  : Array.isArray(item.sizes)
                  ? item.sizes.join(", ")
                  : item.size || item.sizes || "-"}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/edit/${item._id}`, { state: item })}
                  title="Edit"
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  title="Remove"
                  className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
