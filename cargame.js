const banner = document.querySelector('.banner');
const scoreBoard = document.querySelector('.scoreBoard');
const road = document.querySelector(".road");
// const highBoard = document.querySelector(".highBoard");

banner.style.left = `${(window.innerWidth/2)-200}px`;
let keypress = {
  ArrowUp : false,
  ArrowDown : false,
  ArrowLeft : false,
  ArrowRight : false
};
let count = 0; 
let player = [];
let speed = 5; 
let game_start = [{start : false}];
let finalScore = 0;
let score = localStorage.getItem("score");
if (score == null) {
  highScore = [];
}
else {
  highScore = JSON.parse(score);
}




document.getElementById('f').innerHTML = "Start Game";
document.getElementById('s').innerHTML =  ``;
document.getElementById('t').innerHTML = `click here to Start`;

document.addEventListener('keydown',(event)=>{
    keypress[event.key] = true;
})

document.addEventListener('keyup',(event)=>{
   keypress[event.key] = false;   
})

const createCar = () => {
}

const moveCar = () => {
  const car = road.querySelector('.car');
  let position = road.getBoundingClientRect();
  
    if(keypress.ArrowUp == true && player.y > 100){
      player.y -= speed;
     }
    else if(keypress.ArrowDown == true && player.y < (window.innerHeight-105)){
      player.y += speed ;
    }
    else if(keypress.ArrowLeft == true && player.x > 0 ){
      player.x -= speed;
    }
    else if(keypress.ArrowRight == true && player.x < position.width-80){
      player.x += speed;
    }
    car.style.top = `${player.y}px`;
    car.style.left = `${player.x}px`;
}

const moveLine = () =>{
    const line = document.querySelectorAll('.line');

    line.forEach((ele)=>{
     if(ele.y >= 750){
       ele.y -= 760;
     }
      ele.y += speed;
     ele.style.top = `${ele.y}px`;
    })
}

const getMax = (prev,current) =>{
  
    return Math.max(prev,current);
}

const moveEnemy = (carOB) =>{
  const enemy = document.querySelectorAll('.enemy');

  enemy.forEach((ele)=>{
    if(collision(carOB,ele)){
      
      game_start.start = false;
      banner.classList.remove('hide')
     
      if(highScore.length == 0){
         highScore.push({
           hScore : 0
         });
        updatehigh();
      }
      else{
       updatehigh();
      }
    }
    if(ele.y >= 750){
     ele.y = -300;
     ele.style.left = `${Math.floor(Math.random()*350)}px`;
    }
    ele.y += speed;
    ele.style.top = `${ele.y}px`;
  })
}
const updatehigh = () =>{
  let para1;
  highScore.forEach((ele)=>{
  para1 = ele.hScore;
  });
   let max = getMax(para1,finalScore);
   console.log(max);
   highScore.filter((ele)=>{
    ele.hScore == max ?  ele.hScore = max : ele.hScore = max+1;
    save();
   })
   highScore.forEach((ele)=>{
    document.querySelector('.highBoard').innerHTML = "High Score: "+ ele.hScore;
  })
}
const collision = (a,b) => {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)
     || (aRect.left > bRect.right) || (aRect.right < bRect.left))
}

const getColor = () =>{
   const c = () =>{
   let random =  Math.floor(Math.random()*256).toString(16);
   return ('0'+String(random)).substr(-2);
  }
   return c()+c()+c();
}

const play = () => {

  count = 0;
  road.innerHTML = "";
  banner.classList.add('hide')
  game_start.start = true;
 
  for(i=0;i<5;i++){
    const newLine = document.createElement('div');
    newLine.setAttribute('class','line');
    newLine.y = (i*150);
    newLine.style.top = `${i*150}px`;
    road.appendChild(newLine);
  }

  for(j=0;j<3;j++){
    const opCar = document.createElement('div');
    const enemyImg = document.createElement('img');
    enemyImg.setAttribute('class','enemyImg')
    enemyImg.src = 'logos/enemyCar.png';
    opCar.setAttribute('class','enemy');
    opCar.y = ((j+1)*350)*-1;
    opCar.style.top = `${j*150}px`;
    opCar.style.left = `${Math.floor(Math.random()*350)}px`;
    opCar.style.backgroundColor = "#"+getColor();
    road.appendChild(opCar);
    opCar.appendChild(enemyImg);
  }

  const newCar = document.createElement('div');
  const carImg = document.createElement('img');
  carImg.setAttribute('class','carImg')
  newCar.setAttribute('class','car');
  carImg.src = 'logos/car.png';
  road.appendChild(newCar);
  newCar.appendChild(carImg); 
  player.x = newCar.offsetLeft;
  player.y = newCar.offsetTop;  
  window.requestAnimationFrame(gamePlay);
}

banner.addEventListener('click',play);
const gamePlay = () =>{
  
  const car = document.querySelector('.car');  
 
  // moveCar(); 
  if(game_start.start){  
     
    moveLine();
    moveEnemy(car);
    moveCar();
    count += 1;
    scoreBoard.innerHTML = `Score : ${count}`;
    finalScore = count;
    // highScore.hScore = finalScore;
    //  save();
    // console.log(score);
    // console.log(highScore);
    document.getElementById('f').innerHTML = "Game Over";
    document.getElementById('s').innerHTML =  `Your Score is : ${finalScore} `;
    document.getElementById('t').innerHTML = `click here to restart`;
    window.requestAnimationFrame(gamePlay);  
  }
  
}
const save = () =>{
localStorage.setItem("score",JSON.stringify(highScore));
}
