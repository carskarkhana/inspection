import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import { ColorRing } from "react-loader-spinner";

import {
    monthsData,
    registeredStatesData,
    brandModels,
} from "@/data/otherData";

import formStore from "@/store/formStore";
import carDetailsStore from "@/store/carDetailsStore";

import { uploadFileToStorage } from "@/api/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const InspectionDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "inspectionType", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.inspectionType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Inspection Type" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Inspection Type</SelectLabel>
                    <SelectItem value="home">Home Inspection</SelectItem>
                    <SelectItem value="office">Office Inspection</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const CirtificateBadDropdown = ({ cirtificate, setCirtificate }) => {
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

    const handleCirtificate = (remark) => {
        setCirtificate({
            ...cirtificate,
            condition: "Bad",
            remarks: remark,
        });
    };
    useEffect(() => {
        updateFormValues("carDetails", "registerationCirtificate", cirtificate);
    }, [cirtificate]);

    return (
        <Select
            onValueChange={(remark) => {
                handleCirtificate(remark);
            }}
            className="w-full"
            // defaultValue={
            //     formValues?.carDetails?.registerationCirtificate?.remarks ||
            //     "Bad"
            // }
        >
            <SelectTrigger
                className={`pl-3 rounded-lg border border-none shadow-md    text-sm   w-[100px] ull px-3 outline-none line-clamp-1 ${
                    formValues?.carDetails?.registerationCirtificate
                        ?.condition === "Bad"
                        ? "bg-red-500"
                        : ""
                }`}
            >
                <SelectValue
                    placeholder={
                        formValues?.carDetails?.registerationCirtificate
                            ?.condition === "Bad"
                            ? formValues?.carDetails?.registerationCirtificate
                                  ?.remarks
                            : "Bad"
                    }
                />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Remarks</SelectLabel>
                    <SelectItem value="Missing">Missing</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                    <SelectItem value="Photocopy">Photocopy</SelectItem>

                    <SelectItem value="Official duplicate">
                        Official duplicate
                    </SelectItem>
                    <SelectItem value="Faded">Faded</SelectItem>
                    <SelectItem value="Has Clerical Errors">
                        Has Clerical Errors
                    </SelectItem>
                    <SelectItem value="Chip Missing">Chip Missing</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const SearchForState = ({ searchQuery, handleSearchChange }) => {
    return (
        <input
            type="text"
            placeholder="Search State"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded mb-2"
            onFocus={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        />
    );
};

const RegisteredStateDropdown = () => {
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

    // State variables for search functionality
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        event.preventDefault();
        const query = event.target.value;
        setSearchQuery(query);

        // Filter the states based on the search query
        const filtered = registeredStatesData.filter(
            (item) =>
                item.state.toLowerCase().includes(query.toLowerCase()) ||
                query.toLowerCase().includes(item.rtoCode.toLowerCase())
        );
        setFilteredStates(filtered);
    };
    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "registeredState", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.registeredState}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Registered State" />
            </SelectTrigger>
            <SelectContent className="w-[100vw] mx-auto left-0 top-0 absolute h-[40vh] overflow-scroll">
                <SelectGroup className="">
                    <SelectLabel>Registered State</SelectLabel>
{/* 
                    <input
                        type="text"
                        placeholder="Search State"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full p-2 border rounded mb-2"
                        onFocus={(e) => {
                            e.preventDefault();
                        }}
                        onFocusCapture={(e) => {
                            e.preventDefault();
                        }}
                    /> */}

                    {searchQuery === ""
                        ? registeredStatesData.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                  {item.state} - {item.rtoCode}
                              </SelectItem>
                          ))
                        : filteredStates.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                  {item.state} - {item.rtoCode}
                              </SelectItem>
                          ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const BrandDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "carBrand", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.carBrand}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Brand</SelectLabel>

                    {Object.keys(brandModels).map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ModelDropdown = () => {
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

    // Get the selected car brand from formValues
    const selectedCarBrand = formValues?.carDetails?.carBrand;

    // Get the models based on the selected car brand
    const models = selectedCarBrand ? brandModels[selectedCarBrand] : [];

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "carModel", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.carModel}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Car Models " />
            </SelectTrigger>
            {models.length > 0 ? (
                <SelectContent className="w-full h-[40vh] overflow-scroll">
                    <SelectGroup>
                        <SelectLabel>Car Models</SelectLabel>

                        {models.map((item, index) => (
                            <SelectItem key={index} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            ) : (
                <SelectContent>
                    <p className="text-red-500 font-bold">
                        first select a brand
                    </p>
                </SelectContent>
            )}
        </Select>
    );
};

const FuelDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "fuelType", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.fuelType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Fuel Type</SelectLabel>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Petrol + CNG">Petrol + CNG</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const TransmissionDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "transmission", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.transmission}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Transmission Type" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Transmission Type</SelectLabel>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const RoadTaxDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "roadTaxPaid", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.roadTaxPaid}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Road Tax Paid" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Road Tax Paid</SelectLabel>
                    <SelectItem value="Life Time">Yes - Life Time</SelectItem>
                    <SelectItem value="Yes - Limited">Yes - Limited</SelectItem>
                    <SelectItem value="No - Tax Validity Expired">
                        No - Tax Validity Expired
                    </SelectItem>
                    <SelectItem value="Tax Exempted">
                        No - Tax Exempted
                    </SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const OwnersDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "numberOfOwners", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.numberOfOwners}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of owners" />
            </SelectTrigger>
            <SelectContent className="w-full   overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Number of owners</SelectLabel>
                    <SelectItem value="1">1st </SelectItem>
                    <SelectItem value="2">2nd </SelectItem>
                    <SelectItem value="3">3rd </SelectItem>
                    <SelectItem value="4">4th </SelectItem>
                    <SelectItem value="5">5th </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const KeysDropdown = () => {
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

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "numberOfKeys", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.numberOfKeys}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of keys" />
            </SelectTrigger>
            <SelectContent className="w-full h-[95vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Number of keys</SelectLabel>
                    <SelectItem value="Single">Single </SelectItem>
                    <SelectItem value="Both">Both </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
// ******************** MAIN COMPONENT ********************
const CarDetails = () => {
    const { formValues, setFormValues } = formStore();
    const {
        selectedCirtificateFile,
        setSelectedCirtificateFile,
        selectedChassisFile,
        setSelectedChassisFile,
        cirtificateUrl,
        setCirtificateUrl,
        chassisUrl,
        setChassisUrl,
        chassis,
        setChassis,
        cirtificate,
        setCirtificate,
        cirtificateUploadingStarted,
        setCirtificateUploadingStarted,
        chassisUploadingStarted,
        setChassisUploadingStarted,
    } = carDetailsStore();

    // const [selectedChassisFile, setSelectedChassisFile] = useState("");
    // const [cirtificateUrl, setCirtificateUrl] = useState("");
    // const [chassisUrl, setChassisUrl] = useState("");
    // const [chassis, setChassis] = useState({
    //     number: "",
    //     photo: "",
    // });
    // const [cirtificate, setCirtificate] = useState({
    //     condition: "",
    //     remarks: "",
    //     photo: "",
    // });

    // const [cirtificateUploadingStarted, setCirtificateUploadingStarted] =
    //     useState(false);
    // const [chassisUploadingStarted, setChassisUploadingStarted] =
    //     useState(false);

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

    // Certificate picture section
    const handleCirtificateFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedCirtificateFile(file);
        setCirtificateUrl("");
    };

    const handleUploadCirtificate = (e) => {
        e.preventDefault();
        handleFileUpload(
            selectedCirtificateFile,
            setCirtificateUrl,
            setCirtificateUploadingStarted,
            "Certificate"
        );
    };

    // Chassis picture section
    const handleChassisFileChange = (event) => {
        const file = event.target.files[0];
        console.log("file: ", file);
        setSelectedChassisFile(file);

        setChassisUrl("");
    };
    useEffect(() => {
        console.log("selectedChassisFile: ", selectedChassisFile);
    }, [selectedChassisFile]);

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

                <div className=" flex justify-between items-center w-full pt-1 ">
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
                <div className="pt-1 pb-1 shadow-md  w-full   flex-col justify-center items-center mx-auto">
                    <label
                        className="block text-sm font-medium my-1 pl-1 text-gray-900"
                        htmlFor="file_input_cirtificate"
                    >
                        Registeration Cirtificate Picture
                    </label>
                    <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                        <input
                            type="file"
                            id="file_input_cirtificate"
                            accept="image/*"
                            // capture="camera"
                            className="w-0 h-0 opacity-0 absolute"
                            onChange={handleCirtificateFileChange}
                        />
                        {selectedCirtificateFile ? (
                            <Image
                                src={URL.createObjectURL(
                                    selectedCirtificateFile
                                )}
                                width={200}
                                height={200}
                                alt="cirtificate Image"
                                className=" w-[125px] h-[125px] object-cover rounded-lg cursor-pointer"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "file_input_cirtificate"
                                        )
                                        .click()
                                }
                            />
                        ) : (
                            <label
                                htmlFor="file_input_cirtificate"
                                className="rounded-lg  w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                            >
                                {selectedCirtificateFile ? (
                                    <Image
                                        src={URL.createObjectURL(
                                            selectedCirtificateFile
                                        )}
                                        width={200}
                                        height={200}
                                        alt="cirtificate Image"
                                        className="w-full h-48 object-cover rounded-lg"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "file_input_cirtificate"
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
                        className={`px-3 mx-auto my-2 py-1   hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                            formValues?.carDetails?.registerationCirtificate
                                ?.photo
                                ? "bg-green-500"
                                : "bg-indigo-700 "
                        }`}
                        onClick={handleUploadCirtificate}
                    >
                        <p>
                            {cirtificateUploadingStarted
                                ? "Uploading"
                                : cirtificateUrl
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
                        {!cirtificateUploadingStarted && cirtificateUrl && (
                            <FontAwesomeIcon
                                icon={faCheckDouble}
                                style={{ color: "#00ff11" }}
                                className="w-[20px] h-[20px] ml-2"
                            />
                        )}
                    </button>
                </div>
            </div>

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
                    type="date"
                    // Set the maximum year
                    id="registerationDate"
                    name="registerationDate"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder=" "
                    required=""
                    value={
                        formValues?.carDetails?.registerationDate
                            ? new Date(
                                  formValues.carDetails.registerationDate
                              ).getFullYear()
                            : ""
                    }
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
                    className={`px-3 mx-auto my-2 py-1   hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                        formValues?.carDetails?.chassis?.photo
                            ? "bg-green-500"
                            : "bg-indigo-700 "
                    }`}
                    onClick={handleUploadChassis}
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
                    value={
                        formValues?.carDetails?.manufactureDate
                            ? new Date(
                                  formValues.carDetails.manufactureDate
                              ).getFullYear()
                            : ""
                    }
                    onChange={(e) => {
                        // Ensure that the value is within the specified range
                        if (e.target.value >= 1900 && e.target.value <= 2099) {
                            const newYear = e.target.value;
                            // Convert the selected year to a full date (e.g., January 1st of the selected year)
                            const newDate = new Date(newYear, 0, 1);
                            updateFormValues(
                                "carDetails",
                                "manufactureDate",
                                newDate.toISOString()
                            );
                        }
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
