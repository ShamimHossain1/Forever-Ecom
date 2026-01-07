import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) => {
    const query = search.trim().toLowerCase();
    const matchSearch =
      query === "" ||
      order._id.toLowerCase().includes(query) ||
      `${order.address.firstName} ${order.address.lastName}`
        .toLowerCase()
        .includes(query);
    const matchStatus = statusFilter === "" || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h3 className="text-lg font-semibold mb-4">Orders</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-48 focus:outline-none focus:ring-1 focus:ring-orange-500"
        >
          <option value="">All Statuses</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Order Processing">Order Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="sm:min-w-[800px] bg-white shadow rounded divide-y">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-7 gap-4 px-4 py-3 font-medium bg-gray-100">
              <div className="col-span-2">Order</div>
              <div>Date</div>
              <div>Customer</div>
              <div>Amount</div>
              <div>Status</div>
              <div></div>
            </div>

            {filteredOrders.map((order) => {
              const isOpen = expanded[order._id];
              return (
                <div key={order._id} className="divide-y">
                  {/* Summary Row */}
                  <div
                    className="flex flex-col sm:grid sm:grid-cols-7 gap-2 sm:gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <div className="col-span-2 truncate text-sm font-medium text-gray-800">
                      {order._id}
                    </div>
                    <div className="text-sm text-gray-700">
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-700 truncate">
                      {order.address.firstName} {order.address.lastName}
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      ${order.amount}
                    </div>
                    <div>
                      <select
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => statusHandler(e, order._id)}
                        value={order.status}
                        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Order Processing">Accept Order</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Detail Row */}
                  {isOpen && (
                    <div className="px-4 py-4 bg-gray-50 text-sm text-gray-700 grid gap-4 md:grid-cols-2">
                      {/* Items */}
                      <div>
                        <h4 className="font-semibold mb-2">Items</h4>
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-2 mb-1"
                          >
                            <img
                              src={
                                item.image?.[0] ||
                                item.images?.[0] ||
                                item.image ||
                                (item.images && item.images[0]) ||
                                ""
                              }
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <p className="text-sm">
                              {item.name} - {item.quantity} x ${item.price}{" "}
                              (Size: {item.size})
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Shipping / Customer */}
                      <div>
                        <h4 className="font-semibold mb-2">Customer</h4>
                        <p>
                          {order.address.firstName} {order.address.lastName}
                        </p>
                        <p>
                          {order.address.street}, {order.address.city},{" "}
                          {order.address.state}, {order.address.zip},{" "}
                          {order.address.country}
                        </p>
                        <p>{order.address.email}</p>
                        <p>{order.address.phone}</p>
                      </div>

                      {/* Payment */}
                      <div>
                        <h4 className="font-semibold mb-2">Payment</h4>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Status: {order.payment ? "Paid" : "Not Paid"}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
