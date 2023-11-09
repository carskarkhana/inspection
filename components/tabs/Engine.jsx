import React, { useEffect, useState } from "react";

import formStore from "@/store/formStore";
// import engineStore from "@/store/engineStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsDown,
    faThumbsUp,
    faV,
    faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";

import { handleFileUpload } from "@/lib/handlers";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

// ************** popup ***********

const items = {
    exhaustSmokeCondition: ["Black Smoke", "White Smoke", "Blue Smoke"],
    turboCondition: [
        "Non-functional",
        "Whistling noise",
        "Noisy",
        "Leaking",
        "Missing",
    ],
    intercoolerCondition: [
        "Replaced",
        "Radiator damaged",
        "Fan damaged",
        "Repaired",
        "Fluids low",
        "Missing components",
        "Leaking",
        "Contaminated coolant",
        "Hoses damaged",
    ],
    silencerCondition: [
        "Holes",
        "Dent",
        "Corrosion",
        "Replaced",
        "Repaired",
        "Noisy Exhaust",
        "Missing",
    ],
    alternatorCondition: [
        "Corrosion",
        "Damaged",
        "Replaced",
        "Noisy Alternator",
        "Non-Functional Alternator",
        "Missing",
    ],
    radiatorCondition: [
        "Contaminated Coolant",
        "Radiator damaged",
        "Fan Damage Repaired",
        "Replaced",
        "Fluids Low",
        "Missing Components",
        "Leaking",
        "Hoses Damage",
    ],
    engineLeakSummary: [
        "Injector Leak",
        "Gearbox Leak",
        "Differential Leak",
        "Radiator Coolant Leak",
        "Valve Cover Leak",
        "Oil Sludge",
        "Power Steering Oil Leak",
        "Oil Sump Leak",
    ],
};

