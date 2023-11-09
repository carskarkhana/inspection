import { create } from "zustand";
import { formData } from "@/data/formData"; 


const formStore = create((set) => ({

    formUploadingStarted: false,
    setFormUploadingStarted: (newState) => set({ formUploadingStarted: newState }),
    activeTab: 1,
    setActiveTab: (newTab) => set({ activeTab: newTab }),

    formValues: formData,
    setFormValues: (newValues) => set({ formValues: newValues }),

}));

export default formStore;
