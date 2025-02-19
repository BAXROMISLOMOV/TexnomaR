import { create } from "zustand";
const useMyStore = create(() => {
  return {
    produkts: [],
    cards: [],
    savatcha: [],
    like: [],
    haridlar: [],
    currenSort:"price",
    tartibi:false
  };
});
export default useMyStore;
