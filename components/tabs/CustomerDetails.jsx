import React from "react";

import formStore from "@/store/formStore";

const CustomerDetails = () => {
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
        <section className="bg-gray-100">
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
                    placeholder="inspection engineer name"
                    required=""
                    value={formValues.inspectionEngineerName}
                    onChange={(e) => {
                        // updateFormValues(
                        //     "customerDetails",
                        //     "city",
                        //     e.target.value
                        // );
                        setFormValues({
                            ...formValues,
                            inspectionEngineerName: e.target.value,
                        });
                    }}
                />
            </div>

            <br />
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    City
                </label>
                <input
                    type="string"
                    id="city"
                    name="city"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="city"
                    required=""
                    value={formValues?.customerDetails?.city}
                    onChange={(e) => {
                        updateFormValues(
                            "customerDetails",
                            "city",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="leadId"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Lead id
                </label>
                <input
                    type="string"
                    id="leadId"
                    name="leadId"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="Lead id"
                    required=""
                    value={formValues?.customerDetails?.leadId}
                    onChange={(e) => {
                        updateFormValues(
                            "customerDetails",
                            "leadId",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="carLocation"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Car Location
                </label>
                <input
                    type="string"
                    id="carLocation"
                    name="carLocation"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="Car Location"
                    required=""
                    value={formValues?.customerDetails?.carLocation}
                    onChange={(e) => {
                        updateFormValues(
                            "customerDetails",
                            "carLocation",
                            e.target.value
                        );
                    }}
                />
            </div>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="registerationNumber"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Registeration Number
                </label>
                <input
                    type="string"
                    id="registerationNumber"
                    name="registerationNumber"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1"
                    placeholder="registerationNumber"
                    required=""
                    value={formValues?.customerDetails?.registerationNumber}
                    onChange={(e) => {
                        updateFormValues(
                            "customerDetails",
                            "registerationNumber",
                            e.target.value
                        );
                    }}
                />
            </div>
        </section>
    );
};

export default CustomerDetails;
