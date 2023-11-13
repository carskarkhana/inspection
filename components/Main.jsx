"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formData } from "@/data/formData";

import { calculatePercentageFilled } from "@/lib/handlers";

import { Oval } from "react-loader-spinner";

import { Line, Circle } from "rc-progress";

import CustomerDetails from "@/components/tabs/CustomerDetails";
import CarDetails from "@/components/tabs/CarDetails";
import CarLegalDetails from "@/components/tabs/CarLegalDetails";
import Photos from "@/components/tabs/Photos";
import Interior from "@/components/tabs/Interior";
import RoadTest from "@/components/tabs/RoadTest";
import Engine from "@/components/tabs/Engine";
import Front from "@/components/tabs/Front";
import Back from "@/components/tabs/Back";
import Left from "@/components/tabs/Left";
import Right from "@/components/tabs/Right";
import Damages from "@/components/tabs/Damages";

import formStore from "@/store/formStore";
import { toast } from "react-toastify";
import { uploadForm } from "@/api/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faEllipsisVertical,
    faV,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
    {
        id: 1,
        name: "Customer Details",
        component: <CustomerDetails />,
        field: "customerDetails",
    },
    {
        id: 2,
        name: "Car Details",
        component: <CarDetails />,
        field: "carDetails",
    },
    {
        id: 3,
        name: "Car Legal Details",
        component: <CarLegalDetails />,
        field: "carLegalDetails",
    },
    {
        id: 4,
        name: "Photos",
        component: <Photos />,
        field: "carPhotos",
    },
    {
        id: 5,
        name: "Interior",
        component: <Interior />,
        field: "interior",
    },
    {
        id: 6,
        name: "Road Test",
        component: <RoadTest />,
        field: "roadTest",
    },
    {
        id: 7,
        name: "Engine",
        component: <Engine />,
        field: "engine",
    },
    {
        id: 8,
        name: "Front",
        component: <Front />,
        field: "front",
    },
    {
        id: 9,
        name: "Back",
        component: <Back />,
        field: "back",
    },
    {
        id: 10,
        name: "Left",
        component: <Left />,
        field: "left",
    },
    {
        id: 11,
        name: "Right",
        component: <Right />,
        field: "right",
    },
    {
        id: 12,
        name: "Damages",
        component: <Damages />,
        field: "damages",
    },
];

