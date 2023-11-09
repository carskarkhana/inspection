import React, { useEffect, useState } from "react";

import formStore from "@/store/formStore";
// import frontStore from "@/store/frontStore";
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
    leftRunningBoardCondition: [
        "Chipped",
        "Scratched",
        "Cracked",
        "Repaired",
        "Corrosion",
        "Missing",
        "Dent",
        "Damage",
        "Replace",
    ],
    backLeftTireTread: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
    leftQuarterPanelConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],
    leftCPillarConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],
    backLeftDoorConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],
    leftBPillarConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],

    frontLeftDoorCondition: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],
    leftAPillarConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],

    frontLeftFenderConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "Damage",
        "XX - Part Replaced in Left Quarter Panel",
    ],
    frontLeftTireTread: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
};

export function LeftRunningBoardPopup() {
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
        updateFormValues("left", "leftRunningBoard", {
            ...formValues.left.leftRunningBoard,
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
                        formValues?.left?.leftRunningBoard?.condition ===
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
                    {items.leftRunningBoardCondition.map((item) => (
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
                                        : formValues?.left?.leftRunningBoard
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
                                    formValues?.left?.leftRunningBoard
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
                                updateFormValues("left", "leftRunningBoard", {
                                    ...formValues.left.leftRunningBoard,
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

export function BackLeftTyreDropdown() {
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
            "backLeftTyre photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "backLeftTyre", {
            ...formValues.left.backLeftTyre,
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
                        formValues?.left?.backLeftTyre?.condition === "No / Bad"
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
                    {items.backLeftTireTread.map((item) => (
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
                                        : formValues?.left?.backLeftTyre?.photo
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
                                    formValues?.left?.backLeftTyre?.photo && (
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
                                updateFormValues("left", "backLeftTyre", {
                                    ...formValues.left.backLeftTyre,
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
export function LeftQuarterPanelDropdown() {
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
            "leftQuarterPanel photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "leftQuarterPanel", {
            ...formValues.left.leftQuarterPanel,
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
                        formValues?.left?.leftQuarterPanel?.condition ===
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
                    {items.leftQuarterPanelConditions.map((item) => (
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
                                        : formValues?.left?.leftQuarterPanel
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
                                    formValues?.left?.leftQuarterPanel
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
                                updateFormValues("left", "leftQuarterPanel", {
                                    ...formValues.left.leftQuarterPanel,
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
export function LeftPillarCDropdown() {
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
            "leftPillarC photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "leftPillarC", {
            ...formValues.left.leftPillarC,
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
                        formValues?.left?.leftPillarC?.condition === "No / Bad"
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
                    {items.leftCPillarConditions.map((item) => (
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
                                        : formValues?.left?.leftPillarC?.photo
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
                                    formValues?.left?.leftPillarC?.photo && (
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
                                updateFormValues("left", "leftPillarC", {
                                    ...formValues.left.leftPillarC,
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

export function BackLeftDoorDropdown() {
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
            "backLeftDoor photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "backLeftDoor", {
            ...formValues.left.backLeftDoor,
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
                        formValues?.left?.backLeftDoor?.condition === "No / Bad"
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
                    {items.backLeftDoorConditions.map((item) => (
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
                                        : formValues?.left?.backLeftDoor?.photo
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
                                    formValues?.left?.backLeftDoor?.photo && (
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
                                updateFormValues("left", "backLeftDoor", {
                                    ...formValues.left.backLeftDoor,
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
export function LeftPillarBDropdown() {
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
            "leftPillarB photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "leftPillarB", {
            ...formValues.left.leftPillarB,
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
                        formValues?.left?.leftPillarB?.condition === "No / Bad"
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
                    {items.leftBPillarConditions.map((item) => (
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
                                        : formValues?.left?.leftPillarB?.photo
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
                                    formValues?.left?.leftPillarB?.photo && (
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
                                updateFormValues("left", "leftPillarB", {
                                    ...formValues.left.leftPillarB,
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
// ................................
export function FrontLeftDoorDropdown() {
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
        updateFormValues("left", "frontLeftDoor", {
            ...formValues.left.frontLeftDoor,
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
                        formValues?.left?.frontLeftDoor?.condition ===
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
                    {items.frontLeftDoorCondition.map((item) => (
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
                                        : formValues?.left?.frontLeftDoor?.photo
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
                                    formValues?.left?.frontLeftDoor?.photo && (
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
export function LeftPillarADropdown() {
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
        updateFormValues("left", "leftPillarA", {
            ...formValues.left.leftPillarA,
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
                        formValues?.left?.leftPillarA?.condition === "No / Bad"
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
                    {items.leftAPillarConditions.map((item) => (
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
                                        : formValues?.left?.leftPillarA?.photo
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
                                    formValues?.left?.leftPillarA?.photo && (
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
export function FronLeftTyreDropdown() {
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
            "leftPillarC inner lining photo"
        );
    };

    useEffect(() => {
        updateFormValues("left", "fronLeftTyre", {
            ...formValues.left.fronLeftTyre,
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
                        formValues?.left?.fronLeftTyre?.condition === "No / Bad"
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
                    {items.frontLeftTireTread.map((item) => (
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
                                        : formValues?.left?.fronLeftTyre?.photo
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
                                    formValues?.left?.fronLeftTyre?.photo && (
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
export function FrontLeftFenderDropdown() {
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
        updateFormValues("left", "frontLeftFender", {
            ...formValues.left.frontLeftFender,
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
                        formValues?.left?.frontLeftFender?.condition ===
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
                    {items.frontLeftFenderConditions.map((item) => (
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
                                        : formValues?.left?.frontLeftFender
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
                                    formValues?.left?.frontLeftFender
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

// ********************* main component**************
const Left = () => {
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
            {/* left running board condition */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    left running board condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.leftRunningBoard?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.leftRunningBoard?.condition
                            );
                            updateFormValues("left", "leftRunningBoard", {
                                ...formValues.left.leftRunningBoard,
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
                        <LeftRunningBoardPopup />
                    </div>
                </div>
            </div>
            {/* back left tyre tread */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    back left tyre tread
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.backLeftTyre?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.backLeftTyre?.condition
                            );
                            updateFormValues("left", "backLeftTyre", {
                                ...formValues.left.backLeftTyre,
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
                        <BackLeftTyreDropdown />
                    </div>
                </div>
            </div>

            {/* left quarter panel*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    left quarter panel
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.leftQuarterPanel?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.leftQuarterPanel?.condition
                            );
                            updateFormValues("left", "leftQuarterPanel", {
                                ...formValues.left.leftQuarterPanel,
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
                        <LeftQuarterPanelDropdown />
                    </div>
                </div>
            </div>

            {/* Left C pillar*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Left C pillar
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.leftPillarC?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.leftPillarC?.condition
                            );
                            updateFormValues("left", "leftPillarC", {
                                ...formValues.left.leftPillarC,
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
                        <LeftPillarCDropdown />
                    </div>
                </div>
            </div>

            {/* Back left door */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    Back left door
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.backLeftDoor?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.backLeftDoor?.condition
                            );
                            updateFormValues("left", "backLeftDoor", {
                                ...formValues.left.backLeftDoor,
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
                        <BackLeftDoorDropdown />
                    </div>
                </div>
            </div>

            {/* left b pillar*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    left b pillar
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.leftPillarB?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.leftPillarB?.condition
                            );
                            updateFormValues("left", "leftPillarB", {
                                ...formValues.left.leftPillarB,
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
                        <LeftPillarBDropdown />
                    </div>
                </div>
            </div>

            {/* front left door */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front left door
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.frontLeftDoor?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.frontLeftDoor?.condition
                            );
                            updateFormValues("left", "frontLeftDoor", {
                                ...formValues.left.frontLeftDoor,
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
                        <FrontLeftDoorDropdown />
                    </div>
                </div>
            </div>
            {/* left a pillar */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    left a pillar
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.leftPillarA?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.leftPillarA?.condition
                            );
                            updateFormValues("left", "leftPillarA", {
                                ...formValues.left.leftPillarA,
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
                        <LeftPillarADropdown />
                    </div>
                </div>
            </div>
            {/* front left tyre */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front left tyre tread
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.fronLeftTyre?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.fronLeftTyre?.condition
                            );
                            updateFormValues("left", "fronLeftTyre", {
                                ...formValues.left.fronLeftTyre,
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
                        <FronLeftTyreDropdown />
                    </div>
                </div>
            </div>
            {/* front left fender */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front left fender
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.left?.frontLeftFender?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.left?.frontLeftFender?.condition
                            );
                            updateFormValues("left", "frontLeftFender", {
                                ...formValues.left.frontLeftFender,
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
                        <FrontLeftFenderDropdown />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Left;
