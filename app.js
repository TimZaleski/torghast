let userInput = false;

let currentMonsters = [];

let monsters = [
   {
    name: 'Mawsworn Guard',
    img: ['resources/images/mawswornGuard.webp'],
    totalHealth: 20,
    locations: ['Upper Reaches']
  },
  {
    name: 'Mawsworn Darkcaster',
    img: ['resources/images/mawCaster1.webp', 'resources/images/mawCaster2.webp','resources/images/mawCaster3.webp'],
    totalHealth: 10,
    locations: ['Upper Reaches']
  },
  {
    name: 'Mawsworn Seeker',
    img: ['resources/images/mawswornSeeker.webp'],
    totalHealth: 10,
    locations: ['Upper Reaches', 'Skoldus Hall']
  },
]
 
let levels = [
  { name: 'Upper Reaches',
    img: 'resources/images/bgUpperReaches.png'
  },
  { name: 'Skoldus Hall',
    img: 'resources/images/bgSkoldusHall.png'
  },
];

let currentLevel = "";

setLevel();
runGame();

function runGame()
{
  awaitKey(); 
} 
    

  async function awaitKey() {
    await waitingKeypress();

    let locationMonsters = Array.from(monsters.filter(a => a.locations.includes(currentLevel)));

    addMonster(locationMonsters[randomIndexOfArray(locationMonsters)].name);
    
    updateMonstersState();
    requestAnimationFrame(runGame);
  }

function waitingKeypress() {
  return new Promise((resolve) => {
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      resolve();
    }
  });
}

function setLevel()
{
  currentLevel = levels[randomIndexOfArray(levels)].name;
  let img = document.getElementById("bgImage");
 // img.src = levels[randomIndexOfArray(levels)].img;

}

function addMonster(monsterName)
{
   if (currentMonsters.length < 3)
   {
    var index = monsters.findIndex(p => p.name == monsterName)
    
     currentMonsters.push(monsters[index]);
     let currentIndex = currentMonsters.length - 1;
     currentMonsters[currentIndex].currentHealth = currentMonsters[currentIndex].totalHealth;
     currentMonsters[currentIndex].currentImg = currentMonsters[currentIndex].img[randomIndexOfArray(currentMonsters[currentIndex].img)];
   }
}

function removeAllMonsters()
{
  currentMonsters = [];
}

function updateMonstersState()
{
  let container = document.getElementById("monsterCards");
  container.innerHTML = "";
  
  for (let i = 0; i < currentMonsters.length; i++)
  {
    let percentHealth = Math.ceil(currentMonsters[i].currentHealth / currentMonsters[i].totalHealth) * 100;
    if (percentHealth > 100)
    {
      percentHealth = 100;
    }
    if (percentHealth < 0)
    {
      percentHealth = 0;
    }

    container.innerHTML += `
    <div class="card transp">
              <img class="card-img-top" src="${currentMonsters[i].currentImg}" alt="${currentMonsters[i].name}">
              <div class="card-body">
                <h5 class="card-title text-center monster-name">${currentMonsters[i].name}</h5>
                <div class="enemyHealthBar">
                  <div class="enemyHealthPercent" style="width: ${percentHealth}%">
                  </div>
                </div>
              </div>
            </div>`
  }

}

function randomIndexOfArray(arr)
{
  return Math.floor(Math.random() * arr.length); 
}