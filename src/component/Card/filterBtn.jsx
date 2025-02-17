import { useState } from "react";
import SortDown from "../../assets/Icons/SortDown";
import SortUp from "../../assets/Icons/SORTup";

function SortButton({ name, currentSort, setCurrentSort }) {
    return (
        <div 
            className="flex gap items-center border border-yellow-400 rounded p-1 select-none cursor-pointer"
            onClick={() => setCurrentSort(name)}
        >
            <span>{name}</span> 
            {currentSort === name ? <SortDown className="w-0.5 h-0,5" /> 
            : null}
          
        </div>
    );
}

function SortButtons() {
    const [currentSort, setCurrentSort] = useState("Narx boyicha");

    return (
        <div className="flex gap-2 mb-2">
            <SortButton
                name="Narx boyicha"
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
            />
            <SortButton
                name="Reytingi boyicha"
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
            />
            <SortButton
                name="Yangi Kelganlar"
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
            />
            <SortButton
                name="Ommabopligi boyicha"
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
            />
        </div>
    );
}

export default SortButtons;