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
 
     
 
export const KeysDropdown = () => {
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
                updateFormValues("carDetails", "numberOfKeys", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.numberOfKeys}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Number of keys" />
            </SelectTrigger>
            <SelectContent className="w-full overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Number of keys</SelectLabel>
                    <SelectItem value="Single">Single </SelectItem>
                    <SelectItem value="Both">Both </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};