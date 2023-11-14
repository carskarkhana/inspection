
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


// *************************************************************************


export const monthsData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const registeredStatesData = [
    { state: "Gujarat", rtoCode: "GJ" },
    { state: "Goa", rtoCode: "GA" },

    { state: "Delhi", rtoCode: "DL" },
    { state: "Andhra Pradesh", rtoCode: "AP" },
    { state: "Arunachal Pradesh", rtoCode: "AR" },
    { state: "Assam", rtoCode: "AS" },
    { state: "Bihar", rtoCode: "BR" },
    { state: "Chhattisgarh", rtoCode: "CG" },
    { state: "Haryana", rtoCode: "HR" },
    { state: "Himachal Pradesh", rtoCode: "HP" },
    { state: "Jharkhand", rtoCode: "JH" },
    { state: "Karnataka", rtoCode: "KA" },
    { state: "Kerala", rtoCode: "KL" },
    { state: "Madhya Pradesh", rtoCode: "MP" },
    { state: "Maharashtra", rtoCode: "MH" },
    { state: "Odisha", rtoCode: "OD" },
    { state: "Punjab", rtoCode: "PB" },
    { state: "Rajasthan", rtoCode: "RJ" },
    { state: "Tamil Nadu", rtoCode: "TN" },
    { state: "Telangana", rtoCode: "TS" },
    { state: "Uttar Pradesh", rtoCode: "UP" },
    { state: "Uttarakhand", rtoCode: "UK" },
    { state: "West Bengal", rtoCode: "WB" },
];
export const registeredStatesDataOld = [
    { state: "Delhi", rtoCode: "DL" },
    { state: "Andhra Pradesh", rtoCode: "AP" },
    { state: "Arunachal Pradesh", rtoCode: "AR" },
    { state: "Assam", rtoCode: "AS" },
    { state: "Bihar", rtoCode: "BR" },
    { state: "Chhattisgarh", rtoCode: "CG" },
    { state: "Goa", rtoCode: "GA" },
    { state: "Gujarat", rtoCode: "GJ" },
    { state: "Haryana", rtoCode: "HR" },
    { state: "Himachal Pradesh", rtoCode: "HP" },
    { state: "Jharkhand", rtoCode: "JH" },
    { state: "Karnataka", rtoCode: "KA" },
    { state: "Kerala", rtoCode: "KL" },
    { state: "Madhya Pradesh", rtoCode: "MP" },
    { state: "Maharashtra", rtoCode: "MH" },
    { state: "Manipur", rtoCode: "MN" },
    { state: "Meghalaya", rtoCode: "ML" },
    { state: "Mizoram", rtoCode: "MZ" },
    { state: "Nagaland", rtoCode: "NL" },
    { state: "Odisha", rtoCode: "OD" },
    { state: "Punjab", rtoCode: "PB" },
    { state: "Rajasthan", rtoCode: "RJ" },
    { state: "Sikkim", rtoCode: "SK" },
    { state: "Tamil Nadu", rtoCode: "TN" },
    { state: "Telangana", rtoCode: "TS" },
    { state: "Tripura", rtoCode: "TR" },
    { state: "Uttar Pradesh", rtoCode: "UP" },
    { state: "Uttarakhand", rtoCode: "UK" },
    { state: "West Bengal", rtoCode: "WB" },
];

export const chassisData = [
    "Chassis Damage",
    "Non Traceable",
    "Chassis Imprint Missing",
    "Chassis Number Rusted",
    "Floor Matting Rusted",
];

