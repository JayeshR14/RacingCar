const car1 = document.getElementById('car1');
const car2 = document.getElementById('car2');
const car3 = document.getElementById('car3');
const car4 = doument.getElementById('car4');
let i = 0;

function again()
{

while(i<=650)
{
  
  console.log(i);
 
  car1.style.top = 0 + `${i}`;
  car2.style.top = 0 + `${i}`;
  car3.style.top = 0 + `${i}`;
  car4.style.top = 0 + `${i}`;
  i++;
  if(i == 650)
  {
    console.log("hii man")
   start();

   i = 0;
  } 
}
}

function start()
{
  let j = 0;
while(j<10)
{
again();
j++;
}
j=0;
}
start()