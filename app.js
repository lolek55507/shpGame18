import { Bullet } from './bullets.js';
import { EnemyOne, EnemyTwo, } from './enemies.js';
import { EnemForPhaseThree, EnemTPTBullet } from './eneimesForPhaseHTT.js';

window.addEventListener('DOMContentLoaded', () => {
  
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const heart = document.getElementById('heart');
let canvasWidth = 1000;
let canvasHeight = 600;
let playerHeight = 600;
let playerWidth = 600;
const phaseSecEnemyA = document.getElementById('phaseSecEnemyA');
const phaseSecEnemyB = document.getElementById('phaseSecEnemyB');
const phaseSecEnemyC = document.getElementById('phaseSecEnemyC');
const thirdEnemy = document.getElementById('thirdEnemy');
const backLayer0 = document.getElementById('layer0');
const backLayer1 = document.getElementById('layer1');
const backLayer2 = document.getElementById('layer2');
const backLayer3 = document.getElementById('layer3');
const backLayer4 = document.getElementById('layer4');
const backLayer5 = document.getElementById('layer5');
const backLayer6 = document.getElementById('layer6');
const playerImage = document.getElementById('playerImage');
const enemyForStageOne = new Image();
enemyForStageOne.src = "assets/raven.png";
const boom = new Image();
boom.src = "assets/boom.png";
const enemyForPhaseTwo = document.getElementById('enemyForStageTwo');
const enemyForStageOneWidth = 271;
const enemyForStageOneHeight = 194;
const birdHeight = 100;
const birdWidth = 200;
const enemyTwoWidth = 100;
const enemyTwoHeight = 100;
const enemyTwoSpriteWidth = 218;
const enemyTwoSpriteHeight = 177;
const enemBulletHeight = 25;
const enemBulletWidth = 150;
let startingCoordinatesXForEnemyThree = 770;
let startingCoordinatesYForEnemyThree = 200;
let enemyThreeHeight = 200;
let enemyThreeWidth = 200;
let enemyThreeSpriteWidth = 501;
let enemyThreeSpriteHeight = 501;
let intervalForEnemyBullets;
let enemBullets = [];
let t;
let p = 0;
let greenPlane = new EnemForPhaseThree(thirdEnemy, enemyThreeWidth, enemyThreeHeight, enemyThreeSpriteWidth, enemyThreeSpriteHeight, startingCoordinatesXForEnemyThree, startingCoordinatesYForEnemyThree);
let w = 0;
let g = 0; // variable for deacreasing health
let c = 0;
let health = 3;
let score = 0;
let enemies = [];
let enemiesForPhaseTwo = [];
let backgroundPosX = 0;
let backgroundPosY = 0;
let playerPositionX = 10;
let playerPositionY = 10;
let bullets = [];
let spriteWidthForBoom = 100;
let spriteHeightForBoom = 90;
let spriteCoordXForBoom = 0;
let characterBulletSpeed = 20;
let characterBulletHeight = 10;
let characterBulletWidth = 20;
let imCoorX = canvasWidth - birdWidth + 150;
let boomAnimationDelay = 0;
let gameState = "resumed";
let phaseNumber = 3;
const boomSound = document.getElementById('boomSound');
 



  document.addEventListener('keydown', (e) => {
    if (gameState == 'resumed') {
    if(e.key === 's' || e.key === 'ArrowDown') {
     if (playerPositionY <  285) {
         playerPositionY = playerPositionY + 20;
     }
    }
    if(e.key === 'w' || e.key === 'ArrowUp') {
     if (playerPositionY > -245) {
         playerPositionY = playerPositionY - 20;
     }
     
    } 
    if(e.key === 'd' || e.key === 'ArrowRight') {
     if (playerPositionX < 620) {
         playerPositionX = playerPositionX + 20;
     }
    }
    if(e.key === 'a' || e.key === 'ArrowLeft') {
     if (playerPositionX > -220) {
         playerPositionX = playerPositionX - 20;
     }
    }
    console.log(playerPositionX, playerPositionY);
  } 
 });
 document.addEventListener('keyup', (e) => {
  if (gameState == 'resumed') {
   if (e.key === ' ') {
     bullets.push(new Bullet(playerPositionX, playerPositionY, playerWidth, playerHeight, characterBulletHeight));
     console.log(bullets);
     console.log(enemiesForPhaseTwo);
     
    }
    if (e.key === 'Escape') {
      gameState = 'paused';
      console.log(gameState);
      for (let i = bullets.length - 1; i >= 0; i--) { 
        console.log(bullets[i].placeX);
      }
      
      // Your code to handle the Escape key press
    }
  }
 })


    

 // animating game objects
    function animate() {
      if (gameState === 'resumed') {
      // animating the background
      ctx.drawImage(backLayer5, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer0, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer1, backgroundPosX, backgroundPosY, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer3, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer4, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer6, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backLayer2, backgroundPosX, backgroundPosY, canvasWidth, canvasHeight);
    ctx.drawImage(playerImage ,playerPositionX, playerPositionY, playerWidth, playerHeight);
    // health checking
    if (health === 3) {
      ctx.drawImage(heart, 60, 40, 40, 40);
      ctx.drawImage(heart, 100, 40, 40, 40);
      ctx.drawImage(heart, 140, 40, 40, 40);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('HP: ', 0, 70);
    } else if (health === 2) {
      ctx.drawImage(heart, 60, 40, 40, 40);
      ctx.drawImage(heart, 100, 40, 40, 40);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('HP: ', 0, 70);
    }
    else if (health === 1) {
      ctx.drawImage(heart, 60, 40, 40, 40);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('HP: ', 0, 70);
    } else if (health <= 0) {
      gameState = 'gameOver';
    }
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('score: ', 0, 100);
    ctx.fillText(score, 85, 102);
      // update the bullets that ve been drew
      for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update(characterBulletSpeed);
        bullets[i].draw('orange', characterBulletWidth, ctx, characterBulletHeight);
        if (bullets[i].placeX > canvasWidth + 800) {
          bullets.splice(i, 1);
        }
        if(enemies.length) {
          for (let j = enemies.length - 1; j >= 0; j--) {
              if (
                bullets[i].placeX < enemies[j].imageCoorX + birdWidth &&
                bullets[i].placeX + characterBulletWidth > enemies[j].imageCoorX &&
                bullets[i].placeY < enemies[j].imageCoorY + birdHeight &&
                bullets[i].placeY + characterBulletHeight > enemies[j].imageCoorY
              ) {
                  // Collision detected
                  while (spriteCoordXForBoom < 5) {
                      ctx.drawImage(
                          boom,
                          spriteCoordXForBoom * spriteWidthForBoom,
                          0,
                          spriteWidthForBoom,
                          spriteHeightForBoom,
                          enemies[j].imageCoorX,
                          enemies[j].imageCoorY,
                          200,
                          190
                      );
                      while (boomAnimationDelay < 2000000) {
                          boomAnimationDelay++;
                      }
  
                      boomAnimationDelay = 0;
                      spriteCoordXForBoom++;
                  }
                  spriteCoordXForBoom = 0;
                  boomSound.play();
  
                  bullets.splice(i, 1);
                  enemies.splice(j, 1);
                  score++;
                  console.log(score);
                  break; // Stop checking other enemies for this bullet
              }
                     // check if bullet off screen
       
        }
        
      }
   }
   // checking for collision between bullet and 2nd array
   for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update(characterBulletSpeed);
    bullets[i].draw('orange', characterBulletWidth, ctx, characterBulletHeight);
    for (let j = enemiesForPhaseTwo.length - 1; j >= 0; j--) { 
        if(bullets[i].placeX < enemiesForPhaseTwo[j].imageCoordX + enemyTwoWidth &&
          bullets[i].placeX  + characterBulletWidth > enemiesForPhaseTwo[j].imageCoordX &&
          bullets[i].placeY < enemiesForPhaseTwo[j].imageCoordY + enemyTwoHeight &&
          bullets[i].placeY + characterBulletHeight > enemiesForPhaseTwo[j].imageCoordY)  {
          console.log("collision");
          bullets.splice(i, 1);
          enemiesForPhaseTwo.splice(j, 1);
          score++;
          console.log(score);
          break;
        }
        if (enemiesForPhaseTwo[j].imageCoordX < -240) {
          enemiesForPhaseTwo.splice(j, 1);
          health--;
          console.log(health);
        }
    }
}
  // moving clouds
moveCloud();
if (phaseNumber == 1) {
  // drawing enemies 
for (let i = enemies.length - 1; i >= 0; i--) {
  enemies[i].update();
  enemies[i].draw(ctx);
  
  if (enemies[i].imageCoorX < -canvasWidth) {
    enemies.splice(i, 1);
    health--;
    console.log(health);
  }
  }

  for(let i = enemiesForPhaseTwo.length - 1; i >= 0; i--) {
    enemiesForPhaseTwo[i].update();
    enemiesForPhaseTwo[i].draw(ctx);
    
    }
    // spawning ne enemies
    if (enemiesForPhaseTwo.length === 0) {
    addNewEnemyForPhaseTwo();
    setTimeout(addNewEnemyForPhaseTwo, 200);
    setTimeout(addNewEnemyForPhaseTwo, 400);
    setTimeout(addNewEnemyForPhaseTwo, 600);
    setTimeout(addNewEnemyForPhaseTwo, 800);
    setTimeout(addNewEnemyForPhaseTwo, 1000);
    setTimeout(addNewEnemyForPhaseTwo, 1200);
    setTimeout(addNewEnemyForPhaseTwo, 1400);
    setTimeout(addNewEnemyForPhaseTwo, 1600);
    }
    if (score > 200) {
      phaseNumber = 2;
    }
} 
if (phaseNumber == 2) {
  ctx.drawImage(phaseSecEnemyA, 770, 0, 200, 200);
  if (p >= 5) {
    ctx.fillStyle = 'orange';
  ctx.fillRect(0, 40, canvasWidth - 230, 100);

  if (
    playerPositionY <= -110 
  ) {
    console.log('Collision with orange box');
    if (g < 30) {
      g++;
    } else if (g === 30) {
    health--;
    console.log('Health decreased');
    g = 0;
  }
    console.log(g);
  }

  }
  ctx.drawImage(phaseSecEnemyB, 770, 200, 200, 200);
  if (p == 0 && p < 5) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 250, canvasWidth -230, 100);
    if (
      playerPositionY <= 110 && 
      playerPositionY > -70
    ) {
      console.log('Collision with orange box');
      if (g < 30) {
        g++;
      } else if (g === 30) {
      health--;
      console.log('Health decreased');
      g = 0;
    }
    console.log(g);
    }
  }
  
  
  ctx.drawImage(phaseSecEnemyC, 770, 400, 200, 200);
  if (p >= 5) {
  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 450, canvasWidth -230, 100);
  if (
    playerPositionY >= 150 
  ) {
    console.log('Collision with orange box');
    if (g < 30) {
        g++;
      } else if (g === 30) {
      health--;
      console.log('Health decreased');
      g = 0;
    }
    console.log(g);
  }
  }
  if (c === 0) {
    playVarsForPhaseTwo();
    c++;
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
 if(bullets[i].placeX < 770 + 200 &&
  bullets[i].placeX + characterBulletWidth > 770 &&
  bullets[i].placeY < 0 + 200 &&
  bullets[i].placeY + characterBulletHeight > 0)  {
    score++;
  }
}

