import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const OrderDetailPage = () => {
  const location = useLocation();
  const { orderId, orders = [], price, status } = location.state || {};

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-2">
        <h1 className="text-2xl font-bold my-5">Order Confirmation</h1>

        <div className="text-xl">
          <h1>Order #: {orderId}</h1>
          <h1>Status: {status}</h1>
          <h1>Total Price: &#8369;{price}</h1>
        </div>

        <div className="my-5">
          <h2 className="font-bold text-xl">Orders:</h2>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="border-b my-2">
                <h1>Name: {order.item}</h1>
                <h1>Quantity: {order.Quantity}</h1>
                {order.Variation && <h1>Size: {order.Variation}</h1>}
                {order.Note && <h1>Note: {order.Note}</h1>}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>

        <div>
          <h1 className="text-xl font-bold text-pretty text-[#ff8418] text-center">
            Please proceed to the counter to pay your order.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