export function ExhaustSmokePopup() {
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
            "Exhaust smoke photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "exhaustSmoke", {
            ...formValues.engine.exhaustSmoke,
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
                        formValues?.engine?.exhaustSmoke?.condition ===
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
                    {items.exhaustSmokeCondition.map((item) => (
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
                                        : formValues?.engine?.exhaustSmoke
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
                                    formValues?.engine?.exhaustSmoke?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "exhaustSmoke", {
                                    ...formValues.engine.exhaustSmoke,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function TurboDropdown() {
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
            "turbo photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "turbo", {
            ...formValues.engine.turbo,
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
                        formValues?.engine?.turbo?.condition === "No / Bad"
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
                    {items.turboCondition.map((item) => (
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
                                        : formValues?.engine?.turbo?.photo
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
                                    formValues?.engine?.turbo?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "turbo", {
                                    ...formValues.engine.turbo,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function InterCoolerDropdown() {
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
            "interCooler photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "interCooler", {
            ...formValues.engine.interCooler,
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
                        formValues?.engine?.interCooler?.condition ===
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
                    {items.intercoolerCondition.map((item) => (
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
                                        : formValues?.engine?.interCooler?.photo
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
                                    formValues?.engine?.interCooler?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "interCooler", {
                                    ...formValues.engine.interCooler,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function SilencerDropdown() {
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
            "silencer photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "silencer", {
            ...formValues.engine.silencer,
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
                        formValues?.engine?.silencer?.condition === "No / Bad"
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
                    {items.silencerCondition.map((item) => (
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
                                        : formValues?.engine?.silencer?.photo
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
                                    formValues?.engine?.silencer?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "silencer", {
                                    ...formValues.engine.silencer,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function BackCompressionDropdown() {
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
            "SbackCompression photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "backCompression", {
            ...formValues.engine.backCompression,
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
                        formValues?.engine?.backCompression?.condition ===
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
                    {items.alternatorCondition.map((item) => (
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
                                        : formValues?.engine?.backCompression
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
                                    formValues?.engine?.backCompression
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
                            onClick={() => {
                                updateFormValues("engine", "backCompression", {
                                    ...formValues.engine.backCompression,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function AlternatorDropdown() {
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
            "alternator photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "alternator", {
            ...formValues.engine.alternator,
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
                        formValues?.engine?.alternator?.condition === "No / Bad"
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
                    {items.alternatorCondition.map((item) => (
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
                                        : formValues?.engine?.alternator?.photo
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
                                    formValues?.engine?.alternator?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "alternator", {
                                    ...formValues.engine.alternator,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function RadiatorDropdown() {
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
            "radiator photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "radiator", {
            ...formValues.engine.radiator,
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
                        formValues?.engine?.radiator?.condition === "No / Bad"
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
                    {items.radiatorCondition.map((item) => (
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
                                        : formValues?.engine?.radiator?.photo
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
                                    formValues?.engine?.radiator?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "radiator", {
                                    ...formValues.engine.radiator,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export function EngineLeakDropdown() {
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
            "engineLeak photo"
        );
    };

    useEffect(() => {
        updateFormValues("engine", "engineLeak", {
            ...formValues.engine.engineLeak,
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
                        formValues?.engine?.engineLeak?.condition === "No / Bad"
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
                    {items.engineLeakSummary.map((item) => (
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
                                        : formValues?.engine?.engineLeak?.photo
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
                                    formValues?.engine?.engineLeak?.photo && (
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
                            onClick={() => {
                                updateFormValues("engine", "engineLeak", {
                                    ...formValues.engine.engineLeak,
                                    condition: "No / Bad",
                                    faults: checkedItems,
                                });
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// export function EngineOilDropdown() {
//     const [checkedItems, setCheckedItems] = useState([]);
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

//     // **** pic upload ****

//     const [selectFile, setSelectFile] = useState(null);
//     const [fileUrl, setFileUrl] = useState("");
//     const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setSelectFile(file);
//         setFileUrl("");
//     };
//     const handleUploadFile = async (e) => {
//         e.preventDefault();
//         await handleFileUpload(
//             selectFile,
//             setFileUrl,
//             setFileUploadingStarted,
//             "engineOil photo"
//         );
//     };

//     useEffect(() => {
//         updateFormValues("engine", "engineOil", {
//             ...formValues.engine.engineOil,
//             photo: fileUrl,
//             condition: "No / Bad",
//             faults: checkedItems,
//         });
//     }, [fileUrl, checkedItems]);

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <div
//                     className={`w-full flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
//                         formValues?.engine?.engineOil?.condition === "No / Bad"
//                             ? "bg-red-500"
//                             : ""
//                     }`}
//                 >
//                     <FontAwesomeIcon
//                         icon={faThumbsDown}
//                         style={{ color: "#000000" }}
//                         className="w-[20px] h-[20px] mx-1"
//                     />
//                     <span className="text-sm">No / Bad</span>
//                 </div>
//             </DialogTrigger>
//             <DialogContent className="w-full h-[95vh] overflow-scroll">
//                 <DialogHeader>
//                     <DialogTitle>Choose damage type</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex-col justify-center items-start">
//                     {items.warningLights.map((item) => (
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
//                     <br />
//                     <div className="mb-3 mx-1   border-2 border-red-500 rounded-lg shadow-lg p-1">
//                         <div className="pt-1 shadow-md">
//                             <label
//                                 className="block  text-sm font-medium my-1 pl-1 text-gray-900 font bold"
//                                 htmlFor="file_input"
//                             >
//                                 Upload photo
//                             </label>
//                             <input
//                                 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-sky-100  "
//                                 id="file_input"
//                                 type="file" accept="image/*" capture="camera"
//                                 // accept=".pdf, .doc, .docx, .txt,.ppt"
//                                 onChange={handleFileChange}
//                             />
//                             <button
//                                 type="submit"
//                                 className="px-3 my-1 py-1 bg-indigo-700 hover:bg-opavariant-80 shadow rounded text-sm text-white flex justify-between items-center"
//                                 onClick={handleUploadFile}
//                             >
//                                 <p>
//                                     {fileUploadingStarted
//                                         ? "Uploading"
//                                         : formValues?.engine?.engineOil?.photo
//                                         ? "Uploaded"
//                                         : "Upload"}
//                                 </p>
//                                 {fileUploadingStarted ? (
//                                     <div className="ml-3">
//                                         <ColorRing
//                                             visible={true}
//                                             height="25"
//                                             width="25"
//                                             ariaLabel="blocks-loading"
//                                             wrapperStyle={{}}
//                                             wrapperClass="blocks-wrapper"
//                                             colors={[
//                                                 "#e15b64",
//                                                 "#f47e60",
//                                                 "#f8b26a",
//                                                 "#abbd81",
//                                                 "#849b87",
//                                             ]}
//                                         />
//                                     </div>
//                                 ) : (
//                                     ""
//                                 )}
//                                 {!fileUploadingStarted &&
//                                     formValues?.engine?.engineOil?.photo && (
//                                         <FontAwesomeIcon
//                                             icon={faCheckDouble}
//                                             style={{ color: "#00ff11" }}
//                                             className="w-[20px] h-[20px] ml-2"
//                                         />
//                                     )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <DialogFooter className="sm:justify-start">
//                     <DialogClose asChild>
//                         <Button
//                             type="button"
//                             variant="secondary"
//                             className="bg-blue-700 text-white"
//                             onClick={() => {
//                                 updateFormValues("engine", "engineOil", {
//                                     ...formValues.engine.engineOil,
//                                     condition: "No / Bad",
//                                     faults: checkedItems,
//                                 });
//                             }}
//                         >
//                             Save
//                         </Button>
//                     </DialogClose>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

// ********************* main component**************
const Engine = () => {
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
            {/* youtube video link */}
            <div>
                <label
                    htmlFor="remarks"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    youtube video link (if available)
                </label>
                <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
                    onChange={(e) => {
                        updateFormValues(
                            "engine",
                            "youtubeVideoLink",
                            e.target.value
                        );
                    }}
                    value={formValues?.engine?.youtubeVideoLink} 
                    placeholder="paste link here..."
                    defaultValue={""}
                />
            </div>
            {/* exhaust smoke motor */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Exhaust smoke Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.exhaustSmoke?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.exhaustSmoke?.condition
                            );
                            updateFormValues("engine", "exhaustSmoke", {
                                ...formValues.engine.exhaustSmoke,
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
                        <ExhaustSmokePopup />
                    </div>
                </div>
            </div>
            {/* turbo type */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Exhaust smoke Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.turbo?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.turbo?.condition
                            );
                            updateFormValues("engine", "turbo", {
                                ...formValues.engine.turbo,
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
                        <TurboDropdown />
                    </div>
                </div>
            </div>

            {/* inter cooler condition*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Intercooler Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.interCooler?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.interCooler?.condition
                            );
                            updateFormValues("engine", "interCooler", {
                                ...formValues.engine.interCooler,
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
                        <InterCoolerDropdown />
                    </div>
                </div>
            </div>

            {/* silencer */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Silencer Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.silencer?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.silencer?.condition
                            );
                            updateFormValues("engine", "silencer", {
                                ...formValues.engine.silencer,
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
                        <SilencerDropdown />
                    </div>
                </div>
            </div>

            {/* engine blockback condition/ back compression */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Back Compression Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.backCompression?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.backCompression?.condition
                            );
                            updateFormValues("engine", "backCompression", {
                                ...formValues.engine.backCompression,
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
                        <BackCompressionDropdown />
                    </div>
                </div>
            </div>

            {/* alternator */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Alternator Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.alternator?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.alternator?.condition
                            );
                            updateFormValues("engine", "alternator", {
                                ...formValues.engine.alternator,
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
                        <AlternatorDropdown />
                    </div>
                </div>
            </div>

            {/* alternator */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Radiator Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.radiator?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.radiator?.condition
                            );
                            updateFormValues("engine", "radiator", {
                                ...formValues.engine.radiator,
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
                        <RadiatorDropdown />
                    </div>
                </div>
            </div>

            {/* engine leak */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Engine Leak summary
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.engineLeak?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.engineLeak?.condition
                            );
                            updateFormValues("engine", "engineLeak", {
                                ...formValues.engine.engineLeak,
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
                        <EngineLeakDropdown />
                    </div>
                </div>
            </div>

            {/* engine oil */}
            {/* <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Engine Oil Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.engine?.engineOil?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.engine?.engineOil?.condition
                            );
                            updateFormValues("engine", "engineOil", {
                                ...formValues.engine.engineOil,
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
                        <EngineOilDropdown />
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default Engine;