export const brandModels = {
    MercedesBenz: [
        "Mercedes-Benz A CLASS LIMOUSINE",
        "Mercedes-Benz C Class",
        "Mercedes-Benz E Class",
        "Mercedes-Benz GLA Class",
        "Mercedes-Benz S Class",
        "Mercedes-Benz G Class",
        "Mercedes-Benz GLC CLASS",
        "Mercedes-Benz GLC COUPE",
        "Mercedes-Benz GLE",
        "Mercedes-Benz GLS",
        "Mercedes-Benz Ml Class",
        "Mercedes-Benz CLS Class",
        "Mercedes-Benz GL Class",
        "Mercedes-Benz R Class",
        "Mercedes-Benz SLK Class",
    ],
    Ssangyong: ["Ssangyong Rexton"],
    Skoda: [
        "Skoda ctavia",
        "Skoda Rapid",
        "Skoda Kodiaq",
        "Skoda KUSHAQ",
        "Skoda Superb",
        "Skoda YetI",
        "Skoda Salvia",
        "Skoda Kamiq",
    ],
    Renault: ["Renault Duster", "Renault Kwid", "Renault TRIBER"],
    Nissan: [
        "Nissan MAGNITE",
        "Nissan Sunny",
        "Nissan Kicks",
        "Nissan Terrano,",
    ],
    Citroen: ["CITROEN C5 AIRCROSS", "CITROEN C3"],
    "Land Rover": [
        "Land Rover Discovery",
        "Land Rover Range Rover",
        "Land Rover Range Rover Evoque",
        "Land Rover DISCOVERY SPORT",
        "Land Rover Range Rover Sport",
        "Land Rover RANGE ROVER VELAR",
    ],
    Porsche: [
        "Porsche Cayenne",
        "Porsche Panamera",
        "Porsche 718",
        "Porsche 911",
        "Porsche CAYENNE COUP",
        "Porsche Macan",
    ],
    Mitsubishi: [
        "Mitsubishi Lancer",
        "Mitsubishi Outlander",
        "Mitsubishi Pajero",
        "Mitsubishi Pajero Sport",
        "Mitsubishi Cedia",
        "Mitsubishi Montero",
    ],
    Maruti: [
        "Maruti Suzuki Alto",
        "Maruti Suzuki Alto 800",
        "Maruti Suzuki Alto K10",
        "Maruti Suzuki Baleno",
        "Maruti Suzuki Celerio",
        "Maruti Suzuki Celerio X",
        "Maruti Suzuki Ciaz",
        "Maruti Suzuki Dzire",
        "Maruti Suzuki Eeco",
        "Maruti Suzuki Ignis",
        "Maruti Suzuki S Cross",
        "Maruti Suzuki S Presso",
        "Maruti Suzuki Wagon R",
        "Maruti Suzuki XL6",
        "Maruti Suzuki Vitara Brezza",
        "Maruti Suzuki Swift",
        "Maruti Suzuki Omini",
        "Maruti Suzuki Ritz",
        "Maruti Suzuki SX4",
        "Maruti Suzuki Estilo",
        "Maruti Suzuki A Star",
    ],
    Honda: [
        "Honda City",
        "Honda Civic",
        "Honda CR-V",
        "Honda WRV",
        "Honda BR V",
        "Honda Brio",
        "Honda Amaze",
        "Honda Mobilio",
        "Honda Jazz",
    ],
    Tata: [
        "Tata Manza",
        "Tata Nano",
        "Tata Aria",
        "Tata Safari",
        "Tata New Safari",
        "Tata Safari Stome",
        "Tata Bolt",
        "Tata Zest",
        "Tata Hexa",
        "Tata Tiago",
        "Tata Nexon",
        "Tata Tigor",
        "Tata Harrier",
        "Tata Altroz",
        "Tata Punch",
    ],
    Hyundai: [
        "Hyundai Accent",
        "Hyundai Getz Prime",
        "Hyundai I10",
        "Hyundai I20",
        "Hyundai Santro Xing",
        "Hyundai Verna",
        "Hyundai Santa Fe",
        "Hyundai Eon",
        "Hyundai New Elentra",
        "Hyundai Grand i10",
        "Hyundai Elite i20",
        "Hyundai Xcent",
        "Hyundai Creta",
        "Hyundai i20 Active",
        "Hyundai Tucson",
        "Hyundai New Santro 1.1",
        "Hyundai I20 New",
        "Hyundai NEW I20 N Line",
        "Hyundai AURA",
        "Hyundai Alcazar",
        "Hyundai Grand i10 Nios",
    ],
    Audi: [
        "Audi A4",
        "Audi A6",
        "Audi Q3",
        "Audi Q5",
        "Audi A3",
        "Audi A5",
        "Audi A8L",
        "Audi R8",
        "Audi RS 5",
        "Audi RS 7",
        "Audi S5",
        "Audi TT",
        "Audi RS 5",
    ],
    BMW: [
        "BMW 3 Series",
        "BMW 5 Series",
        "BMW X1",
        "BMW X3",
        "BMW X3",
        "BMW 6 Series",
        "BMW 7 Series",
        "BMW Z4",
        "BMW Mini",
        "BMW X4",
        "BMW X5",
    ],
    Chevrolet: [
        "Chevrolet Beat",
        "Chevrolet Cruze",
        "Chevrolet Sail",
        "Chevrolet Spark",
        "Chevrolet Tavera",
        "Chevrolet Captiva",
        "Chevrolet Enjoy",
        "Chevrolet Sail UVA",
        "Chevrolet aveo",
        "Chevrolet Aveo UVA",
    ],
    Ford: [
        "Ford Endeavour",
        "Ford Ecosport",
        "Ford New Figo",
        "Ford Figo Aspire",
        "Ford Figo",
    ],
    Kia: ["Kia	SELTOS", "Kia	CARNIVAL", "Kia	SONET", "Kia	CARENS"],
    Mahindra: [
        "Mahindra Bolero",
        "Mahindra Scorpio",
        "Mahindra TUV300",
        "Mahindra Kuv100",
        "Mahindra XUV500",
        "Mahindra MARAZZO",
        "Mahindra SUPRO",
        "Mahindra Thar",
        "Mahindra TUV 300 PLUS",
        "Mahindra XUV 3OO",
    ],
    Datsun: ["Datsun Go", "Datsun Redi Go", "Datsun Go Plus"],
    Ferrari: ["Ferrari California", "Ferrari F12 Berlinetta"],
    Fiat: [
        "Fiat Linea",
        "Fiat Punto EVO",
        "Fiat Avvventura",
        "Fiat URBAN CROSS",
    ],
    MG: ["MG HECTOR", "MG HECTOR PLUS", "MG ASTOR", "MG GLOSTER", "MG ZS EV"],
    Jeep: [
        "Jeep Compass",
        "Jeep MERIDIAN",
        "Jeep WRANGLER",
        "Jeep GRAND CHEROKEE",
    ],
    Toyota: [
        "Toyota Fortuner",
        "Toyota Innova",
        "Toyota yaris",
        "Toyota corolla altis",
        "Toyota Hyrider",
        "Toyota Innova Crysta",
        "Toyota Glanza",
        "Toyota HILUX",
        "Toyota URBAN CRUISER",
        "Toyota URBAN CRUISER HYRYDER",
        "Toyota VELLFIRE",
    ],
    Volkswagen: [
        "Volkswagen	Polo",
        "Volkswagen	Vento",
        "Volkswagen	T-ROC",
        "Volkswagen	TIGUAN",
        "Volkswagen	Ameo",
    ],
    Volvo: [
        "Volvo S60",
        "Volvo XC 60",
        "Volvo S90",
        "Volvo XC 60",
        "Volvo V90 CROSS COUNTRY",
        "Volvo XC 40",
    ],
};


