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
    commonConditions: [
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
        "XX - Part Replaced in Common",
    ],
    frontRightTyreConditions: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
    backRightTyreConditions: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
    runningBoardConditions: [
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
};

export function FrontRightFenderPopup() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
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
        updateFormValues("right", "frontRightFender", {
            ...formValues.right.frontRightFender,
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
                        formValues?.right?.frontRightFender?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.frontRightFender
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
                                    formValues?.right?.frontRightFender
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
                                updateFormValues("right", "frontRightFender", {
                                    ...formValues.right.frontRightFender,
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

export function FrontRightTyreDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "frontRightTyre", {
            ...formValues.right.frontRightTyre,
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
                        formValues?.right?.frontRightTyre?.condition ===
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
                    {items.frontRightTyreConditions.map((item) => (
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
                                // // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.frontRightTyre
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
                                    formValues?.right?.frontRightTyre
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
                                updateFormValues("right", "frontRightTyre", {
                                    ...formValues.right.frontRightTyre,
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
export function RightPillarADropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "rightPillarA photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "rightPillarA", {
            ...formValues.right.rightPillarA,
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
                        formValues?.right?.rightPillarA?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.rightPillarA?.photo
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
                                    formValues?.right?.rightPillarA?.photo && (
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
                                updateFormValues("right", "rightPillarA", {
                                    ...formValues.right.rightPillarA,
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
export function FrontRightDoorDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightDoor photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "frontRightDoor", {
            ...formValues.right.frontRightDoor,
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
                        formValues?.right?.frontRightDoor?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.frontRightDoor
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
                                    formValues?.right?.frontRightDoor
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
                                updateFormValues("right", "frontRightDoor", {
                                    ...formValues.right.frontRightDoor,
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

export function RoghtPillarBDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "rightPillarB photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "rightPillarB", {
            ...formValues.right.rightPillarB,
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
                        formValues?.right?.rightPillarB?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.rightPillarB?.photo
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
                                    formValues?.right?.rightPillarB?.photo && (
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
                                updateFormValues("right", "rightPillarB", {
                                    ...formValues.right.rightPillarB,
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
export function BackRightDoorDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "backRightDoor photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "backRightDoor", {
            ...formValues.right.backRightDoor,
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
                        formValues?.right?.backRightDoor?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.backRightDoor
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
                                    formValues?.right?.backRightDoor?.photo && (
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
                                updateFormValues("right", "backRightDoor", {
                                    ...formValues.right.backRightDoor,
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
export function RightPillarCDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
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
        updateFormValues("right", "rightPillarC", {
            ...formValues.right.rightPillarC,
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
                        formValues?.right?.rightPillarC?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.rightPillarC?.photo
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
                                    formValues?.right?.rightPillarC?.photo && (
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
export function BackRightTyreDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
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
        updateFormValues("right", "backRightTyre", {
            ...formValues.right.backRightTyre,
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
                        formValues?.right?.backRightTyre?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.backRightTyre
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
                                    formValues?.right?.backRightTyre?.photo && (
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
export function RightQuarterPanelDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightDoor inner lining photo"
        );
    };

    useEffect(() => {
        updateFormValues("right", "rightQuarterPanel", {
            ...formValues.right.rightQuarterPanel,
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
                        formValues?.right?.rightQuarterPanel?.condition ===
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
                    {items.commonConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.rightQuarterPanel
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
                                    formValues?.right?.rightQuarterPanel
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
export function RightRunningBoardDropdown() {
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "frontRightTyre photo"
        );
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
        updateFormValues("right", "rightRunningBoard", {
            ...formValues.right.rightRunningBoard,
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
                        formValues?.right?.rightRunningBoard?.condition ===
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
                    {items.runningBoardConditions.map((item) => (
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
                                // onClick={handleUploadFile}
                            >
                                <p>
                                    {fileUploadingStarted
                                        ? "Uploading"
                                        : formValues?.right?.rightRunningBoard
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
                                    formValues?.right?.rightRunningBoard
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
const Right = () => {
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
            {/* front right fendder */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front right fender condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.frontRightFender?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.frontRightFender?.condition
                            );
                            updateFormValues("right", "frontRightFender", {
                                ...formValues.right.frontRightFender,
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
                        <FrontRightFenderPopup />
                    </div>
                </div>
            </div>
            {/* front right tyre */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front right tire condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.frontRightTyre?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.frontRightTyre?.condition
                            );
                            updateFormValues("right", "frontRightTyre", {
                                ...formValues.right.frontRightTyre,
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
                        <FrontRightTyreDropdown />
                    </div>
                </div>
            </div>

            {/* right A PILLAR */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    right A pillar condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.rightPillarA?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.rightPillarA?.condition
                            );
                            updateFormValues("right", "rightPillarA", {
                                ...formValues.right.rightPillarA,
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
                        <RightPillarADropdown />
                    </div>
                </div>
            </div>

            {/* front right door*/}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    front right door condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.frontRightDoor?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.frontRightDoor?.condition
                            );
                            updateFormValues("right", "frontRightDoor", {
                                ...formValues.right.frontRightDoor,
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
                        <FrontRightDoorDropdown />
                    </div>
                </div>
            </div>

            {/* right b pillaer */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    right B pillar Condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.rightPillarB?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.rightPillarB?.condition
                            );
                            updateFormValues("right", "rightPillarB", {
                                ...formValues.right.rightPillarB,
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
                        <RoghtPillarBDropdown />
                    </div>
                </div>
            </div>

            {/* back right door */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    back right door condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.backRightDoor?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.backRightDoor?.condition
                            );
                            updateFormValues("right", "backRightDoor", {
                                ...formValues.right.backRightDoor,
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
                        <BackRightDoorDropdown />
                    </div>
                </div>
            </div>

            {/* right c pillar */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    right C pillar system
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.rightPillarC?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.rightPillarC?.condition
                            );
                            updateFormValues("right", "rightPillarC", {
                                ...formValues.right.rightPillarC,
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
                        <RightPillarCDropdown />
                    </div>
                </div>
            </div>
            {/* back right tyre tread */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    back right tire 
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.backRightTyre?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.backRightTyre?.condition
                            );
                            updateFormValues("right", "backRightTyre", {
                                ...formValues.right.backRightTyre,
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
                        <BackRightTyreDropdown />
                    </div>
                </div>
            </div>
            {/* right quarter pannel */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    right quarter panel
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.rightQuarterPanel?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.rightQuarterPanel?.condition
                            );
                            updateFormValues("right", "rightQuarterPanel", {
                                ...formValues.right.rightQuarterPanel,
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
                        <RightQuarterPanelDropdown />
                    </div>
                </div>
            </div>
            {/* right running board condition */}
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    right running board condition
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <button
                        className={`py-[6px] rounded-md w-[50%] border border-gray-300 mx-auto   ${
                            formValues?.right?.rightRunningBoard?.condition ===
                            "Yes / Good"
                                ? "bg-green-500"
                                : ""
                        }`}
                        onClick={() => {
                            console.log(
                                "clicked: ",
                                formValues?.right?.rightRunningBoard?.condition
                            );
                            updateFormValues("right", "rightRunningBoard", {
                                ...formValues.right.rightRunningBoard,
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
                        <RightRunningBoardDropdown />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Right;
