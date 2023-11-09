import React from "react";
import formStore from "@/store/formStore";
import { chassisData } from "@/data/otherData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const UnderHypoDropdown = () => {
    const { formValues, setFormValues } = formStore();
    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("isUnderHypothecation", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder=" Is under hypothecation ?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Is under hypothecation ?</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const CNGlpgDropdown = () => {
    const { formValues, setFormValues } = formStore();
    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("isCngOrLpg", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="CNG LPG fitment in RC ?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>CNG LPG fitment in RC ?</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const IsRCDropdown = () => {
    const { formValues, setFormValues } = formStore();
    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("isRcAvailable", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Is RC available?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Is RC available?</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const ChassisNumDropdown = () => {
    const { formValues, setFormValues } = formStore();
    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("chassisNumberStatus", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Chassis Number" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Select Chassis Number</SelectLabel>
                    {chassisData.map((chassis, index) => (
                        <SelectItem key={index} value={chassis}>
                            {chassis}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};




const Form2 = () => {
    const { formValues, setFormValues } = formStore();

    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <form>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isUnderHypothecation"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Is under hypothecation ?
                </label>
                <UnderHypoDropdown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isCngOrLpg"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    CNG LPG fitment in RC ?
                </label>
                <CNGlpgDropdown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="carColor"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Car Color
                </label>
                <input
                    type="string"
                    id="carColor"
                    name="carColor"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder=" Car color"
                    required=""
                    onChange={(e) => {
                        updateFormValues(
                            "carColor",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="roadTaxPaid"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Road Tax Paid
                </label>
                <input
                    type="number"
                    id="roadTaxPaid"
                    name="roadTaxPaid"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="road tax paid"
                    required=""
                    onChange={(e) => {
                        updateFormValues(
                            "roadTaxPaid",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="cubicCapacity"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Cubic Capacity
                </label>
                <input
                    type="number"
                    id="cubicCapacity"
                    name="cubicCapacity"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="Cubic Capacity"
                    required=""
                    onChange={(e) => {
                        updateFormValues(
                            "cubicCapacity",
                            e.target.value
                        );
                    }}
                />
            </div>
             
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isRcAvailable"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Is RC available?
                </label>
                <IsRCDropdown />
            </div>
            
            <div className="mb-3 mx-1">
                <label
                    htmlFor="chassisNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Select Chassis Number
                </label>
                <ChassisNumDropdown />
            </div>
        </form>
    );
};

export default Form2;
