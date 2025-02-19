import { useState, useEffect } from "react";
import axios from "axios";
import SortDown from "../../Icons/SortDown";

function SortButton({ name, sortValue, currentSort, setCurrentSort }) {
  return (
    <div
      className="flex gap items-center border border-yellow-400 rounded p-1 select-none cursor-pointer"
      onClick={() => setCurrentSort(sortValue)}
    >
      <span>{name}</span>
      {currentSort === sortValue ? <SortDown className="w-0.5 h-0.5" /> : null}
    </div>
  );
}

function SortButtons() {
  const [currentSort, setCurrentSort] = useState("-price");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=smartfony&sort=-rating&page=1
`
      )
      .then((response) => setProducts(response.data));
  }, [currentSort]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <SortButton
          name="Narx boyicha"
          sortValue="-price"
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <SortButton
          name="Reytingi boyicha"
          sortValue="-rating"
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <SortButton
          name="Yangi Kelganlar"
          sortValue="-new"
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <SortButton
          name="Ommabopligi boyicha"
          sortValue="-popular"
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
      </div>

      <div></div>
    </div>
  );
}

export default SortButtons;
