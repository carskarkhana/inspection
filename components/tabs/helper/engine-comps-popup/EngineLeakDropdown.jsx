import React, { useEffect, useState } from "react";

import formStore from "@/store/formStore";
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThumbsDown,
    faThumbsUp,
     
    faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";

import { handleFileUpload } from "@/lib/handlers";

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

// ************** popup ***********

import { engineItems } from "@/data/otherData";
      
 
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
        event.preventDefault();
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
        handleFileUpload(
            file,
            setFileUrl,
            setFileUploadingStarted,
            "interCooler photo"
        );
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
                    {engineItems.engineLeakSummary.map((item) => (
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
 