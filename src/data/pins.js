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
  "Angler"
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
  "WildHoney"
];

export const pins = {
  Veggie: {
    name: 'Veggie',
    type: 'Food',
    icon: 'Pins/iconVeggieCarrot.png',
  },
  Fruit: {
    name: 'Fruit',
    type: 'Food',
    icon: 'Pins/iconFruitCuberry.png',
  },
  Animal: {
    name: 'Animal',
    type: 'Food',
    icon: 'Pins/iconBirdHen.png',
  },
  Cross: {
    name: 'Cross',
    type: 'Utility',
    icon: 'Pins/xMark.png',
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
};

plorts.forEach((plort) => {
  pins[`${plort} Plort`] = {
    name: `${plort} Plort`,
    type: "Plorts",
    icon: `Plort/iconPlort${plort}.png`
  }
})

resources.forEach(resource => {
  pins[`${resource}`] = {
    name: `${resource}`,
    type: "Resources",
    icon: `.Resources/iconCraft${resource}.png`
  }
})
