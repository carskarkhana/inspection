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
 
   

export const FuelDropdown = () => {
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
                updateFormValues("carDetails", "fuelType", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.fuelType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent className="w-full  overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Fuel Type</SelectLabel>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Petrol + CNG">Petrol + CNG</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};