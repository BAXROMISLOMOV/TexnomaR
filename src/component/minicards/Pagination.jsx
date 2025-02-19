import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProduktCard from "../Card/cardsPage";
import { Button, Spin } from "antd";
import Store from "../Card/filterBtn";

function CatalogPage() {
  const [cardlar, setCardlar] = useState(null);
  const [pagination, setPagination] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    setCardlar(null);
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=${slug}&sort=-order_count&page=${pagination}`
      )
      .then((res) => {
        setCardlar(res.data.data);
      })
      .catch((error) => {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      });
  }, [slug, pagination]);

  if (!cardlar) {
    return (
      <div className="flex justify-center items-right
       h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      <Store />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardlar.products?.map((item) => (
          <ProduktCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: cardlar.pagination.total_page }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            type={pagination === page ? "primary" : "default"}
            onClick={() => setPagination(page)}
            className="w-10 h-10 flex items-center justify-center"
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
}


export default CatalogPage;