// for main.jsx
export const tabs = [
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


// components tab back .js items
export const items = {
    dickyDoorConditions: [
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
        "Damage",
        "XX - Part Replaced in Dicky Door",
    ],
    rearWindscreenConditions: [
        "O - Original",
        "G1 - Glass Scratches",
        "G2 - Glass Broken",
        "G3 - Glass Replaced",
        "G4 - Glass Chipped",
    ],
    rearBumperConditions: [
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
        "Damage",
        "XX - Part Replaced in Rear Bumper",
    ],
    spareWheelRimConditions: [
        "Holes",
        "Dent",
        "Corrosion",
        "Replace",
        "Repaired",
        "Missing",
    ],
    spareWheelTyreCondition: [
        "Less Than 1.6 mm",
        "1.6 to 2 mm",
        "2.1 to 3 mm",
        "3.1 to 4 mm",
        "4.1 to 5 mm",
        "5.1 to 6 mm",
        "6.1 to 7 mm",
        "7.1 to 8 mm",
    ],
};

// componet - tab - damages.js
export const damages = {
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


// component - tabs - engine.js
export const engineItems = {
    exhaustSmokeCondition: ["Black Smoke", "White Smoke", "Blue Smoke"],
    turboCondition: [
        "Non-functional",
        "Whistling noise",
        "Noisy",
        "Leaking",
        "Missing",
    ],
    intercoolerCondition: [
        "Replaced",
        "Radiator damaged",
        "Fan damaged",
        "Repaired",
        "Fluids low",
        "Missing components",
        "Leaking",
        "Contaminated coolant",
        "Hoses damaged",
    ],
    silencerCondition: [
        "Holes",
        "Dent",
        "Corrosion",
        "Replaced",
        "Repaired",
        "Noisy Exhaust",
        "Missing",
    ],
    alternatorCondition: [
        "Corrosion",
        "Damaged",
        "Replaced",
        "Noisy Alternator",
        "Non-Functional Alternator",
        "Missing",
    ],
    radiatorCondition: [
        "Contaminated Coolant",
        "Radiator damaged",
        "Fan Damage Repaired",
        "Replaced",
        "Fluids Low",
        "Missing Components",
        "Leaking",
        "Hoses Damage",
    ],
    engineLeakSummary: [
        "Injector Leak",
        "Gearbox Leak",
        "Differential Leak",
        "Radiator Coolant Leak",
        "Valve Cover Leak",
        "Oil Sludge",
        "Power Steering Oil Leak",
        "Oil Sump Leak",
    ],
};
