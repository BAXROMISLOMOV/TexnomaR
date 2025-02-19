import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import useMyStore from "../../my-zustand";
import Menu from "../../Icons/menu";
import FavouriteIcon from "../../Icons/Heart";
import Cart from "../../Icons/Shoping";
import Search from "../../Icons/Search";
import UserIcon from "../../Icons/User";
import { message } from "antd";

function Navlog() {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [input, setInput] = useState("");
  const state = useMyStore();
  const cartCount = state.savatcha.length;


  const showModal = () => setOpen(true);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => setOpen(false);

  const toggleSelectAll = () => {
    const newSelectedItems = selectAll
      ? {}
      : state.savatcha.reduce((acc, item) => {
          acc[item.mahsulot.id] = true;
          return acc;
        }, {});
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  const countSelectedItems = () =>
    Object.values(selectedItems).filter(Boolean).length;

  const clearSelectedItems = () => {
    setSelectedItems({});
    setSelectAll(false);
    state.setSavatcha([]);
  };

  return (
    <div className="bg-gray-100 px-4 py-5">
      <div className="container m-auto flex items-center justify-between px-5">
        <div className="flex gap-5">
          <Link to="/">
            <img
              src="https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg"
              alt="Texnomart Logo"
            />
          </Link>
          <button className="flex items-center gap-2 bg-yellow-400 px-5 py-2 rounded font-semibold">
            <Menu /> Katalog
          </button>
        </div>

        <div className="flex items-center border-2 border-yellow-500 rounded w-[700px] p-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-2 outline-none w-full"
            type="text"
            placeholder="Qidirish..."
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center">
            <UserIcon />
            <p>Krish</p>
          </div>
          <div className="flex flex-col items-center">
            <FavouriteIcon />
            <p>Sevimli</p>
          </div>
          <div
            onClick={showModal}
            className="flex flex-col items-center relative cursor-pointer"
          >
            <Cart />
            {cartCount > 0 && (
              <span className="absolute bottom-[35px] right-3  bg-yellow-500 text-white text-xs font-bold flex items-center justify-center rounded-full w-4 h-4">
                {cartCount}
              </span>
              )}
            <p>Savatcha</p>
            

          </div>
        </div>
      </div>

      <Modal
        title={`Savatchangiz (${countSelectedItems()} ta tanlandi)`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        onClick={() => {
          message.success("Item added successfully!");
}}
      >
        {cartCount > 0 ? (
          <>
            <div className="flex justify-between border-b pb-5 pt-10">
              <label className="text-xl flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 border-2 border-yellow-500 rounded cursor-pointer focus:ring-yellow-500"
                />
                <span className="text-yellow-600 font-semibold">
                  Hammasini tanlash
                </span>
              </label>
              <button
                onClick={clearSelectedItems}
                className="text-xl text-yellow-600 hover:text-yellow-700 cursor-pointer font-semibold"
              >
                Tanlanganlarni o'chirish
              </button>
            </div>
            <div className="mt-5">
              {state.savatcha.map((item) => (
                <label
                  key={item.mahsulot.id}
                  className="flex items-center gap-4 cursor-pointer py-3 hover:bg-gray-50 px-4 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={!!selectedItems[item.mahsulot.id]}
                    onChange={() =>
                      setSelectedItems((prev) => ({
                        ...prev,
                        [item.mahsulot.id]: !prev[item.mahsulot.id],
                      }))
                    }
                    className="w-5 h-5 border-2 border-yellow-500 rounded cursor-pointer focus:ring-yellow-500"
                  />
                  <img
                    src={item.mahsulot.image}
                    alt={item.mahsulot.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className="text-lg text-gray-700 font-medium">
                    {item.mahsulot.name}
                  </p>
                </label>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Savatchangiz bo‘sh</p>
        )}
      </Modal>
    </div>
  );
}

export default Navlog;
