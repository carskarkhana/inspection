import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import formStore from "@/store/formStore";
import { ColorRing } from "react-loader-spinner";
import { uploadFileToStorage } from "@/api/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import damageStore from "@/store/damageStore";
import Image from "next/image";
import {
    faThumbsDown,
    faThumbsUp,
    faV,
    faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

import { handleFileUpload } from "@/lib/handlers";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

const damages = {
    frontUpperMembraneBonnetPattiRepaired:
        "Front Upper Membrane (Bonnet Patti) damage/repair",
    quarterPanelRepaired: "Quarter Panel damage/repair",
    pillarRepaired: "Pillar damage/repair",
    apronRepaired: "Apron damage/repair",
    damageInChassis: " Chassis",
    chassisRepaired: "Chassis repaired damage/repair",
    dickyFloorRepaired: "Dicky Floor damage/repair",
    damageInRunningBord: " Running Bord",
    runningBordRepaired: "Running Bord damage/repair",
    dickyFloorReplaced: "Dicky Floor Replaced",
    damageInDickyFloor: " Dicky Floor",
    crossMembraneRepaired: "Cross-membrane damage/repair",
    damageInApron: " Apron",
    damageInPillar: " Pillar",
    damageInQuarter: " Quarter",
    damageInFrontUpperMembraneBonnetPatti:
        " Front Upper Membrane (Bonnet Patti)",
    damageInRoof: " Roof",
    roofRepaired: "Roof damage/repair",
    damageInFrontLowerMembrane: " Front Lower Membrane",
    frontLowerMembraneRepaired: "Front Lower Membrane damage/repair",
    damageInFenderWall: " Fender Wall",
    fenderWallRepaired: "Fender Wall damage/repair",
    wheelRimDamage: "Wheel Rim damage/repair",
    carrierAssemblyBrokenDamagePlasticPart:
        "Carrier Assembly Broken/item (Plastic Part)",
    carrierAssemblyReplacedPlasticPart:
        "Carrier Assembly Replaced (Plastic Part)",
    fireWallRusted: "Fire Wall Rusted",
    fireWallRepaired: "Fire Wall damage/repair",
    cowlTopDamage: "Cowl Top damage/repair",
    trunkFloorEndPanelDamage: "Trunk Floor End Panel damage/repair",
    trunkFloorEndPanelRepaired: "Trunk Floor End Panel damage/repair",
    seatSeatBeltCondition: "Seat/Seat Belt Condition",
    airbagDeployed: "Airbag Deployed",
    airbagReplaced: "Airbag Replaced",
    headlampIssues: "Headlamp Issues",
    tailLampIssues: "Tail Lamp Issues",
    keyDamaged: "Key Damaged",
    tireDamaged: "Tire Damaged",
};

const items = {
    commonConditions: [
        "O - Original",
        "A1 - Minor Scratch",
        "A2 - Major Scratch (For Multiple Scratches)",
        "C - Part Rusted/Corroded",
        "S1 - Repainted - Good Quality",
        "S2 - Repainted - Bad Quality",
        "E1 - Minor Dent",
        "E2 - Major Dent",
        "W1 - Part with Minor Repairs (Original Sealant)",
        "W2 - Part with Major Repairs (Sealant Repair or Broken)",
        "damage/repair",
        "XX - Part Replaced in Common",
    ],
    frontRightTyreConditions: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
    backRightTyreConditions: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
    runningBoardConditions: [
        "Chipped",
        "Scratched",
        "Cracked",
        "Repaired",
        "Corrosion",
        "Missing",
        "Dent",
        "damage/repair",
        "Replace",
    ],
};


export function DamagesPopup({ checkedItems, setCheckedItems }) {
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

    // **** pic upload ****

    const [selectFile, setSelectFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [fileUploadingStarted, setFileUploadingStarted] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectFile(file);
        setFileUrl("");
    };
    const handleUploadFile = async (e) => {
        e.preventDefault();
        await handleFileUpload(
            selectFile,
            setFileUrl,
            setFileUploadingStarted,
            "Exhaust smoke photo"
        );
    };

    // useEffect(() => {
    //     updateFormValues("damages", "frontRightFender", {
    //         ...formValues.damages.frontRightFender,
    //         photo: fileUrl,
    //         condition: "No / Bad",
    //         faults: checkedItems,
    //     });
    // }, [fileUrl, checkedItems]);

    useEffect(() => {
        console.log("checkedItems", checkedItems);
    }, [checkedItems]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className={`w-full flex items-center justify-center py-[6px] rounded-md  border border-gray-300 mx-auto   ${
                        formValues?.damages?.length > 0
                            ? "bg-green-500"
                            : "bg-sky-500"
                    }`}
                >
                    <span className="text-sm text-white">
                        Click here to choose damages
                    </span>
                </div>
            </DialogTrigger>
            <DialogContent className="w-full h-[95vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose item type</DialogTitle>
                </DialogHeader>
                <div className="flex-col justify-center items-start">
                    {Object.keys(damages).map((item, index) => (
                        <div
                            className="flex items-center border-b border-gray-200 pl-2 py-1 gap-2"
                            key={item}
                        >
                            <Checkbox
                                checked={checkedItems.includes(item)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? setCheckedItems([
                                              ...checkedItems,
                                              item,
                                          ])
                                        : setCheckedItems(
                                              checkedItems.filter(
                                                  (value) => value !== item
                                              )
                                          );
                                }}
                            />
                            <p>{damages[item]}</p>
                        </div>
                    ))}
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-blue-700 text-white"
                            onClick={() => {
                                updateFormValues(
                                    "damages",
                                    "frontRightFender",
                                    {
                                        ...formValues.damages.frontRightFender,
                                        condition: "No / Bad",
                                        faults: checkedItems,
                                    }
                                );
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const ImageUploader2 = ({ index, item }) => {
    const { formValues, setFormValues } = formStore();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageUploadingStarted, setImageUploadingStarted] = useState(false);

    // Use a unique identifier for each instance
    const identifier = `${item}_${index}`;

    const updateFormValues = (section, field, value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            damages: {
                ...prevFormValues.damages,
                [item]: {
                    ...prevFormValues.damages[item],
                    [field]: value,
                },
            },
        }));
    };

    const handleFileUpload = async (
        file,
        setFileUrl,
        setUploadingStarted,
        type
    ) => {
        if (file) {
            setUploadingStarted(true);

            try {
                const downloadURL = await uploadFileToStorage(file);

                setFileUrl(downloadURL);
                console.log(`${type} available at`, downloadURL);
            } catch (error) {
                toast.error(`Error uploading ${type}: ${error.message}`);
            } finally {
                setUploadingStarted(false);
            }
        } else {
            setUploadingStarted(false);
            toast.warning(`Please select a ${type} file first.`);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageUrl("");
    };

    const handleUploadImage = (e) => {
        e.preventDefault();
        handleFileUpload(
            selectedFile,
            setImageUrl,
            setImageUploadingStarted,
            "file"
        );
    };

    // useEffect(() => {
    //     if (imageUrl) {
    //         setFormValues((prevFormValues) => ({
    //             ...prevFormValues,
    //             damages: {
    //                 ...prevFormValues.damages,
    //                 [item]: {
    //                     ...prevFormValues.damages[item],
    //                     photo: imageUrl,
    //                 },
    //             },
    //         }));
    //     }
    // }, [imageUrl]);
    useEffect(() => {
        if (imageUrl) {
            console.log("image url is: ", imageUrl);
            console.log("form values is: ", formValues);
            console.log("item is: ", item);
            console.log("form values damages is: ", formValues?.damages);
            console.log(
                "form values damages item is: ",
                formValues?.damages[item]
            );

            // updateFormValues(item, 'photo', imageUrl);

            setFormValues({
                ...formValues,
                damages: {
                    ...formValues.damages,
                    [item]: {
                        ...formValues.damages[item],
                        photo: imageUrl,
                    },
                },
            });
        }
    }, [imageUrl]);

    console.log("damage item: ", item);

    return (
        <div className="mb-3 mx-1 shadow-sm">
            {/* photo upload */}
            <div className="pt-1 pb-1 shadow-sm  w-[130px]     flex-col justify-center items-center mx-auto">
                <label
                    className="block text-sm   font-medium my-1 pl-1 text-gray-900"
                    htmlFor={identifier}
                >
                    <p className="text-center  w-full line-clamp-1 ">
                        {damages[item]}
                    </p>
                </label>
                <div className="relative text-center mx-auto flex justify-center items-center   w-full">
                    <input
                        type="file"
                        id={identifier}
                        accept="image/*"
                        // capture="camera"
                        className="w-0 h-0 opacity-0 absolute"
                        onChange={handleFileChange}
                    />
                    {selectedFile || formValues?.damages?.[item]?.photo ? (
                        <Image
                            src={
                                (selectedFile &&
                                    URL.createObjectURL(selectedFile)) ||
                                formValues?.damages?.[item]?.photo
                            }
                            width={200}
                            height={200}
                            alt="image"
                            className=" w-[125px] h-[125px] object-cover rounded-lg cursor-pointer"
                            onClick={() =>
                                document.getElementById(identifier).click()
                            }
                        />
                    ) : (
                        <label
                            htmlFor={identifier}
                            className="rounded-lg  w-[125px] h-[125px] bg-blue-500 flex items-center justify-center hover-bg-blue-600 text-white cursor-pointer"
                        >
                            {selectedFile ||
                            formValues?.damages?.[item]?.photo ? (
                                <Image
                                    src={
                                        (selectedFile &&
                                            URL.createObjectURL(
                                                selectedFile
                                            )) ||
                                        formValues?.damages?.[item]?.[property]
                                    }
                                    width={200}
                                    height={200}
                                    alt="image"
                                    className="w-full h-48 object-cover rounded-lg"
                                    onClick={() =>
                                        document
                                            .getElementById(identifier)
                                            .click()
                                    }
                                />
                            ) : (
                                "Upload Photo"
                            )}
                        </label>
                    )}
                </div>
                <button
                    type="submit"
                    className={`px-3  w-full     mx-auto my-2 py-1   hover-bg-opavariant-80   rounded text-sm text-white flex justify-between items-center ${
                        formValues?.damages?.[item]?.photo
                            ? "bg-green-500"
                            : "bg-indigo-700 "
                    }`}
                    onClick={handleUploadImage}
                >
                    <p className="w-full  ">
                        {imageUploadingStarted
                            ? "Uploading"
                            : formValues?.damages?.[item]?.photo
                            ? "Uploaded"
                            : "Upload"}
                    </p>
                    {imageUploadingStarted ? (
                        <div className="ml-3">
                            <ColorRing
                                visible={true}
                                height="25"
                                width="25"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={[
                                    "#e15b64",
                                    "#f47e60",
                                    "#f8b26a",
                                    "#abbd81",
                                    "#849b87",
                                ]}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                    {!imageUploadingStarted &&
                        formValues?.damages?.[item]?.photo && (
                            <FontAwesomeIcon
                                icon={faCheckDouble}
                                style={{ color: "#00ff11" }}
                                className="w-[20px] h-[20px] ml-2"
                            />
                        )}
                </button>
            </div>
        </div>
    );
};

const Damages = () => {
    const { formValues, setFormValues } = formStore();
    const { checkedItems, setCheckedItems } = damageStore();

    return (
        <section>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    select damages
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <div className="rounded-md w-[100%] border border-gray-300 mx-auto ">
                        <DamagesPopup
                            checkedItems={checkedItems}
                            setCheckedItems={setCheckedItems}
                        />
                    </div>
                </div>
            </div>
            <p className="block ml-1 mb-1 text-sm font-medium text-gray-900  ">
                select damages
            </p>
            <div className="flex  bg-gray-100 px-1 w-full items-center gap-5 overflow-scroll">
                {checkedItems.map((item, index) => (
                    <div key={index}>
                        {" "}
                        <ImageUploader2 index={index} item={item} />
                {/* <subDamagePopup selectedDamage={checkedItems} /> */}

                    </div>
                ))}
            </div>
            <button>
            </button>
        </section>
    );
};

export default Damages;
