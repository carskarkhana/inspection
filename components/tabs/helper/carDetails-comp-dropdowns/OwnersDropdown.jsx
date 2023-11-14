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
 
     

export const OwnersDropdown = () => {
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
                updateFormValues("carDetails", "numberOfOwners", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.numberOfOwners}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of owners" />
            </SelectTrigger>
            <SelectContent className="w-full   overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Number of owners</SelectLabel>
                    <SelectItem value="1">1st </SelectItem>
                    <SelectItem value="2">2nd </SelectItem>
                    <SelectItem value="3">3rd </SelectItem>
                    <SelectItem value="4">4th </SelectItem>
                    <SelectItem value="5">5th </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};