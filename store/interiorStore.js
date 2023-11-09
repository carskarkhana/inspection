import { create } from "zustand";
import { formData } from "@/data/formData";

const carLegalDetailsStore = create((set) => ({
    checkedItems: [],
    setCheckedItems: (arr) => set({ checkedItems: arr }),
}));

export default carLegalDetailsStore;