// ******************** sidebar sheet ********************
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// ********************* alert dialog **********************
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AlertDialogDemo() {
    const handleNavigateToHomePage = () => {
        window.location.href = "/";
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="w-[25px] h-[25px]"
                />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. All progress so far will
                        be lost and you will be redirected to home page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-green-700">
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="bg-red-500"
                        onClick={handleNavigateToHomePage}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function SheetDemo() {
    const {
        activeTab,
        setActiveTab,
        formValues,
        setFormValues,
        formUploadingStarted,
        setFormUploadingStarted,
    } = formStore();

    const validateFormValues = () => {
        return calculatePercentageFilled(formValues) >= 0;
    };
    const handleSubmitForm = () => {
        console.log("formValues:  ", formValues);

        if (validateFormValues()) {
            setFormUploadingStarted(true);

            uploadForm(formValues)
                .then((res) => {
                    console.log("res:  ", res);
                    toast.success("Form submitted successfully");
                    setFormValues(formData);
                })
                .catch((err) => {
                    console.log("err:  ", err);
                    toast.error("Form submission failed");
                })
                .finally(() => {
                    setFormUploadingStarted(false);
                });
        } else {
            toast.error("Please fill all the required fields");
            return;
        }
    };

    return (
        <Sheet className="bg-gray-300 ">
            <SheetTrigger asChild>
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="w-[25px] h-[25px] px-5 pt-2 cursor-pointer  "
                />
            </SheetTrigger>
            <SheetContent className="">
                <SheetHeader>
                    <div className="flex   w-full justify-between items-center">
                        {" "}
                        <SheetTitle>Summary</SheetTitle>
                        <SheetClose asChild>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="w-[30px] h-[30px]"
                            />
                        </SheetClose>
                    </div>
                </SheetHeader>
                <div className="my-2 w-full ">
                    {tabs.map((tab, index) => (
                        <div
                            className={`flex-col w-full justify-center items-center shadow-lg border border-gray-100 my-1 pl-1 rounded-lg ${
                                activeTab === tab.id && "bg-green-400"
                            }`}
                            key={index}
                        >
                            <SheetClose
                                onClick={() => {
                                    setActiveTab(tab.id);
                                }}
                                className="  px-1   w-full"
                            >
                                <div className="flex justify-between items-center   w-full">
                                    <div className="flex justify-start items-center gap-4 mt-1   text-sm">
                                        <p>{tab.id}</p>
                                        <p>{tab.name}</p>
                                    </div>
                                    <div className="mr-1">
                                        <FontAwesomeIcon
                                            icon={faV}
                                            rotation={270}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <Line
                                    percent={calculatePercentageFilled(
                                        formValues[tab.field]
                                    )}
                                    strokeWidth={2}
                                    strokeColor={
                                        activeTab === tab.id
                                            ? "#1177FF"
                                            : "#39FF14"
                                    }
                                    trailColor="#D9D9D9"
                                    className="mt-1"
                                />
                            </SheetClose>
                        </div>
                    ))}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                    <button
                        type="button"
                        className="px-10 flex justify-evenly text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200   font-medium rounded-lg text-sm  py-2.5 text-center mr-2 mb-2"
                        onClick={handleSubmitForm}
                    >
                        <p>Submit</p>
                        <div>
                            {formUploadingStarted ? (
                                <div className="ml-3">
                                    <Oval
                                        height={20}
                                        width={20}
                                        color="blue"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                        ariaLabel="oval-loading"
                                        secondaryColor="white"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

//    *********************** MAIN COMPONENT ***********************
const Main = () => {
    const {
        formValues,
        setFormValues,
        activeTab,
        setActiveTab,
        formUploadingStarted,
        setFormUploadingStarted,
    } = formStore();

    const decreaseTab = () => {
        if (activeTab > 1) {
            setActiveTab(activeTab - 1);
        }
    };
    const increaseTab = () => {
        if (activeTab < tabs.length) {
            setActiveTab(activeTab + 1);
        }
    };

    useEffect(() => {
        console.log("formValues:  ", formValues);
    }, [formValues]);

    const validateFormValues = () => {
        return calculatePercentageFilled(formValues) >= 50;
        // return true;
    };
    const handleSubmitForm = () => {
        console.log("formValues:  ", formValues);

        if (validateFormValues()) {
            setFormUploadingStarted(true);

            uploadForm(formValues)
                .then((res) => {
                    console.log("res:  ", res);
                    toast.success("Form submitted successfully");
                    setFormValues(formData);
                })
                .catch((err) => {
                    console.log("err:  ", err);
                    toast.error("Form submission failed");
                })
                .finally(() => {
                    setFormUploadingStarted(false);
                });
        } else {
            toast.error("Please fill all the required fields");
            return;
        }
    };
    console.log("percentage: ", calculatePercentageFilled(formValues));
    return (
        <div className="px-1 h-full bg-white w-full ">
            <div className="flex-col justify-between items-center border-b border-gray-300 shadow pt-2 pb-2 w-full mx-auto ">
                <div className="flex justify-between items-center   w-full">
                    <AlertDialogDemo />
                    <p className="font-bold">Total Progress</p>

                    <SheetDemo />
                </div>
                <Line
                    percent={calculatePercentageFilled(formValues)}
                    strokeWidth={2}
                    strokeColor="#98C964"
                    trailColor="#D9D9D9"
                    className="mt-1"
                />
            </div>
            <h3 className="text-start pt-3 pb-2 font-bold text-gray-700 ">
                {tabs.find((tab) => tab.id === activeTab).name}
            </h3>
            <div className="">
                {tabs.map((tab) => {
                    if (tab.id === activeTab) {
                        return <div key={tab.id}>{tab.component}</div>;
                    }
                })}
            </div>
            <div className="w-full my-2  flex justify-around items-center py-2">
                <button
                    type="button"
                    disabled={activeTab === 1}
                    className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                        activeTab === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={decreaseTab}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className="px-10 flex text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200   font-medium rounded-lg text-sm  py-2.5 text-center mr-2 mb-2"
                    onClick={
                        activeTab === tabs.length
                            ? handleSubmitForm
                            : increaseTab
                    }
                >
                    {activeTab === tabs.length ? "Submit" : "Next"}
                    {formUploadingStarted ? (
                        <div className="ml-3">
                            <Oval
                                height={20}
                                width={20}
                                color="blue"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="white"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </button>
            </div>
        </div>
    );
};

export default Main;
