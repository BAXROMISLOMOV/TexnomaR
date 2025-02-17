import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Card/Cards";

import Categories from "./minicards/Catigores";
import Corusel from "./Corusel/Corusel";

function  HomePage() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      axios.get("https://apqi.example.com/data")
        .then((response) => setData(response.data))
        .catch((error) => console.error("Xatolik:", error));
    }, []);
  
    return (
      <div className="app-container">
        <Corusel/>
        <Categories/> 
        <Cards/>
      </div>
    );
  }
  
  export default HomePage;