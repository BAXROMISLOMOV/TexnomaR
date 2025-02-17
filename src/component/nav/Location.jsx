import React, { useEffect } from "react";
import useMyStore from "../../my-zustand";
import axios from "axios";
import { Link } from "react-router-dom";

function Location() {
  const state = useMyStore();

  useEffect(() => {
    axios
      .get("https://gw.texnomart.uz/api/web/v1/header/top-categories")
      .then((res) => {
        useMyStore.setState({
          loading: false,
          produkts: res.data.data.data,
        });
      })
      .catch((error) => {
        console.error("", error);
      });
  }, []);

  return (
    <div>
       
        <div className="flex items-center px-15 pb-5 pt-6 justify-between container m-auto">
          {state.produkts.map((item) => (
            <Link to={`/categories/${item.slug}`} key={item.id || item.slug}>
              <div className="hover:text-yellow-500 cursor-pointer">
                <p>{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}

export default Location;
