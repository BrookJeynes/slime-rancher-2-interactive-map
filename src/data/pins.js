const plorts = ["Pink", "Tabby", "Rock", "Ringtail", "Phosphor", "Hunter", "Honey", "Flutter", "Crystal", "Cotton", "Boom", "Batty", "Angler"]

export const pins = {
  "Veggie": {
    name: "Veggie",
    type: "Food",
    icon: "./assets/icons/Pins/iconVeggieCarrot.png",
  },
  "Fruit": {
    name: "Fruit",
    type: "Food",
    icon: "./assets/icons/Pins/iconFruitCuberry.png" 
  },
  "Animal": {
    name: "Animal",
    type: "Food",
    icon: "./assets/icons/Pins/iconBirdHen.png"
  },

  "Cross": {
    name: "Cross",
    type: "Utility",
    icon: "./assets/icons/Pins/xMark.png"
  },
  "Question Mark": {
    name: "Question Mark",
    type: "Utility",
    icon: "./assets/icons/lockedIcon.png"
  },
  "Map Node": {
    name: "Map Node",
    type: "Utility",
    icon: "./assets/icons/iconMapNode.png"
  },
  "Treasure Pod": {
    name: "Treasure Pod",
    type: "Utility",
    icon: "./assets/icons/iconTreasurePod.png"
  },
  "Research Drone": {
    name: "Research Drone",
    type: "Utility",
    icon: "./assets/icons/researchDroneFaceIcon.png"
  }
}

plorts.forEach(plort => {
  pins[`${plort} Plort`] = {
    name: `${plort} Plort`,
    type: "Plort",
    icon: `./assets/icons/Plort/iconPlort${plort}.png`
  }
})
