import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ColorRing } from "react-loader-spinner";

import formStore from "@/store/formStore";
import carDetailsStore from "@/store/carDetailsStore";

import { uploadFileToStorage } from "@/api/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faPlus } from "@fortawesome/free-solid-svg-icons";

import { InspectionDropdown } from "./helper/carDetails-comp-dropdowns/InspectionDropdown";
import { CirtificateBadDropdown } from "./helper/carDetails-comp-dropdowns/CirtificateBadDropdown";
import { RegisteredStateDropdown } from "./helper/carDetails-comp-dropdowns/RegisteredStateDropdown";
import { BrandDropdown } from "./helper/carDetails-comp-dropdowns/BrandDropdown";
import { ModelDropdown } from "./helper/carDetails-comp-dropdowns/ModelDropdown";
import { FuelDropdown } from "./helper/carDetails-comp-dropdowns/FuelDropdown";
import { TransmissionDropdown } from "./helper/carDetails-comp-dropdowns/TransmissionDropdown";
import { OwnersDropdown } from "./helper/carDetails-comp-dropdowns/OwnersDropdown";
import { RoadTaxDropdown } from "./helper/carDetails-comp-dropdowns/RoadTaxDropdown";
import { KeysDropdown } from "./helper/carDetails-comp-dropdowns/KeysDropdown";

