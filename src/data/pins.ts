import { Pins } from "../types";

const plorts = [
    "Pink",
    "Tabby",
    "Rock",
    "Ringtail",
    "Phosphor",
    "Hunter",
    "Honey",
    "Flutter",
    "Crystal",
    "Cotton",
    "Boom",
    "Batty",
    "Angler",
    "Dervish",
    "Fire",
    "Gold",
    "Mosaic",
    "Puddle",
    "Quantum",
    "Rad",
    "Saber",
    "Tangle",
]

const slimes: { name: string, type: string, plannable: boolean }[] = [
    { name: "Angler", type: "Docile", plannable: true },
    { name: "Batty", type: "Docile" , plannable: true},
    { name: "Boom", type: "Harmful" , plannable: true},
    { name: "Cotton", type: "Docile" , plannable: true},
    { name: "Crystal", type: "Harmful" , plannable: true},
    { name: "Dervish", type: "Docile" , plannable: true},
    { name: "Fire", type: "Harmful" , plannable: false},
    { name: "Flutter", type: "Docile" , plannable: true},
    { name: "Glitch", type: "Special" , plannable: false},
    { name: "Gold", type: "Special" , plannable: false},
    { name: "Honey", type: "Docile" , plannable: true},
    { name: "Hunter", type: "Docile" , plannable: true},
    { name: "Lucky", type: "Special" , plannable: false},
    { name: "Mosaic", type: "Harmful" , plannable: false},
    { name: "Phosphor", type: "Docile" , plannable: true},
    { name: "Pink", type: "Docile" , plannable: true},
    { name: "Puddle", type: "Docile" , plannable: false},
    { name: "Quantum", type: "Docile" , plannable: false},
    { name: "Rad", type: "Harmful" , plannable: false},
    { name: "Ringtail", type: "Docile" , plannable: true},
    { name: "Rock", type: "Harmful", plannable: true},
    { name: "Saber", type: "Docile" , plannable: true},
    { name: "Tabby", type: "Docile" , plannable: true},
    { name: "Tangle", type: "Docile" , plannable: true},
    { name: "Tarr", type: "Hostile", plannable: true },
    { name: "Yolky", type: "Docile", plannable: true },
]

const gordos = [
    "Pink",
    "Tabby",
    "Rock",
    "Ringtail",
    "Phosphor",
    "Hunter",
    "Honey",
    "Flutter",
    "Crystal",
    "Cotton",
    "Boom",
    "Batty",
    "Angler",
    "Dervish",
    "Gold",
    "Mosaic",
    "Quantum",
    "Rad",
    "Saber",
    "Tangle",
]

const resources: { name: string, type: string }[] = [
    { name: "BuzzWax", type: "Apiary" },
    { name: "DeepBrine", type: "Pump" },
    { name: "Hexacomb", type: "Apiary" },
    { name: "Indigonium", type: "Drill" },
    { name: "JellyStone", type: "Drill" },
    { name: "LavaDust", type: "Pump" },
    { name: "PepperJam", type: "Apiary" },
    { name: "PrimordyOil", type: "Pump" },
    { name: "RadiantOre", type: "Other" },
    { name: "SilkySand", type: "Pump" },
    { name: "SlimeFossil", type: "Drill" },
    { name: "SpiralSteam", type: "Pump" },
    { name: "StrangeDiamond", type: "Drill" },
    { name: "WildHoney", type: "Apiary" },
];

export const pins: Pins = {
    Food: [
        {
            name: "Carrot",
            type: "Veggie",
            icon: "pins/iconVeggieCarrot.png",
        },
        {
            name: "Cuberry",
            type: "Fruit",
            icon: "pins/iconFruitCuberry.png",
        },
        {
            name: "Hen",
            type: "Meat",
            icon: "pins/iconBirdHen.png",
        },
        {
            name: "Moondew",
            type: "Nectar",
            icon: "iconCategoryNectar.png",
        },
    ],
    Utility: [
        {
            name: "Cross",
            type: "Utility",
            icon: "pins/xMark.png",
        },
        {
            name: "Question Mark",
            type: "Utility",
            icon: "lockedIcon.png",
        },
        {
            name: "Map Node",
            type: "Utility",
            icon: "iconMapNode.png",
        },
        {
            name: "Treasure Pod",
            type: "Utility",
            icon: "iconTreasurePod.png",
        },
        {
            name: "Research Drone",
            type: "Utility",
            icon: "researchDroneFaceIcon.png",
        },
    ],
    Plorts: plorts.map((plort) => {
        return {
            name: `${plort} Plort`,
            type: "Plort",
            icon: `plorts/iconPlort${plort}.png`,
        };
    }),
    Slimes: slimes.map(({ name, type, plannable }) => {
        return {
            name,
            type,
            plannable,
            icon: `slimes/iconSlime${name}.png`,
        };
    }),
    Gordos: gordos.map((gordo) => {
        return {
            name: `${gordo}`,
            type: "Gordo",
            icon: `gordos/iconGordo${gordo}.png`,
        }
    }),
    Resources: resources.map(({ name, type }) => {
        return {
            name,
            type,
            icon: `resources/iconCraft${name}.png`,
        }
    }),
};
