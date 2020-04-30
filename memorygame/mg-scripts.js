let screenW = window.innerWidth; 
let screenH = window.innerHeight;

if (screenH > screenW) {
  $('.memory-card').css('width', '200px');
  $('.memory-card').css('height', '200px');
  $('.header').css('font-size', '30px');
  $('button').css('font-size', '40px');  
  $('span').css('font-size', '35px');  
  $('a').css('font-size', '35px');  
  $('.btn').css('font-size', '30px');    
}

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countMatch = 0;
let countAll = 0;
let countSec = 0;
let countMin = 0;
//let start, stop, stopper;
let interval;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;  

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    if (firstCard && countAll === 0) {
      //start = Date.now();
      interval = setInterval(Stopper, 1000);   
    }        
    return;
  }
  secondCard = this;
  checkForMatch();
}

function Stopper() {    
  countSec++;
    if (countSec > 59) {
      countSec = 0;
      countMin++;
    }       
  $('.header').text('Eltelt idő: '+countMin+':'+countSec+' | Próbálkozások: '+ countAll+' | Talált párok: '+countMatch);       
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    countMatch++;
    countAll++;
  }
  else {
    unflipCards();
    countAll++;    
  } 

  $('.header').text('Eltelt idő: '+countMin+':'+countSec+' | Próbálkozások: '+ countAll+' | Talált párok: '+countMatch);

  if (countMatch === 12) {
    //stop = Date.now();    
    //stopper = stop - start;    
     
    $('.header').css('color', 'blue');
    // $('.header').css('font-weight', 'bold');    
    $('.header').text('Ügyes vagy! Eltelt idő: '+countMin+':'+countSec+' | Próbálkozások: '+ countAll+' | Talált párok: '+countMatch);    
    lockBoard = true;
    // alert("ÜGYES VAGY!\n" + countAll + " próbálkozásból és \n"+ 
    // Math.floor(stopper/60000) +" perc "+ Math.floor((stopper/1000)%60) +
    // " másodperc alatt \nmegtaláltad az összes párt.");       
    clearInterval(interval);
    //reStart();    
  }  
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 24);    
    card.style.order = randomPos;
  });
}

function reStart() {  
  cards.forEach(card => card.classList.remove('flip'));  
  setTimeout(() => {
    countMatch = 0;
    countAll = 0;
    countSec = 0;
    countMin = 0;    
    resetBoard();
    cards.forEach(card => card.addEventListener('click', flipCard));  
    shuffle();
  }, 500);  
  clearInterval(interval);
  $('.header').text('Eltelt idő: 0:0 | Próbálkozások: 0 | Talált párok: 0');
  $('.header').css('color', 'black');
  $('.header').css('font-weight', 'normal');   
}

shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));

$('button').click(()=> {
  reStart();
});