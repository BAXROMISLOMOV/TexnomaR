import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../../my-zustand";
import { useParams } from "react-router-dom";
import Sidefilter from "./SideFilter";
import cardsPage from "../Card/cardsPage"
function SortButton() {
  const state = useMyStore();
  const [cardlar, setCardlar] = useState(null);
  const [pagination] = useState(1);
  const { slug } = useParams();
  const { tartibi } = state;

  useEffect(() => {
    setCardlar();
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=${slug}&sort= ${
          tartibi === true ? "-" : ""
        }${state.currentSort}&page=${pagination}`
      )
      .then((res) => {
        setCardlar(res.data.data);
      })
      .catch((err) => {
        console.error("API xatosi:", err);
        setCardlar(null);
      });
  }, [slug, pagination, state.currentSort, tartibi]);

  if (!cardlar) {
    return (
      <div className="container mx-auto mt-40 flex justify-center">
        <l-tail-chase size="100" speed="1.75" color="black"></l-tail-chase>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className=" flex items-center gap-5 justify-between ">
        <div className="flex items-center gap-5 justify-center">
          <project_mini name={"prise"} title={"Narh bo'yicha"} />
          <project_mini name={"rating"} title={"reyting"} />
          <project_mini name={"new"} title={"yangi kelganlar"} />
          <project_mini name={"order_count"} title={"omabopligi"} />
        </div>
        <div>
          <div className="flex justify-between gap-4 pb-5"></div>
          <div className=" flex gap-4 pb-5">
            <div></div>
          </div>
        </div>
      </div>
      <div className="flex justify-around md:flex-row gap-5">
        <div className="md:w-1/4 w-full">
        <Sidefilter filter={cardlar.filter} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-grow">
       
          {cardlar.products.map((item) => (
            <cardsPage key={item.id} item={item} />
          ))} 
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-10">
      </div>
    </div>
  );
}

export default SortButton;