import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://gw.texnomart.uz/api/web/v1/home/special-categories")
      .then((res) => setCategories(res.data.data.data))
      .catch((err) => console.error("Error occurred:", err));
  }, []);
          

  const handleNext = useCallback(() => {
    if (categories.length > 0) {
      setCategories((prev) => [...prev.slice(1), prev[0]]);
    }
  }, [categories]);

  const handlePrev = useCallback(() => {
    if (categories.length > 0) {
      setCategories((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    }
  }, [categories]);

  return (
    <div className="container mx-auto px-5 pt-8 relative flex items-center justify-center">
      <button
    className="absolute left-3 ml-10 md:left-0 top-20  bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full   z-10"
    onClick={handlePrev}
    aria-label="Previous Categories"
  >
    <LeftOutlined className="text-white text-xl" />
  </button>
  <div className="w-full overflow-hidden rounded-xl ">   
   <div className="flex gap-4 md:gap-5 justify-center items-center transition-transform duration-500">    
      {categories.slice(0, 5).map((item) => (       
          <div    key={item.title}    
         className="p-4 md:p-5 flex flex-col items-center rounded-xl border border-yellow-400 w-1/3 sm:w-1/4 md:w-1/5 transform"
           >
        <img className="w-24 md:w-32 object-contain duration-300"src={item.image} alt="" />
       <p className="text-center text-sm md:text-base mt-3">
           {item.title}
        </p>
       </div>
         ))}
        </div>
      </div>

     <button
        className="absolute right-3 mr-10 md:right-0 top-20  bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full"
        onClick={handleNext}
        aria-label="Next Categories"
      >
        <RightOutlined className="text-white text-xl" />
      </button>
    </div>
  );
}

export default Categories;
