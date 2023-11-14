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
 
   
 
export const TransmissionDropdown = () => {
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
                updateFormValues("carDetails", "transmission", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.transmission}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Transmission Type" />
            </SelectTrigger>
            <SelectContent className="w-full  overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Transmission Type</SelectLabel>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};