import { create } from "zustand";
import { formData } from "@/data/formData";

const damageStore = create((set) => ({
    checkedItems: [],
    setCheckedItems: (arr) => set({ checkedItems: arr }),
}));

export default damageStore;
