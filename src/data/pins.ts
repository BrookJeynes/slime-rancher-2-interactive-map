import { Pins, PlotOptions, Resource } from "../types";

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
    "Yolky",
    "Shadow",
    "Twin",
    "Sloomber"
];

const fireSlime: Resource = {
    name: "Fire",
    type: "Harmful",
};

const puddleSlime: Resource = {
    name: "Puddle",
    type: "Docile",
};

export const yolkySlime: Resource = {
    name: "Yolky",
    type: "Docile",
};

export const shadowSlime: Resource = {
    name: "Shadow",
    type: "Docile",
};

// Add new slimes at the bottom and not in alphabetical order!
// If you add new resources in the middle of the list, you will break existing plans that are loaded from local storage.
const plannableSlimes: Resource[] = [
    { name: "Angler", type: "Docile" },
    { name: "Batty", type: "Docile" },
    { name: "Boom", type: "Harmful" },
    { name: "Cotton", type: "Docile" },
    { name: "Crystal", type: "Harmful" },
    { name: "Dervish", type: "Docile" },
    { name: "Flutter", type: "Docile" },
    { name: "Honey", type: "Docile" },
    { name: "Hunter", type: "Docile" },
    { name: "Phosphor", type: "Docile" },
    { name: "Pink", type: "Docile" },
    { name: "Ringtail", type: "Docile" },
    { name: "Rock", type: "Harmful" },
    { name: "Saber", type: "Docile" },
    { name: "Tabby", type: "Docile" },
    { name: "Tangle", type: "Docile" },
    { name: "Tarr", type: "Hostile" },
    yolkySlime,
    { name: "Sloomber", type: "Docile" },
    { name: "Twin", type: "Hostile" },


];

const slimes: Resource[] = [
    ...plannableSlimes,
    fireSlime,
    { name: "Glitch", type: "Special" },
    { name: "Gold", type: "Special" },
    { name: "Lucky", type: "Special" },
    { name: "Mosaic", type: "Harmful" },
    puddleSlime,
    { name: "Quantum", type: "Docile" },
    { name: "Rad", type: "Harmful" },
    shadowSlime
];

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
    "Twin",
    "Sloomber"
];

const resources: Resource[] = [
    { name: "AquaGlass", type: "Other" },
    { name: "BlackIndigonium", type: "Other" },
    { name: "BuzzWax", type: "Apiary" },
    { name: "DeepBrine", type: "Pump" },
    { name: "DreamBubble", type: "Other" },
    { name: "DriftCrystal", type: "Other" },
    { name: "Hexacomb", type: "Apiary" },
    { name: "Indigonium", type: "Drill" },
    { name: "JellyStone", type: "Drill" },
    { name: "LavaDust", type: "Pump" },
    { name: "LightningMote", type: "Other" },
    { name: "MagmaComb", type: "Other" },
    { name: "PepperJam", type: "Apiary" },
    { name: "PrimordyOil", type: "Pump" },
    { name: "RadiantOre", type: "Other" },
    { name: "RoyalJelly", type: "Other" },
    { name: "SilkySand", type: "Pump" },
    { name: "SlimeFossil", type: "Drill" },
    { name: "SpiralSteam", type: "Pump" },
    { name: "StormGlass", type: "Other" },
    { name: "StrangeDiamond", type: "Drill" },
    { name: "TinPetal", type: "Other" },
    { name: "WildHoney", type: "Apiary" },
];

// Add new foods at the bottom and not in alphabetical order!
// If you add new resources in the middle of the list, you will break existing plans that are loaded from local storage.
const meats: Resource[] = [
    { name: "Briar Hen", type: "Meat" },
    { name: "Hen Hen", type: "Meat" },
    { name: "Painted Hen", type: "Meat" },
    { name: "Roostro", type: "Meat" },
    { name: "Sea Hen", type: "Meat" },
    { name: "Stony Hen", type: "Meat" },
    { name: "Thundercluck", type: "Meat" },
    { name: "Candied Hen", type: "Meat" },
];

const fruits: Resource[] = [
    { name: "Cuberry", type: "Fruit" },
    { name: "Mint Mango", type: "Fruit" },
    { name: "Pogofruit", type: "Fruit" },
    { name: "Pomegranite", type: "Fruit" },
    { name: "Prickle Pear", type: "Fruit" },
    { name: "Polaricherry", type: "Fruit" },
];

