import React from "react";

import formStore from "@/store/formStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

// ************** popup ***********
import { DickyDoorPopup } from "./helper/back-comp-popups/DickyDoorPopup";
import { RearBumperPopup } from "./helper/back-comp-popups/RearBumperPopup";
import { RearWindscreenDropdown } from "./helper/back-comp-popups/RearWindscreenDropdown";
import { SpareWheelRimDropdown } from "./helper/back-comp-popups/SpareWheelRimDropdown";
import { SpareWheelTyreDropdown } from "./helper/back-comp-popups/SpareWheelTyreDropdown";

// ********************* main component**************
const Back = () => {
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
            {/*  dicky door */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    dickydoor Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.back?.dickyDoor?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.back?.dickyDoor?.condition
                            );
                            updateFormValues("back", "dickyDoor", {
                                ...formValues.back.dickyDoor,
                                condition: "Yes / Good",
                                faults: "none",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ color: "#000000" }}
                            className="w-[20px] h-[20px] mx-1"
                        />
                        <span className="text-sm">Yes / Good</span>
                    </button>

                    <div className="rounded-md w-[50%] border border-gray-300 mx-auto ">
                        <DickyDoorPopup />
                    </div>
                </div>
            </div>
            {/* rear windscreen */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    rearWindscreen Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.back?.rearWindscreen?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.back?.rearWindscreen?.condition
                            );
                            updateFormValues("back", "rearWindscreen", {
                                ...formValues.back.rearWindscreen,
                                condition: "Yes / Good",
                                faults: "none",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ color: "#000000" }}
                            className="w-[20px] h-[20px] mx-1"
                        />
                        <span className="text-sm">Yes / Good</span>
                    </button>

                    <div className="rounded-md w-[50%] border border-gray-300 mx-auto ">
                        <RearWindscreenDropdown />
                    </div>
                </div>
            </div>

            {/*rear bumper*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    rearBumper Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.back?.rearBumper?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.back?.rearBumper?.condition
                            );
                            updateFormValues("back", "rearBumper", {
                                ...formValues.back.rearBumper,
                                condition: "Yes / Good",
                                faults: "none",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ color: "#000000" }}
                            className="w-[20px] h-[20px] mx-1"
                        />
                        <span className="text-sm">Yes / Good</span>
                    </button>

                    <div className="rounded-md w-[50%] border border-gray-300 mx-auto ">
                        <RearBumperPopup />
                    </div>
                </div>
            </div>

            {/* spare wheel rim condition */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    spare wheel rim condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.back?.spareWheelRim?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.back?.spareWheelRim?.condition
                            );
                            updateFormValues("back", "spareWheelRim", {
                                ...formValues.back.spareWheelRim,
                                condition: "Yes / Good",
                                faults: "none",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ color: "#000000" }}
                            className="w-[20px] h-[20px] mx-1"
                        />
                        <span className="text-sm">Yes / Good</span>
                    </button>

                    <div className="rounded-md w-[50%] border border-gray-300 mx-auto ">
                        <SpareWheelRimDropdown />
                    </div>
                </div>
            </div>

            {/* spare wheen tyre condition */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    spare wheen tyre Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.back?.spareWheelTyre?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.back?.spareWheelTyre?.condition
                            );
                            updateFormValues("back", "spareWheelTyre", {
                                ...formValues.back.spareWheelTyre,
                                condition: "Yes / Good",
                                faults: "none",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ color: "#000000" }}
                            className="w-[20px] h-[20px] mx-1"
                        />
                        <span className="text-sm">Yes / Good</span>
                    </button>

                    <div className="rounded-md w-[50%] border border-gray-300 mx-auto ">
                        <SpareWheelTyreDropdown />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Back;
