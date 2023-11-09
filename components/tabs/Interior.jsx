import React, { useEffect, useState } from "react";

import formStore from "@/store/formStore";
import interiorStore from "@/store/interiorStore";

import { handleFileUpload } from "@/lib/handlers";

import { ColorRing } from "react-loader-spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

// ************** popup ***********

const items = {
    warningLights: [
        "ABS Light",
        "Airbag Light",
        "SRS Light",
        "Diesel Light",
        "Check Light",
        "Diesel Exhaust Fluid Light",
        "Diesel Particulate Filter Light",
        "Glow Plug Indicator",
        "Maintenance Light",
        "Oil Light",
        "Service Engine Soon Light",
        "Suspension Malfunction Light",
        "TPMS Light",
        "Traction Control Light",
        "Transmission Temperature Light",
        "4wd Light",
        "Other Dash Light",
    ],
    dashboard: [
        "Speedometer Non-Functional",
        "Tachometer Functional",
        "Odometer Non-Functional",
        "Fuel Gauge Non-Functional",
        "Dashboard Backlight Non-Functional",
        "Damage",
        "Conditioning Controls Non-Functional",
        "Light Controls Non-Functional",
        "Defog Non-Functional",
        "Missing",
    ],
    roofInnerLining: [
        "Excessive wear",
        "Unclean",
        "Excessive Slack",
        "Holes",
        "Missing",
    ],
    AC: [
        "Non-functional",
        "Leaking",
        "Blower faulty",
        "Blower non-functional",
        "Heating non-functional",
        "Cold air low function",
        "Cooling non-functional",
        "AC Compressor Noisy",
        "AC Compressor Leakage",
        "AC Compressor Replaced",
    ],
    powerWindows: [
        "Front left Non-Functional",
        "Back left Non-Functional",
        "Back right Non-Functional",
        "Front right Non-Functional",
        "Master Controls Non-Functional",
    ],
    specialFeatures: [
        "Car has rear camera",
        "Airbag",
        "Sunroof",
        "Automatic Climate control",
        "Parking Sensor",
        "Display Touch Screen",
        "Seat Cover",
        "Tubeless Tyres",
        "Power Steering",
        "Roof Rack",
        "Sun Visors",
        "Car Security System",
        "Defogger",
        "Steering Mounted Audio",
        "Cluster panel",
        "Chrome Plated body",
        "Power Windows",
        "Car Mats",
        "Music System",
        "Height Adjustable",
        "Alloy Wheels",
        "Keyless entry/ Push Start",
        "ABS",
        "RFID",
        "Navigation/GPS",
        "Wireless Charger",
        "Apple Car Play/ Android Car Play",
    ],
    floodExposure: ["Floor Level", "Dashboard Level", "Full Flooded"],
    musicSystem: ["Not working", "Not available"],
    centerLock: ["Not working", "Not available"],
};

