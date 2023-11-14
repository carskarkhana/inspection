import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import formStore from "@/store/formStore";
import { ColorRing } from "react-loader-spinner";
import { uploadFileToStorage } from "@/api/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import {
    
    faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

 

import { damages } from "@/data/otherData";
 

export const ImageUploader2 = ({ index, item }) => {
    const { formValues, setFormValues } = formStore();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageUploadingStarted, setImageUploadingStarted] = useState(false);

    // Use a unique identifier for each instance
    const identifier = `${item}_${index}`;

    const updateFormValues = (section, field, value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            damages: {
                ...prevFormValues.damages,
                [item]: {
                    ...prevFormValues.damages[item],
                    [field]: value,
                },
            },
        }));
    };

    const handleFileUpload = async (
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

    const handleFileChange = (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageUrl("");
        handleFileUpload(
            file,
            setImageUrl,
            setImageUploadingStarted,
            "file"
        );
    };

    const handleUploadImage = (e) => {
        e.preventDefault();
        handleFileUpload(
            selectedFile,
            setImageUrl,
            setImageUploadingStarted,
            "file"
        );
    };

    
    useEffect(() => {
        if (imageUrl) {
            // console.log("image url is: ", imageUrl);
            // console.log("form values is: ", formValues);
            // console.log("item is: ", item);
            // console.log("form values damages is: ", formValues?.damages);
            // console.log(
            //     "form values damages item is: ",
            //     formValues?.damages[item]
            // );

            // updateFormValues(item, 'photo', imageUrl);

            setFormValues({
                ...formValues,
                damages: {
                    ...formValues.damages,
                    [item]: {
                        ...formValues.damages[item],
                        photo: imageUrl,
                    },
                },
            });
        }
    }, [imageUrl]);

    // console.log("damage item: ", item);

    return (
        <div className="mb-3 mx-1 shadow-sm">
            {/* photo upload */}
            <div className="pt-1 pb-1 shadow-sm  w-[130px]     flex-col justify-center items-center mx-auto">
                <label
                    className="block text-sm   font-medium my-1 pl-1 text-gray-900"
                    htmlFor={identifier}
                >
                    <p className="text-center  w-full line-clamp-1 ">
                        {damages[item]}
                    </p>
                </label>
                <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                    <input
                        type="file"
                        id={identifier}
                        accept="image/*"
                        capture="camera"
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={handleFileChange}
                    />
                    {selectedFile || formValues?.damages?.[item]?.photo ? (
                        <Image
                            src={
                                (selectedFile &&
                                    URL.createObjectURL(selectedFile)) ||
                                formValues?.damages?.[item]?.photo
                            }
                            width={200}
                            height={200}
                            alt="image"
                            className=" w-[125px] h-[125px] object-cover rounded-lg cursor-pointer"
                            onClick={() =>
                                document.getElementById(identifier).click()
                            }
                        />
                    ) : (
                        <label
                            htmlFor={identifier}
                            className="rounded-lg  w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                        >
                            {selectedFile ||
                            formValues?.damages?.[item]?.photo ? (
                                <Image
                                    src={
                                        (selectedFile &&
                                            URL.createObjectURL(
                                                selectedFile
                                            )) ||
                                        formValues?.damages?.[item]?.[property]
                                    }
                                    width={200}
                                    height={200}
                                    alt="image"
                                    className="w-full h-48 object-cover rounded-lg"
                                    onClick={() =>
                                        document
                                            .getElementById(identifier)
                                            .click()
                                    }
                                />
                            ) : (
                                "Upload Photo"
                            )}
                        </label>
                    )}
                </div>
                <button
                    type="submit"
                    className={`px-3  w-full     mx-auto my-2 py-1   hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                        formValues?.damages?.[item]?.photo
                            ? "bg-green-500"
                            : "bg-indigo-700 "
                    }`}
                     // onClick={handleUploadImage}
                >
                    <p className="w-full  ">
                        {imageUploadingStarted
                            ? "Uploading"
                            : formValues?.damages?.[item]?.photo
                            ? "Uploaded"
                            : "Upload"}
                    </p>
                    {imageUploadingStarted ? (
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
                    {!imageUploadingStarted &&
                        formValues?.damages?.[item]?.photo && (
                            <FontAwesomeIcon
                                icon={faCheckDouble}
                                style={{ color: "#00ff11" }}
                                className="w-[20px] h-[20px] ml-2"
                            />
                        )}
                </button>
            </div>
        </div>
    );
};