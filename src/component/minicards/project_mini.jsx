import React, { children, useState } from "react";
import SortByUp02Icon from "../../Icons/SORTup";
import SortByDown02Icon from "../../Icons/SortDown";
import useMyStore from "../../my-zustand";

function project_mini({ name , title }) {
  const state = useMyStore();
  const { tartibi } = state;
  return (
    <div>
      <div className="flex justify-between gap-4 pb-5 select-none">
        <div
          onClick={() => {
            useMyStore.setState({
              currentSort: name,
              tartibi: !tartibi
            });
            console.log(name);
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          {title}
          <span className=" cursor-pointer">
            {state.currentSort === name ? (
              <>{tartibi ? <SortByUp02Icon /> : <SortByDown02Icon />}</>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}

export default project_mini;
