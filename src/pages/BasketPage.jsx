import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { BasketContext } from "../context/BasketContext";
import OrderConfirmation from "../components/modals/OrderConfirmation";

const BasketPage = () => {
  const navigate = useNavigate();
  const { basketItems } = useContext(BasketContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const handleAddItems = () => {
    navigate("/menu");
  };

  const handleEditItems = (item) => {
    alert(`Edit item: ${item.name}`);
  };

  const handleSubmitMenu = () => {
    const generateOrderID = () => Math.floor(1000 + Math.random() * 9000);
    const orderID = generateOrderID();

    const newOrderData = {
      OrderID: orderID,
      Status: "Pending",
      Orders: basketItems.map((item) => ({
        item: item.name,
        Quantity: item.quantity,
        Price: item.price,
        Note: item.note || "",
      })),
      TotalPrice: basketItems.reduce(
        (total, item) => total + parseFloat(item.price),
        0
      ),
      Expiration: new Date().getTime() + 10 * 60 * 1000,
    };
    setOrderData(newOrderData);
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    try {
      const ordersCollection = collection(db, "orders");
      await addDoc(ordersCollection, orderData);

      setShowConfirmation(false);
      setOrderData(null);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmation(false);
    setOrderData(null);
  };

  const totalAmount = basketItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex justify-between items-center px-3 my-5">
        <h1 className="font-bold text-xl">Order Summary</h1>
        <h1 className="text-[blue] text-md" onClick={handleAddItems}>
          Add Items
        </h1>
      </div>

      <div className="px-3">
        {basketItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full gap-5 py-4 border-b"
          >
            {/* Quantity */}
            <span className="font-semibold border border-[#ff8428] px-1">
              {item.quantity}x
            </span>

            {/* Name and Edit */}
            <div className="flex flex-grow flex-col justify-between">
              <span className="font-semibold text-lg">{item.name}</span>
              <span
                className="text-[blue] text-xs cursor-pointer"
                onClick={() => handleEditItems(item)}
              >
                Edit
              </span>
            </div>

            {/* Price */}
            <span className="text-lg font-semibold">&#8369;{item.price}</span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center gap-5 py-3 px-5 border-t rounded-xl">
        <div className="flex justify-between w-full text-xl">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">&#8369;{totalAmount.toFixed(2)}</span>
        </div>

        <button
          className="bg-[#ff8428] w-full text-lg font-bold text-white px-6 py-2 rounded-xl"
          onClick={handleSubmitMenu}
        >
          Place Order
        </button>
      </div>

      {showConfirmation && (
        <OrderConfirmation
          onConfirm={handleConfirmOrder}
          onCancel={handleCancelOrder}
        />
      )}
    </div>
  );
};

export default BasketPage;
