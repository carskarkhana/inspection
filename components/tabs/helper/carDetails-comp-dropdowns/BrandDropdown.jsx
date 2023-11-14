import React  from "react";

import {
  
    brandModels,
} from "@/data/otherData";

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
 
 
 
export const BrandDropdown = () => {
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
                updateFormValues("carDetails", "carBrand", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.carBrand}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent className="w-full h-[40vh] overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Brand</SelectLabel>

                    {Object.keys(brandModels).map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
