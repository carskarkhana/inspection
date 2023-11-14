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
 
   
export const ModelDropdown = () => {
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

    // Get the selected car brand from formValues
    const selectedCarBrand = formValues?.carDetails?.carBrand;

    // Get the models based on the selected car brand
    const models = selectedCarBrand ? brandModels[selectedCarBrand] : [];

    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "carModel", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.carModel}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Car Models " />
            </SelectTrigger>
            {models.length > 0 ? (
                <SelectContent className="w-full h-[40vh] overflow-scroll">
                    <SelectGroup>
                        <SelectLabel>Car Models</SelectLabel>

                        {models.map((item, index) => (
                            <SelectItem key={index} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            ) : (
                <SelectContent>
                    <p className="text-red-500 font-bold">
                        first select a brand
                    </p>
                </SelectContent>
            )}
        </Select>
    );
};
