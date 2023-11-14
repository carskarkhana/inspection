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

export const IsInsuranceDropdown = () => {
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
                if (value === "No / Bad") {
                    let obj = {
                        hasInsurance: value,
                        insuranceType: "",
                        insuranceNumber: "",
                        insuranceValidityDate: "",
                        insuranceImage: "",
                        remarks: "",
                    };
                    updateFormValues("carLegalDetails", "insurance", obj);
                } else {
                    updateFormValues("carLegalDetails", "insurance", {
                        ...formValues.carLegalDetails.insurance,
                        hasInsurance: value,
                    });
                }
            }}
            className="w-full"
            defaultValue={formValues?.carLegalDetails?.insurance?.hasInsurance}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Insurance status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Insurance status</SelectLabel>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};