export function WarninLightsPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Warning Lights Photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "warningLights", {
            ...formValues.interior.warningLights,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.warningLights?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.warningLights.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.warningLights
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.warningLights
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function DeashboardPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "dashboard photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "dashboard", {
            ...formValues.interior.dashboard,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.dashboard?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.dashboard.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.dashboard?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.dashboard?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function RoofInnerLiningPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Roof inner lining photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "roofInnerLining", {
            ...formValues.interior.roofInnerLining,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.roofInnerLining?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.roofInnerLining.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.roofInnerLining
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.roofInnerLining
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function ACPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Air conditioner photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "airConditioner", {
            ...formValues.interior.airConditioner,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.airConditioner?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.AC.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.airConditioner
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.airConditioner
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function MusicSystemPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Music system photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "musicSystem", {
            ...formValues.interior.musicSystem,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.musicSystem?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.musicSystem.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.musicSystem
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.musicSystem
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function CentralLockPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Central lock photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "centralLock", {
            ...formValues.interior.centralLock,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.centralLock?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.centerLock.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.centralLock
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.centralLock
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function PowerWindowsPopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Roof inner lining photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "powerWindows", {
            ...formValues.interior.powerWindows,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.powerWindows?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.powerWindows.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.powerWindows
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.powerWindows
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function FloodExposurePopup() {
    const [checkedItems, setCheckedItems] = useState([]);
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Flood exposure photo"
        );
    };

    useEffect(() => {
        updateFormValues("interior", "floodExposure", {
            ...formValues.interior.floodExposure,
            photo: fileUrl,
            condition: "No / Bad",
            faults: checkedItems,
        });
    }, [fileUrl, checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full  flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.interior?.floodExposure?.condition ===
                        "No / Bad"
                            ? "bg-red-500"
                            : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        style={{ color: "#000000" }}
                        className="w-[20px] h-[20px] mx-1"
                    />
                    <span className="text-sm">No / Bad</span>
                </div>
            </DialogTrigger>
              <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose damage type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {items.floodExposure.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                    <br />
                    <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
                        <div className="pt-1 shadow-md">
                            <label
                                className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
                                htmlFor="file_input"
                            >
                                Upload photo
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
                                id="file_input"
                                type="file" accept="image/*" capture="camera"
                                // accept=".pdf, .doc, .docx, .txt,.ppt"
                                onChange={handleFileChange}
                            />
                            <button
                                type="submit"
                                className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
                                onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.interior?.floodExposure
                                              ?.photo
                                        ? "Uploaded"
                                        : "Upload"}
                                </p>
                                {fileUploadingStarted ? (
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
                                {!fileUploadingStarted &&
                                    formValues?.interior?.floodExposure
                                        ?.photo && (
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
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// export function SpecialFeaturesPopup() {
//     const { checkedItems, setCheckedItems } = interiorStore();
//     const { formValues, setFormValues } = formStore();

//     const updateFormValues = (objectName, field, value) => {
//         setFormValues({
//             ...formValues,
//             [objectName]: {
//                 ...formValues[objectName],
//                 [field]: value,
//             },
//         });
//     };
//     useEffect(() => {
//         updateFormValues("interior", "specialFeatures", checkedItems);
//     }, [checkedItems]);
//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <div
//                     className={`w-full  flex items-center justify-evenly py-[6px] rounded-md  border border-gray-300 mx-auto   ${
//                         formValues?.interior?.specialFeatures.length > 0
//                             ? "bg-blue-500"
//                             : ""
//                     }`}
//                 >
//                     <p className="text-sm">Special Features </p>
//                     {formValues?.interior?.specialFeatures?.length > 0 ? (
//                         <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
//                             {formValues?.interior?.specialFeatures?.length}
//                         </span>
//                     ) : (
//                         <FontAwesomeIcon
//                             icon={faV}
//                             style={{ color: "#000000" }}
//                             className="w-[12px] h-[12px] mx-1"
//                         />
//                     )}
//                 </div>
//             </DialogTrigger>
//               <DialogContent className="w-full h-[95vh] overflow-scroll">
//                 <DialogHeader>
//                     <DialogTitle>Special Features</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex-col justify-center items-start overflow-scroll h-[80vh]">
//                     {items.specialFeatures.map((item) => (
//                         <div
//                             className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
//                             key={item}
//                         >
//                             <Checkbox
//                                 checked={checkedItems.includes(item)}
//                                 onCheckedChange={(checked) => {
//                                     return checked
//                                         ? setCheckedItems([
//                                               ...checkedItems,
//                                               item,
//                                           ])
//                                         : setCheckedItems(
//                                               checkedItems.filter(
//                                                   (value) => value !== item
//                                               )
//                                           );
//                                 }}
//                             />
//                             <p>{item}</p>
//                         </div>
//                     ))}
//                 </div>
//                 <DialogFooter className="sm:justify-start">
//                     <DialogClose asChild>
//                         <Button
//                             type="button"
//                             variant="secondary"
//                             className="bg-blue-700 text-white"
//                         >
//                             Save
//                         </Button>
//                     </DialogClose>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

const SpecialFeaturesPopup = () => {
    const { checkedItems, setCheckedItems } = interiorStore();
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
    useEffect(() => {
        updateFormValues("interior", "specialFeatures", checkedItems);
    }, [checkedItems]);

    return (
        <Select className="w-full">
            <SelectTrigger
                className={`w-full  flex items-center justify-evenly py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                    formValues?.interior?.specialFeatures.length > 0
                        ? "bg-blue-500"
                        : ""
                }`}
            >
                <div
                    className={`w-full  flex items-center justify-between py-[6px] rounded-md pr-5  mx-auto   ${
                        formValues?.interior?.specialFeatures.length > 0
                            ? "bg-blue-500"
                            : ""
                    }`}
                >
                    <p className="text-sm ">Special Features </p>
                    {formValues?.interior?.specialFeatures?.length > 0 ? (
                        <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                            {formValues?.interior?.specialFeatures?.length}{" "}
                        </span>
                    ) : (
                        " "
                    )}
                </div>
            </SelectTrigger>
            <SelectContent className="w-full">
                <div className="flex-col justify-center items-start overflow-scroll h-[80vh] w-full">
                    <p className="text-gray-700 pl-3 my-2 font-bold">
                        Select special features
                    </p>
                    {items.specialFeatures.map((item) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </SelectContent>
        </Select>
    );
};
// ********************* main component**************
const Interior = () => {
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
            {/* interior */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Warning lights on
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.warningLights?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.warningLights?.condition
                            );
                            updateFormValues("interior", "warningLights", {
                                ...formValues.interior.warningLights,
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
                        <WarninLightsPopup />
                    </div>
                </div>
            </div>

            {/* dashboard */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Dashboard
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.dashboard?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.dashboard?.condition
                            );
                            updateFormValues("interior", "dashboard", {
                                ...formValues.interior.dashboard,
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
                        <DeashboardPopup />
                    </div>
                </div>
            </div>
            {/* roof inner lining condition */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Roof Inner Lining Conditions
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.roofInnerLining?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.roofInnerLining?.condition
                            );
                            updateFormValues("interior", "roofInnerLining", {
                                ...formValues.interior.roofInnerLining,
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
                        <RoofInnerLiningPopup />
                    </div>
                </div>
            </div>
            {/* air conditioning */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Air conditioning
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.airConditioner?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.airConditioner?.condition
                            );
                            updateFormValues("interior", "airConditioner", {
                                ...formValues.interior.airConditioner,
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
                        <ACPopup />
                    </div>
                </div>
            </div>
            {/* music system */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Music System
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.musicSystem?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.musicSystem?.condition
                            );
                            updateFormValues("interior", "musicSystem", {
                                ...formValues.interior.musicSystem,
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
                        <MusicSystemPopup />
                    </div>
                </div>
            </div>
            {/* central lock */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Central Lock
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.centralLock?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.centralLock?.condition
                            );
                            updateFormValues("interior", "centralLock", {
                                ...formValues.interior.centralLock,
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
                        <CentralLockPopup />
                    </div>
                </div>
            </div>
            {/* power windows */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Power Windows
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.powerWindows?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.powerWindows?.condition
                            );
                            updateFormValues("interior", "powerWindows", {
                                ...formValues.interior.powerWindows,
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
                        <PowerWindowsPopup />
                    </div>
                </div>
            </div>
            {/* flood exposure */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Flood Exposure
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.interior?.floodExposure?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.interior?.floodExposure?.condition
                            );
                            updateFormValues("interior", "floodExposure", {
                                ...formValues.interior.floodExposure,
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
                        <FloodExposurePopup />
                    </div>
                </div>
            </div>
            {/* special features */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Special Features
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    {/* <SpecialFeaturesPopup /> */}
                    <SpecialFeaturesPopup />
                </div>
            </div>
        </section>
    );
};

export default Interior;
