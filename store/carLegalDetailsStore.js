import { create } from "zustand";
import { formData } from "@/data/formData";

const carLegalDetailsStore = create((set) => ({
    insuranceUrl: "",
    setInsuranceUrl: (url) => set({ insuranceUrl: url }),

    insurance: {
        number: "",
        photo: "",
    },
    setInsurance: (ch) => set({ insurance: ch }),

    selectedInsuranceFile: "",
    setSelectedInsuranceFile: (file) => set({ selectedInsuranceFile: file }),

    insuranceUploadingStarted: false,
    setInsuranceUploadingStarted: (bool) =>
        set({ insuranceUploadingStarted: bool }),
}));

export default carLegalDetailsStore;