const veggies: Resource[] = [
    { name: "Carrot", type: "Veggie" },
    { name: "Heart Beat", type: "Veggie" },
    { name: "Odd Onion", type: "Veggie" },
    { name: "Water Lettuce", type: "Veggie" },
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
        {
            name: "Stabilizer Gate",
            type: "Utility",
            icon: "iconMapStabilizerGate.png",
        },
        {
            name: "Shadow Plort Door",
            type: "Utility",
            icon: "iconMapShadowPlortDoor.png",
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
        };
    }),
    Resources: resources.map(({ name, type }) => {
        return {
            name,
            type,
            icon: `resources/iconCraft${name}.png`,
        };
    }),
};

export const plotTypes: PlotOptions[] = [
    {
        name: "Corral",
        type: "Slimes",
        optionsAName: "Slime A",
        optionsA: plannableSlimes.map(({ name, type }) => {
            return {
                name,
                type,
                icon: `icons/slimes/iconSlime${name}.png`,
            };
        }),
        optionsBName: "Slime B",
        optionsB: plannableSlimes.map(({ name, type }) => {
            return {
                name,
                type,
                icon: `icons/slimes/iconSlime${name}.png`,
            };
        }),
        upgrades: [
            "High Walls (250)",
            "Music Box (350",
            "Auto-Feeder (500)",
            "Air Net (425)",
            "Plort Collector (500)",
            "Solar Shied (425)",
        ],
        icon: "icons/plots/corral.png",
    },
    {
        name: "Coop",
        optionsAName: "Meat",
        type: "Meats",
        optionsA: [
            ...meats.map(({ name, type }) => {
                return {
                    name,
                    type,
                    icon: `icons/foods/meats/${(name.charAt(0).toLowerCase() + name.slice(1)).replace(
                        /\s/g,
                        ""
                    )}.png`,
                };
            }),
            { name: "Mixed Meats", type: "Meat", icon: "icons/foods/meats/mixedMeats.png" },
        ],
        optionsBName: "Yolky Slime",
        optionsB: [{ ...yolkySlime, icon: `icons/slimes/iconSlime${yolkySlime.name}.png` }],
        upgrades: [
            "High Walls (200)",
            "Spring Grass (425)",
            "Vitamizer (500)",
            "Elder Collector (1300)",
        ],
        icon: "icons/plots/coop.png",
    },
    {
        name: "Garden",
        type: "Fruit/Veggie",
        optionsAName: "Fruit/Veggie",
        optionsA: [
            ...fruits.map(({ name, type }) => {
                return {
                    name,
                    type,
                    icon: `icons/foods/fruits/${(name.charAt(0).toLowerCase() + name.slice(1)).replace(
                        /\s/g,
                        ""
                    )}.png`,
                };
            }),
            ...veggies.map(({ name, type }) => {
                return {
                    name,
                    type,
                    icon: `icons/foods/veggies/${(name.charAt(0).toLowerCase() + name.slice(1)).replace(
                        /\s/g,
                        ""
                    )}.png`,
                };
            }),
        ],
        upgrades: ["Nutrient Soil (350)", "Sprinkler (500)", "Scareslime (425)"],
        icon: "icons/plots/garden.png",
    },
    {
        name: "Incinerator",
        type: "Special",
        optionsAName: "Fire Slime",
        optionsA: [{ ...fireSlime, icon: `icons/slimes/iconSlime${fireSlime.name}.png` }],
        upgrades: ["Ash Trough (500)"],
        icon: "icons/plots/incinerator.png",
    },
    {
        name: "Pond",
        type: "Special",
        optionsAName: "Puddle Slime",
        optionsA: [{ ...puddleSlime, icon: `icons/slimes/iconSlime${puddleSlime.name}.png` }],
        upgrades: [],
        icon: "icons/plots/pond.png",
    },
    {
        name: "Silo",
        type: "Special",
        upgrades: ["Additional Storage (500)", "Additional Storage (575)", "Additional Storage (650)"],
        icon: "icons/plots/silo.png",
    },
];
