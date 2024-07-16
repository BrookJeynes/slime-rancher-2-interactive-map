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

const slimes: { name: string, type: string }[] = [
    { name: "Pink", type: "Docile" },
    { name: "Tabby", type: "Docile" },
    { name: "Rock", type: "Harmful" },
    { name: "Ringtail", type: "Docile" },
    { name: "Phosphor", type: "Docile" },
    { name: "Hunter", type: "Docile" },
    { name: "Honey", type: "Docile" },
    { name: "Flutter", type: "Docile" },
    { name: "Crystal", type: "Harmful" },
    { name: "Cotton", type: "Docile" },
    { name: "Boom", type: "Harmful" },
    { name: "Batty", type: "Docile" },
    { name: "Angler", type: "Docile" },
    { name: "Dervish", type: "Docile" },
    { name: "Fire", type: "Harmful" },
    { name: "Gold", type: "Special" },
    { name: "Mosaic", type: "Harmful" },
    { name: "Puddle", type: "Docile" },
    { name: "Quantum", type: "Docile" },
    { name: "Rad", type: "Harmful" },
    { name: "Saber", type: "Docile" },
    { name: "Tangle", type: "Docile" },
    { name: "Lucky", type: "Special" },
    { name: "Tarr", type: "Hostile" },
    { name: "Glitch", type: "Special" },
    { name: "Yolky", type: "Docile" },
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
    Slimes: slimes.map(({ name, type }) => {
        return {
            name,
            type,
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
