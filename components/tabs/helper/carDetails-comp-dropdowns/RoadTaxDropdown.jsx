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
 
    

export const RoadTaxDropdown = () => {
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
                updateFormValues("carDetails", "roadTaxPaid", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.roadTaxPaid}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Road Tax Paid" />
            </SelectTrigger>
            <SelectContent className="w-full  overflow-scroll">
                <SelectGroup>
                    <SelectLabel>Road Tax Paid</SelectLabel>
                    <SelectItem value="Life Time">Yes - Life Time</SelectItem>
                    <SelectItem value="Yes - Limited">Yes - Limited</SelectItem>
                    <SelectItem value="No - Tax Validity Expired">
                        No - Tax Validity Expired
                    </SelectItem>
                    <SelectItem value="Tax Exempted">
                        No - Tax Exempted
                    </SelectItem>
                    <SelectItem value="N/A">N/A</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
