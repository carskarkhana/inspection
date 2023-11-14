import React, { useState, useEffect } from "react";
import formStore from "@/store/formStore";
 
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

import { damages } from "@/data/otherData";


export function DamagesPopup({ checkedItems, setCheckedItems }) {
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

    // useEffect(() => {
    //     updateFormValues("damages", "frontRightFender", {
    //         ...formValues.damages.frontRightFender,
    //         photo: fileUrl,
    //         condition: "No / Bad",
    //         faults: checkedItems,
    //     });
    // }, [fileUrl, checkedItems]);

    // useEffect(() => {
    //     console.log("checkedItems", checkedItems);
    // }, [checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full cursor-pointer flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.damages?.length > 0
                            ? "bg-green-500"
                            : "bg-sky-500"
                    }`}
                >
                    <span className="text-sm text-white">
                        Click here to choose damages
                    </span>
                    {checkedItems.length > 0 ? (
                        <span class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-red-800 bg-orange-200 rounded-full">
                            {checkedItems.length}{" "}
                        </span>
                    ) : (
                        " "
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose item type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {Object.keys(damages).map((item, index) => (
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
                            <p>{damages[item]}</p>
                        </div>
                    ))}
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                            onClick={() => {
                                updateFormValues(
                                    "damages",
                                    "frontRightFender",
                                    {
                                        ...formValues.damages.frontRightFender,
                                        condition: "No / Bad",
                                        faults: checkedItems,
                                    }
                                );
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