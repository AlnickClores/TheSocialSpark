import React from "react";
import { Link } from "react-router-dom";
import { menu } from "../data/menuData";
import { icons } from "../assets/icons/icons";

const FoodCard = (props) => {
  return (
    <div className="px-2">
      {menu[props.category].map((item, index) => (
        <div
          className="bg-white rounded-xl shadow-lg shadow-black/30 mb-6"
          key={index}
        >
          <div className="relative">
            <img className="w-full" src={item.image} alt="menu-image" />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

            <h3 className="absolute bottom-0 left-0 p-2">
              <span className="text-[#ff8418] font-bold text-xl mr-2.5">
                {item.sizes ? (
                  <>
                    &#8369;{item.price.slice}
                    {item.price.small}
                  </>
                ) : (
                  <>&#8369;{item.price}</>
                )}
              </span>
              <span className="text-xl font-bold font-header text-white">
                {item.name}
              </span>
            </h3>
          </div>

          <div className="px-2 py-3">
            <p className="text-sm text-pretty">{item.description}</p>
            <div className="flex justify-between mt-3">
              {icons.ar}

              <button className="bg-[#ff8418] font-bold text-xl rounded-full px-1.5">
                <Link
                  to={{
                    pathname: "/order-detail",
                  }}
                  state={{
                    image: item.image,
                    price: item.price,
                    name: item.name,
                    sizes: item.sizes,
                  }}
                >
                  {icons.plus}
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