// ******************** MAIN COMPONENT ********************
const CarDetails = () => {
    const { formValues, setFormValues } = formStore();
    const {
        selectedVinFile,
        setSelectedVinFile,
        vinUrl,
        setVinUrl,
        vinUploadingStarted,
        setVinUploadingStarted,

        selectedCirtificateFile,
        setSelectedCirtificateFile,
        cirtificateUrl,
        setCirtificateUrl,
        cirtificate,
        setCirtificate,
        cirtificateUploadingStarted,
        setCirtificateUploadingStarted,

        chassisUrl,
        setChassisUrl,
        chassis,
        setChassis,
        selectedChassisFile,
        setSelectedChassisFile,

        chassisUploadingStarted,
        setChassisUploadingStarted,
    } = carDetailsStore();

    const updateFormValues = (objectName, field, value) => {
        setFormValues({
            ...formValues,
            [objectName]: {
                ...formValues[objectName],
                [field]: value,
            },
        });
    };

    const handleCirtificate = (value) => {
        setCirtificate({
            ...cirtificate,
            condition: value,
            remarks: value,
        });
    };
    const updateChassisNumber = (value) => {
        setChassis({
            ...chassis,
            number: value,
        });
    };

    // Shared function to handle file selection and upload
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
                console.log(`${type} available at`, downloadURL);
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

    const handleCirtificateFileChange = (event) => {
        event.preventDefault();

        // const files = Array.from(event.target.files);
        // setSelectedCirtificateFile(files);
        // setCirtificateUrl([]);

        // console.log("files are : ", files);
        // console.log("selectedCirtificateFile are : ", selectedCirtificateFile);
        // // when i want to upload image to firebase as soon as it is selected
        // handleMultipleFileUpload(
        //     files,
        //     setCirtificateUrl,
        //     setCirtificateUploadingStarted,
        //     "Certificate"
        // );

        setChassisUrl("");

        const file = event.target.files[0];

        if (file) {
            setCirtificateUploadingStarted(true);

            try {
                uploadFileToStorage(file).then((downloadURL) => {
                    setCirtificateUrl([...cirtificateUrl, downloadURL]);
                    console.log(` available at`, downloadURL);
                    console.log("cirtificateUrl: ", cirtificateUrl);
                });
            } catch (error) {
                toast.error(`Error uploading : ${error.message}`);
            } finally {
                setCirtificateUploadingStarted(false);
            }
        } else {
            setCirtificateUploadingStarted(false);
            toast.warning(`Please select a file first.`);
        }
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

    // ***************************************************

    const handleMultipleFileUpload = async (
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

    const handleUploadCirtificate = (e) => {
        e.preventDefault();
        handleMultipleFileUpload(
            selectedCirtificateFile,
            setCirtificateUrl,
            setCirtificateUploadingStarted,
            "Certificate"
        );
    };

    // **************************************************************

    // Chassis picture section
    const handleChassisFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        setSelectedChassisFile(file);

        setChassisUrl("");
        handleFileUpload(
            file,
            setChassisUrl,
            setChassisUploadingStarted,
            "Chassis Photo"
        );
    };
    const handleVinFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        setSelectedVinFile(file);

        setVinUrl("");
        handleFileUpload(file, setVinUrl, setVinUploadingStarted, "VIN Photo");
    };
    // useEffect(() => {
    //     console.log("selectedChassisFile: ", selectedChassisFile);
    // }, [selectedChassisFile]);

    const handleUploadChassis = (e) => {
        e.preventDefault();
        handleFileUpload(
            selectedChassisFile,
            setChassisUrl,
            setChassisUploadingStarted,
            "Chassis Photo"
        );
    };

    useEffect(() => {
        updateFormValues("carDetails", "registerationCirtificate", cirtificate);
    }, [cirtificate]);

    useEffect(() => {
        updateFormValues("carDetails", "chassis", chassis);
    }, [chassis]);

    useEffect(() => {
        setChassis({
            ...chassis,
            photo: chassisUrl,
        });
        // updateFormValues("carDetails", "chassis", {
        //     ...formValues.carDetails.chassis,
        //     photo: chassisUrl,

        // });
    }, [chassisUrl]);
    useEffect(() => {
        setCirtificate({
            ...cirtificate,
            photo: cirtificateUrl,
        });
    }, [cirtificateUrl]);
    useEffect(() => {
        setFormValues({
            ...formValues,
            carDetails: {
                ...formValues.carDetails,
                vinPhoto: vinUrl,
            },
        });
    }, [vinUrl]);

    return (
        <section className="bg-gray-100 relative">
            {/* inspection type */}
            <div className="mb-3 mx-1 ">
                <label
                    htmlFor="inspectionType"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Inspection Type
                </label>

                <div className="  w-full">
                    <InspectionDropdown />
                </div>
            </div>

            {/* Registeration Cirtificate Condition */}
            <div className="mb-3 mx-1 shadow-md">
                <label
                    htmlFor="registerationCirtificate"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Registeration Cirtificate Condition
                </label>

                <div className="my-5 flex justify-between items-center w-full pt-1 ">
                    <button
                        onClick={() => handleCirtificate("Good")}
                        className={`px-6 py-2 rounded-lg border border-gray-300 shadow-md ${
                            formValues?.carDetails?.registerationCirtificate
                                ?.condition === "Good"
                                ? "bg-green-500 text-white"
                                : ""
                        }}`}
                    >
                        Good
                    </button>
                    <div>
                        <CirtificateBadDropdown
                            cirtificate={cirtificate}
                            setCirtificate={setCirtificate}
                        />
                    </div>
                    <button
                        className={`rounded-lg border border-gray-300 py-2 px-1 shadow-md  ${
                            cirtificate?.condition === "Not Available"
                                ? "bg-gray-500 text-white"
                                : ""
                        }}`}
                        onClick={() => handleCirtificate("Not Available")}
                    >
                        Not Available
                    </button>
                </div>
                {/* registeration picture */}

                <label
                    className="block text-sm font-medium my-1 pl-1 text-gray-900"
                    htmlFor="file_input_cirtificate "
                >
                    Registeration Cirtificate Picture
                </label>
                <div className="pt-1 pb-1 shadow-md  w-full   flex justify-center items-center mx-auto flex-col">
                    <input
                        type="file"
                        id="file_input_cirtificate"
                        accept="image/*"
                        // capture="camera"
                        capture="environment"
                        multiple // Add the 'multiple' attribute for multi-select
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={handleCirtificateFileChange}
                    />
                    <div className="flex items-center justify-end my-5">
                        {formValues?.carDetails?.registerationCirtificate?.photo
                            .length > 0
                            ? formValues?.carDetails?.registerationCirtificate?.photo.map(
                                  (item, index) => (
                                      <Image
                                          key={index}
                                          src={item}
                                          width={70}
                                          height={70}
                                          alt="cirtificate Image"
                                          className="  h-[70px] px-1 object-cover rounded-lg"
                                      />
                                  )
                              )
                            : ""}
                        <div
                            className="w-[60px] h-[60px] border-2 box-content border-sky-500 mx-auto rounded-md justify-center items-center flex cursor-pointer"
                            onClick={() =>
                                document
                                    .getElementById("file_input_cirtificate")
                                    .click()
                            }
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                style={{ color: "#005eff" }}
                                className="w-[40px] h-[40px]"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`px-3 mx-auto my-2 py-1 cursor-text  hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                            formValues?.carDetails?.registerationCirtificate
                                ?.photo.length > 0
                                ? "bg-green-500"
                                : "bg-indigo-700 "
                        }`}
                        // onClick={handleUploadCirtificate}
                    >
                        <p>
                            {cirtificateUploadingStarted
                                ? "Uploading"
                                : formValues?.carDetails
                                      ?.registerationCirtificate?.photo.length >
                                  0
                                ? "Uploaded"
                                : "Upload"}
                        </p>
                        {cirtificateUploadingStarted ? (
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
                        {!cirtificateUploadingStarted &&
                            formValues?.carDetails?.registerationCirtificate
                                ?.photo.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    style={{ color: "#00ff11" }}
                                    className="w-[20px] h-[20px] ml-2"
                                />
                            )}
                    </button>
                </div>
            </div>
            {/* **************************************************************************************** */}
            {/* Registered State */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="registeredState"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Registered State
                </label>
                <RegisteredStateDropdown />
            </div>

            {/* registeration date */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="registerationDate"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Registeration date
                </label>
                <input
                    type="month"
                    // Set the maximum year
                    id="registerationDate"
                    name="registerationDate"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="month-year"
                    required=""
                    value={formValues?.carDetails?.registerationDate}
                    onChange={(e) => {
                        // Ensure that the value is within the specified range
                        // if (e.target.value >= 1900 && e.target.value <= 2099) {
                        //     const newYear = e.target.value;
                        //     // Convert the selected year to a full date (e.g., January 1st of the selected year)
                        //     const newDate = new Date(newYear, 0, 1);
                        //     updateFormValues(
                        //         "carDetails",
                        //         "registerationDate",
                        //         newDate.toISOString()
                        //     );
                        // }
                        updateFormValues(
                            "carDetails",
                            "registerationDate",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* vin number */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="vinNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    VIN Number
                </label>
                <input
                    type="string"
                    id="vinNumber"
                    name="vinNumber"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="VIN number"
                    required=""
                    value={formValues?.carDetails?.vinNumber}
                    // updating vinNumber
                    onChange={(e) => {
                        setFormValues({
                            ...formValues,
                            carDetails: {
                                ...formValues.carDetails,
                                vinNumber: e.target.value,
                            },
                        });
                    }}
                />
            </div>
            {/* vinNumber plate pic upload */}

            {/* // selectedVinFile,
    //     setSelectedVinFile,
    //     vinUrl,
    //     setVinUrl,
    //     vinUploadingStarted,
    //     setVinUploadingStarted,
     */}
            <div className="pt-1 pb-1 shadow-md  w-full   flex-col justify-center items-center mx-auto">
                <label
                    className="block text-sm font-medium my-1 pl-1 text-gray-900"
                    htmlFor="file_input_vin"
                >
                    VIN plate picture
                </label>
                <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                    <input
                        type="file"
                        id="file_input_vin"
                        accept="image/*"
                        // capture="camera"
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={handleVinFileChange}
                    />
                    {selectedVinFile ? (
                        <Image
                            src={URL.createObjectURL(selectedVinFile)}
                            width={200}
                            height={200}
                            alt="vin Image"
                            className=" w-[125px] h-[125px] object-cover rounded-lg cursor-pointer"
                            onClick={() =>
                                document
                                    .getElementById("file_input_vin")
                                    .click()
                            }
                        />
                    ) : (
                        <label
                            htmlFor="file_input_vin"
                            className="rounded-lg  w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                        >
                            {selectedVinFile ? (
                                <Image
                                    src={URL.createObjectURL(selectedVinFile)}
                                    width={200}
                                    height={200}
                                    alt="vin Image"
                                    className="w-full h-48 object-cover rounded-lg"
                                    onClick={() =>
                                        document
                                            .getElementById("file_input_vin")
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
                    className={`px-3 mx-auto my-2 py-1  cursor-text  hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                        formValues?.carDetails?.vinPhoto
                            ? "bg-green-500"
                            : "bg-indigo-700 "
                    }`}
                    // onClick={handleUploadChassis}
                >
                    <p>
                        {vinUploadingStarted
                            ? "Uploading"
                            : vinUrl
                            ? "Uploaded"
                            : "Upload"}
                    </p>
                    {vinUploadingStarted ? (
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
                    {!vinUploadingStarted && vinUrl && (
                        <FontAwesomeIcon
                            icon={faCheckDouble}
                            style={{ color: "#00ff11" }}
                            className="w-[20px] h-[20px] ml-2"
                        />
                    )}
                </button>
            </div>
            {/* Chassis number */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="chassisNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Chassis Number
                </label>
                <input
                    type="string"
                    id="chassisNumber"
                    name="chassisNumber"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="chassisNumber"
                    required=""
                    value={formValues?.carDetails?.chassis?.number}
                    onChange={(e) => {
                        updateChassisNumber(e.target.value);
                    }}
                />
            </div>
            {/* chassis number pic upload */}
            <div className="pt-1 pb-1 shadow-md  w-full   flex-col justify-center items-center mx-auto">
                <label
                    className="block text-sm font-medium my-1 pl-1 text-gray-900"
                    htmlFor="file_input_chassis"
                >
                    Chassis picture
                </label>
                <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                    <input
                        type="file"
                        id="file_input_chassis"
                        accept="image/*"
                        // capture="camera"
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={handleChassisFileChange}
                    />
                    {selectedChassisFile ? (
                        <Image
                            src={URL.createObjectURL(selectedChassisFile)}
                            width={200}
                            height={200}
                            alt="chassis Image"
                            className=" w-[125px] h-[125px] object-cover rounded-lg cursor-pointer"
                            onClick={() =>
                                document
                                    .getElementById("file_input_chassis")
                                    .click()
                            }
                        />
                    ) : (
                        <label
                            htmlFor="file_input_chassis"
                            className="rounded-lg  w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                        >
                            {selectedChassisFile ? (
                                <Image
                                    src={URL.createObjectURL(
                                        selectedChassisFile
                                    )}
                                    width={200}
                                    height={200}
                                    alt="chassis Image"
                                    className="w-full h-48 object-cover rounded-lg"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "file_input_chassis"
                                            )
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
                    className={`px-3 mx-auto my-2 py-1 cursor-text   hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                        formValues?.carDetails?.chassis?.photo
                            ? "bg-green-500"
                            : "bg-indigo-700 "
                    }`}
                    // onClick={handleUploadChassis}
                >
                    <p>
                        {chassisUploadingStarted
                            ? "Uploading"
                            : chassisUrl
                            ? "Uploaded"
                            : "Upload"}
                    </p>
                    {chassisUploadingStarted ? (
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
                    {!chassisUploadingStarted && chassisUrl && (
                        <FontAwesomeIcon
                            icon={faCheckDouble}
                            style={{ color: "#00ff11" }}
                            className="w-[20px] h-[20px] ml-2"
                        />
                    )}
                </button>
            </div>

            {/* Engine number */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="engineNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Engine Number
                </label>
                <input
                    type="string"
                    id="engineNumber"
                    name="engineNumber"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="engineNumber"
                    required=""
                    value={formValues?.carDetails?.engineNumber}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "engineNumber",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* Make  brand*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="brand"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Make / Brand
                </label>
                <BrandDropdown />
            </div>
            {/* Model */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="model"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Model
                </label>
                <ModelDropdown />
            </div>

            {/* registeratoin year */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="registerationYear"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Registeration Year
                </label>
                <input
                    type="number"
                    id="registerationYear"
                    name="registerationYear"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder=" "
                    required=""
                    value={formValues?.carDetails?.registerationYear}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "registerationYear",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* Variant */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="variant"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Variant
                </label>
                <input
                    type="string"
                    id="variant"
                    name="variant"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="variant"
                    required=""
                    value={formValues?.carDetails?.carVariant}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "carVariant",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* fuel type */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="fuelType"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Fuel Type
                </label>

                <div className="  w-full">
                    <FuelDropdown />
                </div>
            </div>
            {/* transmission */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="transmission"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Transmission
                </label>

                <div className="  w-full">
                    <TransmissionDropdown />
                </div>
            </div>

            {/* mileage */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="mileage"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Mileage
                </label>
                <input
                    type="number"
                    id="mileage"
                    name="mileage"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="mileage"
                    required=""
                    value={formValues?.carDetails?.mileage}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "mileage",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* manufacture date */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="manufactureDate"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Manufacture Date
                </label>
                <input
                    type="date"
                    id="manufactureYear"
                    name="manufactureYear"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="YYYY"
                    required=""
                    value={formValues?.carDetails?.manufactureDate}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "manufactureDate",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* car body type */}

            {/* cubic capacity */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="cubicCapacity"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Cubic Capacity{" "}
                    <span className="text-xs text-gray-500">[400 - 9999]</span>
                </label>
                <input
                    type="number"
                    id="cubicCapacity"
                    name="cubicCapacity"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="cubicCapacity"
                    required=""
                    min={400}
                    max={9999}
                    value={formValues?.carDetails?.cubicCapacity}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "cubicCapacity",
                            e.target.value
                        );
                    }}
                />
            </div>

            {/* number of owners */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="numberOfOwners"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Number of owners
                </label>
                <div className="  w-full">
                    <OwnersDropdown />
                </div>
            </div>

            {/* road tax paid */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="roadTaxPaid"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Road Tax Paid
                </label>

                <div className="  w-full">
                    <RoadTaxDropdown />
                </div>
            </div>

            {/* road tax validity date */}
            {/* <div className="mb-3 mx-1">
                <label
                    htmlFor="roadTaxValidityDate"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Road Tax Validity Date
                </label>
                <input
                    type="date"
                    id="roadTaxValidityDate"
                    name="roadTaxValidityDate"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="dd/mm/yyyy"
                    required=""
                    value={formValues?.carDetails?.roadTaxValidityDate}
                    onChange={(e) => {
                        updateFormValues(
                            "carDetails",
                            "roadTaxValidityDate",
                            e.target.value
                        );
                    }}
                />
            </div> */}

            {/* number of keys */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="numberOfKeys"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Number of keys
                </label>
                <KeysDropdown />
            </div>
        </section>
    );
};

export default CarDetails;
