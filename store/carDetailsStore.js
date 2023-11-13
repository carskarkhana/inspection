import { create } from "zustand";
import { formData } from "@/data/formData";

const carDetailsStore = create((set) => ({
  

    selectedVinFile: "",
    setSelectedVinFile: (file) => set({ selectedVinFile: file }),
    vinUrl: "",
    setVinUrl: (url) => set({ vinUrl: url }),
    vinUploadingStarted: false,
    setVinUploadingStarted: (bool) => set({ vinUploadingStarted: bool }),

    selectedCirtificateFile: [],
    setSelectedCirtificateFile: (file) =>
        set({ selectedCirtificateFile: file }),

    selectedChassisFile: "",
    setSelectedChassisFile: (file) => set({ selectedChassisFile: file }),

    cirtificateUrl: [],
    setCirtificateUrl: (url) => set({ cirtificateUrl: url }),

    chassisUrl: "",
    setChassisUrl: (url) => set({ chassisUrl: url }),

    chassis: {
        number: "",
        photo: "",
    },

    setChassis: (ch) => set({ chassis: ch }),

    cirtificate: {
        condition: "",
        remarks: "",
        photo: "",
    },

    setCirtificate: (ch) => set({ cirtificate: ch }),

    cirtificateUploadingStarted: false,
    setCirtificateUploadingStarted: (bool) =>
        set({ cirtificateUploadingStarted: bool }),

    chassisUploadingStarted: false,
    setChassisUploadingStarted: (bool) =>
        set({ chassisUploadingStarted: bool }),
}));

export default carDetailsStore;
