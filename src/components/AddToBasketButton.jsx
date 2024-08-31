import React from "react";

const AddToBasketButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center py-3 px-5">
      <button
        className="bg-[#ff8428] w-full text-lg font-bold text-white px-6 py-2 rounded-xl"
        onClick={() => alert("Wala pa e. - Alnick")}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default AddToBasketButton;
