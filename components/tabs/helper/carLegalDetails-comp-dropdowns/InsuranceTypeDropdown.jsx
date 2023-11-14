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


export const InsuranceTypeDropdown = () => {
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
                updateFormValues("carLegalDetails", "insurance", {
                    ...formValues.carLegalDetails.insurance,
                    insuranceType: value,
                });
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.inspectionType}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Insurance Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Insurance Type</SelectLabel>
                    <SelectItem value="Zero Deprecation">
                        Zero Deprecation
                    </SelectItem>
                    <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="3rd Party">3rd Party</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
