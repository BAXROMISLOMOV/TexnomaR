import React from "react";
import { Link } from "react-router-dom";
import { Button, message } from "antd";
import Shopping from "../../Icons/Shoping";
import useMyStore from "../../my-zustand";

function ProduktCard({ item }) {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useMyStore();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Savatchaga muvaffaqiyatli qo'shildi!",
      duration: 2,
    });
  };

  function onAdd(item) {
    const existingItem = state.savatcha.find(
      (savatItem) => savatItem.mahsulot.id === item.id
    );

    if (existingItem) {
      useMyStore.setState({
        savatcha: state.savatcha.map((savat) =>
          savat.mahsulot.id === item.id
            ? { ...savat, concat: savat.concat + 1 }
            : savat
        ),
      });
    } else {
      useMyStore.setState({
        savatcha: [...state.savatcha, { concat: 1, mahsulot: item }],
      });
    }
  }

  return (
    <div className="flex ">
      <div
        key={item.id}
        className="bg-white shadow-md rounded-2xl  items-center transition transform hover:scale-105 hover:shadow-lg w-64"
      >
        <Link
          to={`/product/${item.id}`}
          onClick={() =>
            window.scrollTo({
              behavior: "smooth",
              top: 0,
            })
          }
        >
          <img
            className="w-52 h-52 object-contain rounded-lg mx-auto"
            src={item.image}
            alt="Product"
          />
        </Link>

        <p className="text-lg font-semibold mt-3 text-center text-gray-900">
          {item.name.length > 19 ? item.name.slice(0, 19) + "..." : item.name}
        </p>

        <div className="flex justify-between items-center w-80 mt-3 text-xl">
          <p className="text-black bg-gray-200 mt-2 text-sm px-3 py-2 rounded-xl">
            {item.axiom_monthly_price} so‘m
          </p>
          {item.discount_value && (
            <p className="line-through opacity-65 text-black">
              {item.discount_value.toLocaleString("RU")} so‘m
            </p>
          )}
        </div>

        {contextHolder}

        <div className="flex justify-between items-center mt-5">
          <p className="font-bold text-lg">
            {item.sale_price.toLocaleString("RU")} so'm
          </p>
          <Button 
            onClick={() => {
              success();
              onAdd(item);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
          >
            <Shopping />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProduktCard;