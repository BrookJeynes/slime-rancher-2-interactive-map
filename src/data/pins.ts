import { Pin } from "../types";

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

const slimes = [
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
    "Lucky",
    "Tarr",
    "Glitch",
    "Yolky",
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

const resources = [
    "BuzzWax",
    "DeepBrine",
    "Hexacomb",
    "Indigonium",
    "JellyStone",
    "LavaDust",
    "PepperJam",
    "PrimordyOil",
    "RadiantOre",
    "SilkySand",
    "SlimeFossil",
    "SpiralSteam",
    "StrangeDiamond",
    "WildHoney",
];

export const pins: { [key: string]: Pin } = {
    Veggie: {
        name: 'Veggie',
        type: 'Food',
        icon: 'pins/iconVeggieCarrot.png',
    },
    Fruit: {
        name: 'Fruit',
        type: 'Food',
        icon: 'pins/iconFruitCuberry.png',
    },
    Animal: {
        name: 'Animal',
        type: 'Food',
        icon: 'pins/iconBirdHen.png',
    },
    Cross: {
        name: 'Cross',
        type: 'Utility',
        icon: 'pins/xMark.png',
    },
    'Question Mark': {
        name: 'Question Mark',
        type: 'Utility',
        icon: 'lockedIcon.png',
    },
    'Map Node': {
        name: 'Map Node',
        type: 'Utility',
        icon: 'iconMapNode.png',
    },
    'Treasure Pod': {
        name: 'Treasure Pod',
        type: 'Utility',
        icon: 'iconTreasurePod.png',
    },
    'Research Drone': {
        name: 'Research Drone',
        type: 'Utility',
        icon: 'researchDroneFaceIcon.png',
    },
    "Nectar": {
        name: "Nectar",
        type: "Food",
        icon: "iconCategoryNectar.png",
    }
};

plorts.forEach((plort) => {
    pins[`${plort} Plort`] = {
        name: `${plort} Plort`,
        type: "Plorts",
        icon: `plorts/iconPlort${plort}.png`,
    }
})

slimes.forEach((slime) => {
    pins[`${slime}`] = {
        name: `${slime}`,
        type: "Slimes",
        icon: `slimes/iconSlime${slime}.png`,
    }
})

gordos.forEach((gordo) => {
    pins[`${gordo}`] = {
        name: `${gordo}`,
        type: "Gordos",
        icon: `gordos/iconGordo${gordo}.png`,
    }
})

resources.forEach(resource => {
    pins[`${resource}`] = {
        name: `${resource}`,
        type: "Resources",
        icon: `resources/iconCraft${resource}.png`,
    }
})
