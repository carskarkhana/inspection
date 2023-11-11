export const formData2 = {
    // tab 1
    inspectionEngineerName: "",
    inspectionDate: "",
    inspectionLocation: "",
    vehicleId: "",
    regNumber: "",
    regYear: "",
    regMonth: "",
    mfgYear: "",

    // tab 2
    mfgMonth: "",
    inspectionPlace: "",
    isDuplicateKey: "",
    isInsurance: "",
    insuranceValidityDate: "",
    isCarScrapped: "",
    rtoState: "",
    isRtoNocIssued: "",

    // tab 3
    isUnderHypothecation: "",
    isCngOrLpg: "",
    carColor: "",
    roadTaxPaid: "",
    cubicCapacity: "",
    isRcAvailable: "",
    chassisNumberStatus: "",
};

export const formData = {
    // customer details
    inspectionEngineerName: "",
    inspectionDate: new Date(Date.now()).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }),
    qcApproved: false,
    customerDetails: {
        leadId: "",
        city: "",
        carLocation: "",
        registerationNumber: "",
    },

    // car details
    carDetails: {
        inspectionType: "",
        registerationCirtificate: {
            condition: "",
            remarks: "",
            photo: "",
        },
        registeredState: {},
        registerationYear: "",
        registerationDate: "",
        chassis: {
            number: "",
            photo: "",
        },

        engineNumber: "",
        carBrand: "",
        carModel: "",
        carVariant: "",
        fuelType: "",
        transmission: "",
        mileage: "",
        manufactureDate: "",
        cubicCapacity: "",
        carLength: "",

        numberOfOwners: "",
        roadTaxPaid: "",
        roadTaxValidityDate: "",
        numberOfKeys: "",
    },

    // car legal details
    carLegalDetails: {
        insurance: {
            hasInsurance: "",
            insuranceType: "",
            insuranceNumber: "",
            insuranceValidityDate: "",
            insuranceImage: "",
            remarks: "",
        },
    },

    // photos
    carPhotos: {
        exterior: {
            front: "",
            frontRight: "",
            frontLeft: "",
            right: "",
            back: "",
            backRight: "",
            backLeft: "",
            left: "",
            roof: "",
            engine: "",
            dickyDoorOpen: "",
            frontUnderbody: "",
            rearUnderbody: "",
        },
        engineTransmission: {
            engine: "",
            battery: "",
            coolant: "",
            gear: "",
        },
        interior: {
            odometer: "",
            interiorFrontRight: "",
            interiorRearRight: "",
            interiorRearBackside: "",
            roof: "",
        },
        other: {
            alloyWheels: "",
            spareTires: "",
            toolKit: "",
        },
        tire: {
            leftFrontTire: "",
            rightFrontTire: "",
            leftRearTire: "",
            rightRearTire: "",
            spareTire: "",
        },
    },
    interior: {
        warningLights: {
            condition: "",
            faults: "",
            photo: "",
        },

        dashboard: {
            condition: "",
            faults: "",
            photo: "",
        },
        roofInnerLining: {
            condition: "",
            faults: "",
            photo: "",
        },
        airConditioner: {
            condition: "",
            faults: "",
            photo: "",
        },
        musicSystem: {
            condition: "",
            faults: "",
            photo: "",
        },
        centralLock: {
            condition: "",
            faults: "",
            photo: "",
        },
        powerWindows: {
            condition: "",
            faults: "",
            photo: "",
        },
        floodExposure: {
            condition: "",
            faults: "",
            photo: "",
        },
        specialFeatures: [],
    },
    roadTest: {
        starterMotor: {
            condition: "",
            faults: "",
            photo: "",
        },
        steeringType: "",
        steeringFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        acceleratorFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        transmisionFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        brakeFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        suspensionFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        engineFunction: {
            condition: "",
            faults: "",
            photo: "",
        },
        engineNoise: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    engine: {
        youtubeVideoLink: "",
        exhaustSmoke: {
            condition: "",
            faults: "",
            photo: "",
        },
        turbo: {
            condition: "",
            faults: "",
            photo: "",
        },
        interCooler: {
            condition: "",
            faults: "",
            photo: "",
        },
        silencer: {
            condition: "",
            faults: "",
            photo: "",
        },
        backCompression: {
            condition: "",
            faults: "",
            photo: "",
        },
        alternator: {
            condition: "",
            faults: "",
            photo: "",
        },
        engineOil: {
            condition: "",
            faults: "",
            photo: "",
        },
        radiator: {
            condition: "",
            faults: "",
            photo: "",
        },
        engineLeak: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    front: {
        frontBumper: {
            condition: "",
            faults: "",
            photo: "",
        },
        bonnet: {
            condition: "",
            faults: "",
            photo: "",
        },
        frontWindscreen: {
            condition: "",
            faults: "",
            photo: "",
        },
        roof: {
            condition: "",
            faults: "",
            photo: "",
        },
        sunRoof: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    back: {
        dickyDoor: {
            condition: "",
            faults: "",
            photo: "",
        },
        rearWindscreen: {
            condition: "",
            faults: "",
            photo: "",
        },
        rearBumper: {
            condition: "",
            faults: "",
            photo: "",
        },

        spareWheelRim: {
            condition: "",
            faults: "",
            photo: "",
        },
        spareWheelTyre: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    left: {
        leftRunningBoard: {
            condition: "",
            faults: "",
            photo: "",
        },
        backLeftTyre: {
            condition: "",
            faults: "",
            photo: "",
        },
        leftQuarterPanel: {
            condition: "",
            faults: "",
            photo: "",
        },
        leftPillarA: {
            condition: "",
            faults: "",
            photo: "",
        },
        leftPillarB: {
            condition: "",
            faults: "",
            photo: "",
        },
        leftPillarC: {
            condition: "",
            faults: "",
            photo: "",
        },
        backLeftDoor: {
            condition: "",
            faults: "",
            photo: "",
        },
        frontLeftDoor: {
            condition: "",
            faults: "",
            photo: "",
        },
        fronLeftTyre: {
            condition: "",
            faults: "",
            photo: "",
        },
        frontLeftFender: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    right: {
        frontRightFender: {
            condition: "",
            faults: "",
            photo: "",
        },
        frontRightTyre: {
            condition: "",
            faults: "",
            photo: "",
        },

        backRightTyre: {
            condition: "",
            faults: "",
            photo: "",
        },
        rightPillarA: {
            condition: "",
            faults: "",
            photo: "",
        },
        rightPillarB: {
            condition: "",
            faults: "",
            photo: "",
        },

        rightPillarC: {
            condition: "",
            faults: "",
            photo: "",
        },
        frontRightDoor: {
            condition: "",
            faults: "",
            photo: "",
        },

        backRightDoor: {
            condition: "",
            faults: "",
            photo: "",
        },
        rightQuarterPanel: {
            condition: "",
            faults: "",
            photo: "",
        },
        rightRunningBoard: {
            condition: "",
            faults: "",
            photo: "",
        },
    },
    damages: {
        noDamagesFound: {
            remark: "",
            photo: "",
        },
        frontUpperMembraneBonnetPattiRepaired: {
            remark: "",
            photo: "",
        },
        quarterPanelRepaired: {
            remark: "",
            photo: "",
        },
        pillarRepaired: {
            remark: "",
            photo: "",
        },
        apronRepaired: {
            remark: "",
            photo: "",
        },
        damageInChassis: {
            remark: "",
            photo: "",
        },
        chassisRepaired: {
            remark: "",
            photo: "",
        },
        dickyFloorRepaired: {
            remark: "",
            photo: "",
        },
        damageInRunningBord: {
            remark: "",
            photo: "",
        },
        runningBordRepaired: {
            remark: "",
            photo: "",
        },
        dickyFloorReplaced: {
            remark: "",
            photo: "",
        },
        damageInDickyFloor: {
            remark: "",
            photo: "",
        },
        crossMembraneRepaired: {
            remark: "",
            photo: "",
        },
        damageInApron: {
            remark: "",
            photo: "",
        },
        damageInPillar: {
            remark: "",
            photo: "",
        },
        damageInQuarter: {
            remark: "",
            photo: "",
        },
        damageInFrontUpperMembraneBonnetPatti: {
            remark: "",
            photo: "",
        },
        damageInRoof: {
            remark: "",
            photo: "",
        },
        roofRepaired: {
            remark: "",
            photo: "",
        },
        damageInFrontLowerMembrane: {
            remark: "",
            photo: "",
        },
        frontLowerMembraneRepaired: {
            remark: "",
            photo: "",
        },
        damageInFenderWall: {
            remark: "",
            photo: "",
        },
        fenderWallRepaired: {
            remark: "",
            photo: "",
        },
        wheelRimDamage: {
            remark: "",
            photo: "",
        },
        carrierAssemblyBrokenDamagePlasticPart: {
            remark: "",
            photo: "",
        },
        carrierAssemblyReplacedPlasticPart: {
            remark: "",
            photo: "",
        },
        fireWallRusted: {
            remark: "",
            photo: "",
        },
        fireWallRepaired: {
            remark: "",
            photo: "",
        },
        cowlTopDamage: {
            remark: "",
            photo: "",
        },
        trunkFloorEndPanelDamage: {
            remark: "",
            photo: "",
        },
        trunkFloorEndPanelRepaired: {
            remark: "",
            photo: "",
        },
        seatSeatBeltCondition: {
            remark: "",
            photo: "",
        },
        airbagDeployed: {
            remark: "",
            photo: "",
        },
        airbagReplaced: {
            remark: "",
            photo: "",
        },
        headlampIssues: {
            remark: "",
            photo: "",
        },
        tailLampIssues: {
            remark: "",
            photo: "",
        },
        keyDamaged: {
            remark: "",
            photo: "",
        },
        tireDamaged: {
            remark: "",
            photo: "",
        },
    },
};
