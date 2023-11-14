import React  from "react";

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

export const InspectionDropdown = () => {
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
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "inspectionType", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.inspectionType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Inspection Type" />
            </SelectTrigger>
            <SelectContent className="w-full   overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Inspection Type</SelectLabel>
                    <SelectItem value="home">Home Inspection</SelectItem>
                    <SelectItem value="office">Office Inspection</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};