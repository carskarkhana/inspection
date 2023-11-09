"use client";
import React, { useState, useEffect } from "react";

import formStore from "@/store/formStore";
import { monthsData } from "@/data/otherData";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faV } from "@fortawesome/free-solid-svg-icons";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



// ******************dropdowns***********************
const LocationDropdown = () => {
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
                updateFormValues("inspectionLocation", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Inspection Location" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Inspection Location</SelectLabel>
                    <SelectItem value="home">Home Inspection</SelectItem>
                    <SelectItem value="office">Office Inspection</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const RegYearDropDown = () => {
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
                updateFormValues("regYear", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Registeration Year" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Registration Year</SelectLabel>
                    {Array.from({ length: 2024 - 1990 }, (_, index) => {
                        const year = 1990 + index;
                        return (
                            <div key={year}>
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            </div>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const MfgYearDropDown = () => {
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
                updateFormValues("mfgYear", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Manufacturing Year" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Manufacturing Year</SelectLabel>
                    {Array.from({ length: 2024 - 1990 }, (_, index) => {
                        const year = 1990 + index;
                        return (
                            <div key={year}>
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            </div>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
const RegMonthDropDown = () => {
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
                updateFormValues("regMonth", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Registeration Month" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Registration Month</SelectLabel>
                    {monthsData.map((month, index) => (
                        <SelectItem key={index} value={month}>
                            {month}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
 

const Form1 = () => {
    const { formValues, setFormValues } = formStore();

    const updateFormValues = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    return (
        <form className="relative">
            <div className="mb-3 mx-1">
                <label
                    htmlFor="inspectionEngineerName"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Inspection Engineer Name
                </label>
                <input
                    type="string"
                    id="inspectionEngineerName"
                    name="inspectionEngineerName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder=" name"
                    required=""
                    onChange={(e) => {
                        updateFormValues(
                            "inspectionEngineerName",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="inspectionData"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Inspection Date
                </label>
                <input
                    type="date"
                    id="inspectionData"
                    name="inspectionData"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="dd/mm/yyyy"
                    required=""
                    onChange={(e) => {
                        updateFormValues("inspectionDate", e.target.value);
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="inspectionLocation"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    inspectionLocation
                </label>

                <div className="  w-full">
                    <LocationDropdown />
                </div>
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="vehicleId"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    vehicleId
                </label>
                <input
                    type="string"
                    id="vehicleId"
                    name="vehicleId"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="Vehicle Id"
                    required=""
                    onChange={(e) => {
                        updateFormValues("vehicleId", e.target.value);
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="regNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    regNumber
                </label>
                <input
                    type="string"
                    id="vehicleId"
                    name="vehicleId"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="regNumber "
                    required=""
                    onChange={(e) => {
                        updateFormValues("regNumber", e.target.value);
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="regYear"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    regYear
                </label>
                <RegYearDropDown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="regMonth"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    regMonth
                </label>
                <RegMonthDropDown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="mfgYear"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    mfgYear
                </label>
                <MfgYearDropDown />
            </div>
        </form>
    );
};

export default Form1;
