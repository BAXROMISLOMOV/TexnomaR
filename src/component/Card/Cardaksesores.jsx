import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardsPage from "../Card/cardsPage";

function Cardaksesores() {
  const [accsesuarlar, setAccsesuarlar] = useState([]);
  const [activIndex, setActivIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://gw.texnomart.uz/api/web/v1/product/accessories?id=${id}`)
      .then((res) => {
        if (res.data.data.data.length > 0) {
          setAccsesuarlar(res.data.data.data);
        }
      })
      .catch((err) => console.error("API xatosi:", err));
  }, [id]);

  return (
    <div className="">
      {accsesuarlar.length === 0 ? (
        <p></p>
      ) : (
        <>
          <div className="flex gap-4">
            {accsesuarlar.map((acc, index) => {
              return (
                <div
                  key={acc.id} // Use a unique key from the acc object
                  className="flex container text-center justify-center m-auto"
                >
                  <Button
                    onClick={() => setActivIndex(index)}
                    type={activIndex === index ? "primary" : "default"}
                  >
                    {acc.name}
                  </Button>
                </div>
              );
            })}
          </div>

          {accsesuarlar[activIndex] && accsesuarlar[activIndex].products ? (
            <div className="grid grid-cols-5 mt-10 gap-5">
              {accsesuarlar[activIndex].products.map((produkt) => (
                <CardsPage key={produkt.id} item={produkt} />
              ))}
            </div>
          ) : (
            <p>Hechnarsa topilmadi</p>
          )}
        </>
      )}
    </div>
  );
}

export default Cardaksesores;
