import React, {  useEffect } from "react";
 
import formStore from "@/store/formStore";
 
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
 
export const CirtificateBadDropdown = ({ cirtificate, setCirtificate }) => {
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

    const handleCirtificate = (remark) => {
        setCirtificate({
            ...cirtificate,
            condition: "Bad",
            remarks: remark,
        });
    };
    useEffect(() => {
        updateFormValues("carDetails", "registerationCirtificate", cirtificate);
    }, [cirtificate]);

    return (
        <Select
            onValueChange={(remark) => {
                handleCirtificate(remark);
            }}
            className="w-full"
            // defaultValue={
            //     formValues?.carDetails?.registerationCirtificate?.remarks ||
            //     "Bad"
            // }
        >
            <SelectTrigger
                className={`pl-3 rounded-lg border border-none shadow-md    text-sm   w-[100px] ull px-3 outline-none line-clamp-1 ${
                    formValues?.carDetails?.registerationCirtificate
                        ?.condition === "Bad"
                        ? "bg-red-500"
                        : ""
                }`}
            >
                <SelectValue
                    placeholder={
                        formValues?.carDetails?.registerationCirtificate
                            ?.condition === "Bad"
                            ? formValues?.carDetails?.registerationCirtificate
                                  ?.remarks
                            : "Bad"
                    }
                />
            </SelectTrigger>
            <SelectContent className="w-full   overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Remarks</SelectLabel>
                    <SelectItem value="Missing">Missing</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                    <SelectItem value="Photocopy">Photocopy</SelectItem>

                    <SelectItem value="Official duplicate">
                        Official duplicate
                    </SelectItem>
                    <SelectItem value="Faded">Faded</SelectItem>
                    <SelectItem value="Has Clerical Errors">
                        Has Clerical Errors
                    </SelectItem>
                    <SelectItem value="Chip Missing">Chip Missing</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
