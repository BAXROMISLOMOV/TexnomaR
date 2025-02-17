import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  message,  } from "antd";
import FavouriteIcon from "../../assets/Icons/Heart";
import None from "../../assets/Icons/none";


function AboutProduct() {
  const [product, setProduct] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`)
      .then((res) => setProduct(res.data.data.data || {}))
      .catch((err) => console.error("API xatosi:", err));
  }, [id]);



  

  return (
    <div className="container mx-auto p-6">
      <div className="border-b border-gray-300 pb-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-3">
      
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2 cursor-pointer hover:text-red-500">
          <FavouriteIcon />
          <span>Sevimlilar</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500">
          <None />
          <span>Taqqoslash</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-2 overflow-y-auto h-80">
            {product.small_images?.map((img, index) => (
              <img key={index} src={img} alt="" className="w-20 h-20 object-cover cursor-pointer hover:scale-105" />
            ))}
          </div>
          <img
            src={product.large_images?.[0]}
            alt="Product"
            className="w-96 h-96 object-contain border rounded-lg"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Qisqacha Ma'lumot</h3>
          {product.main_characters?.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span className="text-gray-700 font-medium">{item.value}</span>
            </div>
          ))}
          <button className="text-blue-500 mt-4 hover:underline">Barcha xususiyatlarni ko'rish</button>
        </div>

        <div className="bg-gray-100 ml-5 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">
            {product.installment_price?.toLocaleString("ru-RU")} So'm
          </h2>
          <div className="bg-blue-100 p-3 rounded-md mb-4">
            <p>{product.minimal_loan_price?.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span>{product.minimal_loan_price?.month_number} oy</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                {product.minimal_loan_price?.min_monthly_price.toLocaleString("ru-RU")} So'm
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {product.offers_by_image?.map((offer, index) => (
              <img key={index} src={offer.image} alt="Offer" className="w-16 h-16 object-contain" />
            ))}
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <button className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">Savatchaga qo'shish</button>
            <button className="bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500">
              Tezkor xarid
            </button>
          </div>

          <div className="flex items-center gap-3 border-t pt-3 mt-4">
            <img
              src="https://texnomart.uz/_nuxt/img/store-small.4aacca3.svg"
              alt="Store"
              className="w-10"
            />
            <div>
              <p>Do'kondan olib ketish bepul</p>
              <p className="text-blue-700 cursor-pointer hover:underline">35 ta dokon mavjud</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutProduct;