import React, { useState, useEffect, use } from "react";
import { toast } from "react-toastify";

import Image from "next/image";
import formStore from "@/store/formStore";
import carLegalDetailsStore from "@/store/carLegalDetailsStore";

import { ColorRing } from "react-loader-spinner";

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

const IsInsuranceDropdown = () => {
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
                if (value === "No / Bad") {
                    let obj = {
                        hasInsurance: value,
                        insuranceType: "",
                        insuranceNumber: "",
                        insuranceValidityDate: "",
                        insuranceImage: "",
                        remarks: "",
                    };
                    updateFormValues("carLegalDetails", "insurance", obj);
                } else {
                    updateFormValues("carLegalDetails", "insurance", {
                        ...formValues.carLegalDetails.insurance,
                        hasInsurance: value,
                    });
                }
            }}
            className="w-full"
            defaultValue={formValues?.carLegalDetails?.insurance?.hasInsurance}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Insurance status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Insurance status</SelectLabel>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const InsuranceTypeDropdown = () => {
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
                updateFormValues("carLegalDetails", "insurance", {
                    ...formValues.carLegalDetails.insurance,
                    insuranceType: value,
                });
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.inspectionType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Insurance Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Insurance Type</SelectLabel>
                    <SelectItem value="Zero Deprecation">
                        Zero Deprecation
                    </SelectItem>
                    <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="3rd Party">3rd Party</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

// **************** main component ****************
const CarLegalDetails = () => {
    const { formValues, setFormValues } = formStore();
    const {
        selectedInsuranceFile,
        setSelectedInsuranceFile,
        insuranceUrl,
        setInsuranceUrl,
        insuranceUploadingStarted,
        setInsuranceUploadingStarted,
    } = carLegalDetailsStore();

    const updateFormValues = (objectName, field, value) => {
        setFormValues({
            ...formValues,
            [objectName]: {
                ...formValues[objectName],
                [field]: value,
            },
        });
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
    const handleInsuranceFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedInsuranceFile(file);
         
        setInsuranceUrl("");
    };
   
    const handleUploadInsurance = (e) => {
        e.preventDefault();
        handleFileUpload(
            selectedInsuranceFile,
            setInsuranceUrl,
            setInsuranceUploadingStarted,
            "Insurance Photo"
        );
    };

    useEffect(() => {
        updateFormValues("carLegalDetails", "insurance", {
            ...formValues.carLegalDetails.insurance,
            insuranceImage: insuranceUrl,
        });
    }, [insuranceUrl]);
    return (
        <section>
            {/* has insurance */}
            <div className="mb-3 mx-1 ">
                <label
                    htmlFor="hasInsurance"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Is insurance available
                </label>

                <div className="  w-full">
                    <IsInsuranceDropdown />
                </div>
            </div>

            {/* when insurance available, renders this */}
            {formValues?.carLegalDetails?.insurance?.hasInsurance ===
                "Available" && (
                <div>
                    {/* insurance number */}
                    <div className="mb-3 mx-1">
                        <label
                            htmlFor="insuranceNumber"
                            className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                        >
                            Insurance Number
                        </label>
                        <input
                            type="string"
                            id="insuranceNumber"
                            name="insuranceNumber"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                            placeholder="insurance number"
                            required=""
                            value={
                                formValues?.carLegalDetails?.insurance
                                    ?.insuranceNumber
                            }
                            onChange={(e) => {
                                updateFormValues(
                                    "carLegalDetails",
                                    "insurance",
                                    {
                                        ...formValues.carLegalDetails.insurance,
                                        insuranceNumber: e.target.value,
                                    }
                                );
                            }}
                        />
                    </div>
                    {/* insurance type */}
                    <div className="mb-3 mx-1 ">
                        <label
                            htmlFor="insuranceType"
                            className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                        >
                            Insurance Type
                        </label>

                        <div className="  w-full">
                            <InsuranceTypeDropdown />
                        </div>
                    </div>

                    {/* insurance validity date */}
                    <div className="mb-3 mx-1">
                        <label
                            htmlFor="insuranceValidityDate"
                            className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                        >
                            Insurance Validity Date
                        </label>
                        <input
                            type="date"
                            id="insuranceValidityDate"
                            name="insuranceValidityDate"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                            placeholder="dd/mm/yyyy"
                            required=""
                            value={
                                formValues?.carLegalDetails?.insurance
                                    ?.insuranceValidityDate
                            }
                            onChange={(e) => {
                                updateFormValues(
                                    "carLegalDetails",
                                    "insurance",
                                    {
                                        ...formValues.carLegalDetails.insurance,
                                        insuranceValidityDate: e.target.value,
                                    }
                                );
                            }}
                        />
                    </div>

                    {/* insurance document picture*/}
                    <div className="mb-3 mx-1 shadow-md ">
                        <div className="pt-1 pb-1 shadow-md  w-full   flex-col justify-center items-center mx-auto">
                            <label
                                className="block text-sm font-medium my-1 pl-1 text-gray-900"
                                htmlFor="file_input"
                            >
                                Insurance document picture
                            </label>
                            <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                                <input
                                    type="file"
                                    id="file_input"
                                    accept="image/*"
                                    capture="camera"
                                    className="w-0 h-0 opacity-0 absolute"
                                    onChange={handleInsuranceFileChange}
                                />
                                {selectedInsuranceFile ? (
                                    <Image
                                        src={URL.createObjectURL(
                                            selectedInsuranceFile
                                        )}
                                        width={125}
                                        height={125}
                                        alt="Insurance Image"
                                        className="w-30 h-30 object-cover rounded-lg cursor-pointer"
                                        onClick={() =>
                                            document
                                                .getElementById("file_input")
                                                .click()
                                        }
                                    />
                                ) : (
                                    <label
                                        htmlFor="file_input"
                                        className="rounded-lg w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                                    >
                                        {selectedInsuranceFile ? (
                                            <Image
                                                src={URL.createObjectURL(
                                                    selectedInsuranceFile
                                                )}
                                                width={125}
                                                height={125}
                                                alt="Insurance Image"
                                                className="w-30 h-30 object-cover rounded-lg"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "file_input"
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
                                    formValues?.carLegalDetails?.insurance
                                        ?.insuranceImage
                                        ? "bg-green-500"
                                        : "bg-indigo-700 "
                                }`}
                                onClick={handleUploadInsurance}
                            >
                                <p>
                                    {insuranceUploadingStarted
                                        ? "Uploading"
                                        : insuranceUrl
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
                                {!insuranceUploadingStarted && insuranceUrl && (
                                    <FontAwesomeIcon
                                        icon={faCheckDouble}
                                        style={{ color: "#00ff11" }}
                                        className="w-[20px] h-[20px] ml-2"
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* finally remarks */}
            <div>
                <div>
                    <label
                        htmlFor="remarks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        comment on document
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                        onChange={(e) => {
                            updateFormValues("carLegalDetails", "insurance", {
                                ...formValues.carLegalDetails.insurance,
                                remarks: e.target.value, // Use "remarks" here
                            });
                        }}
                        value={formValues?.carLegalDetails?.insurance?.remarks} // Use "remarks" here
                        placeholder="Write your remarks here..."
                        defaultValue={""}
                    />
                </div>
            </div>
        </section>
    );
};

export default CarLegalDetails;
