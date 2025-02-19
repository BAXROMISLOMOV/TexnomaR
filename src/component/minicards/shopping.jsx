import axios from "axios";
import { useEffect } from "react";
import useMyStore from "../../my-zustand";

function Haridlar({ pagination }) {
  const state = useMyStore();

  useEffect(() => {
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=smartfony&sort=-order_count&page=${pagination}`
      )
      .then((res) => {
        useMyStore.setState({
          haridlar: res.data.data.filter,
        });
      })
      .catch((error) => console.error("Failed to fetch filters:", error));
  }, [peginetion]);

  

}

export default Haridlar;
