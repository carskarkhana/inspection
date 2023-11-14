import React, { useState } from "react";
 
import {
    registeredStatesData,
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
 
 
 
export const RegisteredStateDropdown = () => {
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

    // State variables for search functionality
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredStates, setFilteredStates] = useState([]);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        event.preventDefault();
        const query = event.target.value;
        setSearchQuery(query);

        // Filter the states based on the search query
        const filtered = registeredStatesData.filter(
            (item) =>
                item.state.toLowerCase().includes(query.toLowerCase()) ||
                query.toLowerCase().includes(item.rtoCode.toLowerCase())
        );
        setFilteredStates(filtered);
    };
    return (
        <Select
            onValueChange={(value) => {
                updateFormValues("carDetails", "registeredState", value);
            }}
            className="w-full"
            defaultValue={formValues?.carDetails?.registeredState}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Registered State" />
            </SelectTrigger>
            <SelectContent className="w-[100vw] mx-auto left-0 top-0 absolute h-[40vh] overflow-scroll">
                <SelectGroup className="">
                    <SelectLabel>Registered State</SelectLabel>
                  

                    {searchQuery === ""
                        ? registeredStatesData.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                  {item.state} - {item.rtoCode}
                              </SelectItem>
                          ))
                        : filteredStates.map((item, index) => (
                              <SelectItem key={index} value={item}>
                                  {item.state} - {item.rtoCode}
                              </SelectItem>
                          ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
