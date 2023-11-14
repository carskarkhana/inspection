export const calculatePercentageFilled = (formData) => {
    let totalFields = 0;
    let filledFields = 0;
  
    const countFields = (data) => {
      for (const key in data) {
        const value = data[key];
        if (typeof value === 'object') {
          countFields(value);
        } else {
          totalFields++;
          if (value !== "" && value !== null && value !== undefined && value.length !== 0) {
            filledFields++;
          }
        }
      }
    };
  
    countFields(formData);
  
    const percentage = (filledFields / totalFields) * 100;
    return percentage;
  };
  
  import { toast } from "react-toastify";
import { uploadFileToStorage } from "@/api/actions";

export const handleFileUpload = async (
    file,
    setFileUrl,
    setUploadingStarted,
    type
) => {
    if (file) {
        setUploadingStarted(true);

        try {
            const downloadURL = await uploadFileToStorage(file);

            setFileUrl(downloadURL);
            // console.log(`${type} available at`, downloadURL);
        } catch (error) {
            toast.error(`Error uploading ${type}: ${error.message}`);
        } finally {
            setUploadingStarted(false);
        }
    } else {
        setUploadingStarted(false);
        toast.warning(`Please select a ${type} file first.`);
    }
};
