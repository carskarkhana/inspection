import React from "react";
import formStore from "@/store/formStore";
import { monthsData, rtoStatesData } from "@/data/otherData";


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const MfgMonthDropDown = () => {
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
                updateFormValues("mfgMonth", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Manufacturing Month" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Manufacturing Month</SelectLabel>
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
const IsDuplicateKeyDropdown = () => {
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
                updateFormValues("isDuplicateKey", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Do you have uplicate key" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Duplicate key</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const IsInsuranceDropdown = () => {
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
                updateFormValues("isInsurance", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Do you have insurance" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Do you have insurance</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const IsCarScrappedDropdown = () => {
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
                updateFormValues("isCarScrapped", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Is Car Scrapped" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Is Car Scrapped</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const RtoStateDropdown = () => {
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
                updateFormValues("rtoState", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="RTO State" />
            </SelectTrigger>
            <SelectContent className="h-[50vh] w-[90vw] flex justify-center items-center overflow-scroll">
                <SelectGroup>
                    <SelectLabel>RTO State</SelectLabel>
                    {rtoStatesData.map((rto, index) => (
                        <SelectItem key={index} value={rto.rtoCode}>
                            {rto.state}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

const RTONOCIssuedDropdown = () => {
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
                updateFormValues("isRtoNocIssued", value);
            }}
            className="w-full"
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder=" Is RTO NOC Issued ?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel> Is RTO NOC Issued ?</SelectLabel>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
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
                    htmlFor="mfgMonth"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    mfgMonth
                </label>
                <MfgMonthDropDown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="inspectionPlace"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Inspection Place
                </label>
                <input
                    type="string"
                    id="inspectionPlace"
                    name="inspectionPlace"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="inspection place"
                    required=""
                    onChange={(e) => {
                        updateFormValues("inspectionPlace", e.target.value);
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isDuplicateKey"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Do you have duplicate key?
                </label>
                <IsDuplicateKeyDropdown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isInsurance"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Do you have Insurance?
                </label>
                <IsInsuranceDropdown />
            </div>
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
                    onChange={(e) => {
                        updateFormValues(
                            "insuranceValidityDate",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isCarScrapped"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Is Car Scrapped?
                </label>
                <IsCarScrappedDropdown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="rtoState"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    RTO State
                </label>
                <RtoStateDropdown />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="isRtoNocIssued"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Is RTO NOC Issued ?
                </label>
                <RTONOCIssuedDropdown />
            </div>
        </form>
    );
};

export default Form2;
