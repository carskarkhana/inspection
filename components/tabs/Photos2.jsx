import React, { useState, useEffect } from "react";
import formStore from "@/store/formStore";
import { toast } from "react-toastify";

import { ColorRing } from "react-loader-spinner";

import { uploadFileToStorage } from "@/api/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const Photos = () => {
    const { formValues, setFormValues } = formStore();

    const updateFormValues = (objectName, field, value) => {
        setFormValues({
            ...formValues,
            [objectName]: {
                ...formValues[objectName],
                [field]: value,
            },
        });
    };

    const [selectedCarPhotosFiles, setSelectedCarPhotosFiles] = useState([]);
    const [photosUrls, setPhotosUrls] = useState([]);
    const [insuranceUploadingStarted, setInsuranceUploadingStarted] =
        useState(false);

    const handleFileUpload = async (
        files, // Array of files to upload
        setFileUrls, // Function to set the download URLs in state
        setUploadingStarted, // Function to control uploading state
        type // Type of files being uploaded
    ) => {
        // Start the uploading process
        setUploadingStarted(true);

        try {
            // Create an array of promises for uploading each file
            const uploadPromises = files.map(async (file) => {
                // Upload the file and get its download URL
                const downloadURL = await uploadFileToStorage(file);
                return downloadURL;
            });

            // Wait for all uploads to complete
            const downloadURLs = await Promise.all(uploadPromises);

            // Set the download URLs in state
            setFileUrls(downloadURLs);

            // Display a success message
            toast.success(`${type}s uploaded successfully`);
        } catch (error) {
            // Handle any errors during the upload
            toast.error(`Error uploading ${type}s: ${error.message}`);
        } finally {
            // Finish the uploading process
            setUploadingStarted(false);
        }
    };

    const handleImagesChange = (event) => {
        const files = event.target.files;
        setSelectedCarPhotosFiles(Array.from(files));
        setPhotosUrls([]);
    };

    const handleUploadInsurance = (e) => {
        e.preventDefault();
        if (selectedCarPhotosFiles.length < 10) {
            toast.error("Please select at least 10 photos");
            return;
        }
        handleFileUpload(
            selectedCarPhotosFiles,
            setPhotosUrls,
            setInsuranceUploadingStarted,
            "Insurance Photo"
        );
    };

    useEffect(() => {
        updateFormValues("carPhotos", "photos", {
            ...formValues.carPhotos,
            photos: photosUrls,
        });
    }, [photosUrls]);

    return (
        <section>
            {/* car photos */}
            <div className="mb-3 mx-1 shadow-md">
                <div className="pt-1 shadow-md">
                    <label
                        className="block text-sm font-medium my-1 pl-1 text-gray-900"
                        htmlFor="file_input"
                    >
                        Car photos
                        <span className="text-xs text-gray-500">
                            [at least 10]
                        </span>
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100"
                        id="file_input"
                        type="file"
                        accept=" image/*, application/pdf"
                        onChange={handleImagesChange}
                        multiple // Allow multiple file selection
                    />
                    <button
                        type="submit"
                        className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                        onClick={handleUploadInsurance}
                    >
                        <p>
                            {insuranceUploadingStarted
                                ? "Uploading"
                                : photosUrls.length
                                ? "Uploaded"
                                : "Upload"}
                        </p>
                        {insuranceUploadingStarted ? (
                            <div className="ml-3">
                                <ColorRing
                                    visible={true}
                                    height="25"
                                    width="25"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={[
                                        "#e15b64",
                                        "#f47e60",
                                        "#f8b26a",
                                        "#abbd81",
                                        "#849b87",
                                    ]}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {!insuranceUploadingStarted &&
                            photosUrls.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    style={{ color: "#00ff11" }}
                                    className="w-[20px] h-[20px] ml-2"
                                />
                            )}
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <label
                        htmlFor="remarks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Comments on car condition
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            setFormValues({
                                ...formValues,
                                carPhotos: {
                                    ...formValues.carPhotos,
                                    remarks: e.target.value,
                                },
                            });
                        }}
                        value={formValues?.carPhotos?.remarks}
                        placeholder="Write your remarks here..."
                        defaultValue={""}
                    />
                </div>
            </div>
        </section>
    );
};

export default Photos;