for (let i = bullets.length - 1; i >= 0; i--) {
  if(bullets[i].placeX < 770 + 80 &&
   bullets[i].placeX + characterBulletWidth > 770 &&
   bullets[i].placeY < 200 + 200 &&
   bullets[i].placeY + characterBulletHeight > 0)  {
     score++;
   }
 }
 for (let i = bullets.length - 1; i >= 0; i--) {
  if(bullets[i].placeX < 770 + 200 &&
   bullets[i].placeX + characterBulletWidth > 770 &&
   bullets[i].placeY < 400 + 200 &&
   bullets[i].placeY + characterBulletHeight > 0)  {
     score++;
     bullets.splice(i, 1);
   }
 }
 if (score >= 500) {
  phaseNumber = 3;
 } 
}
if (phaseNumber == 3) {
  greenPlane.draw(ctx);
  greenPlane.update();
  if (w == 0) {
    intervalForEnemyBullets = setInterval(addEnemBullet, 1000);
    w++;
  }
  for (let i = enemBullets.length - 1; i >= 0; i--) {
    enemBullets[i].draw(ctx);
    enemBullets[i].update();
    if (enemBullets[i].positionX < -200) {
      enemBullets.splice(i, 1);
    }
  } 
 }


// hanldes moving clouds
function moveCloud() {
  if (backgroundPosX == -1020) {
  backgroundPosX = canvasWidth ;
  backgroundPosY = 0;
  ctx.drawImage(backLayer1, backgroundPosX, backgroundPosY, canvasWidth / 3, canvasHeight / 3);
  ctx.drawImage(backLayer2, backgroundPosX, backgroundPosY, canvasWidth / 3, canvasHeight / 3);
  } else if (backgroundPosX > -1020) {
      backgroundPosX = backgroundPosX - 10;
  }
}

        }
        // game over and resume screens handlers
        if (gameState === 'paused') {
          ctx.fillStyle = 'white';
          ctx.fillRect(305, 215, 410, 110);
          ctx.fillStyle = 'black';
          ctx.fillRect(310, 220, 400, 100);
          ctx.font = '30px Arial';
          ctx.fillStyle = 'blue';
          ctx.fillText('Resume Game', 410, 280);

          document.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();

            let papx = e.clientX - rect.left;
            let papy = e.clientY - rect.top;
            console.log(papx, papy);
            if (papx > 305 && papx < 305 + 410 && papy > 215 && papy < 215 + 110) {
              gameState = "resumed";
              console.log('change here');
            }
          })
        }
        if (gameState === 'gameOver') {
          ctx.fillStyle = 'white';
          ctx.fillRect(305, 215, 410, 110);
          ctx.fillStyle = 'black';
          ctx.fillRect(310, 220, 400, 100);
          ctx.font = '30px Arial';
          ctx.fillStyle = 'blue';
          ctx.fillText('Play Again', 410, 280);

          document.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();

            let papx = e.clientX - rect.left;
            let papy = e.clientY - rect.top;
            console.log(papx, papy);
            if (papx > 305 && papx < 305 + 410 && papy > 215 && papy < 215 + 110) {
              gameState = "resumed";
              score = 0;
              health = 3;
              enemiesForPhaseTwo = [];
              enemies = [];
              phaseNumber = 1;
              console.log('change here');
            }
          })
        }
    
  requestAnimationFrame(animate);
    }
    boom.onload = () => {
      // This code will execute once the 'boom' image is loaded
      animate(); // Start your animation loop here, as you now know the image is loaded
    };
    // function to add enemies
  function addNewBird () {

   if (gameState == 'resumed') {
    let imCoorY = Math.random() * canvasHeight;
      if (imCoorY >= 285) {
        imCoorY = imCoorY - birdHeight;
      } else if (imCoorY <= -245) {
        imCoorY = imCoorY + birdHeight;
        imCoorX = canvasWidth + birdWidth;
      }
      enemies.push(
        new EnemyOne(
          enemyForStageOne,
          birdWidth,
          birdHeight,
          enemyForStageOneWidth,
          enemyForStageOneHeight,
          imCoorX,
          imCoorY
        )
      );
      console.log(
        enemies
      );
   }
      
    
  }
  // function to add enemies for phase 2
  function addNewEnemyForPhaseTwo () {
    let enemyForPhaseTwoPosX = 1000;
    let enemyForPhaseTwoPosY = 10;
    enemiesForPhaseTwo.push(new EnemyTwo(enemyForPhaseTwo, enemyTwoWidth, enemyTwoHeight, enemyTwoSpriteWidth, enemyTwoSpriteHeight, enemyForPhaseTwoPosX, enemyForPhaseTwoPosY));
  }
    document.addEventListener('visibilitychange', function() {
      gameState = 'paused';
    });
    if (phaseNumber == 1) {
    w = setInterval(addNewBird, 4000);
    }
    function playVarsForPhaseTwo() {
      t = setInterval(() => {
        if (p < 10) {
          p++;
        } 
        if (p == 10) {
          p = 0;
        }
      }, 1000)
    }
    function addEnemBullet() {
      enemBullets.push(new EnemTPTBullet(enemBulletWidth, enemBulletHeight, greenPlane.imageCoordX, greenPlane.imageCoordY + 100));
    }
})

  
