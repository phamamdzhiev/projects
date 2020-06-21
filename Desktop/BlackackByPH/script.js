var cards = [];// 104 cards deck

//cards for creating two decks
//I created second deck with one array as the array will iterate all the content
var suits = ["spades", "hearts", "clubs", "diams","spades", "hearts", "clubs", "diams"];
var rank = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

var playerCard = []; //player two cards
var dealerCard = []; // dealer two cards

var cardCount = 0;
var myMoney = 50;
var endGame = false;
var message = document.getElementById('message');
var output = document.getElementById('output');
var dealerHolder = document.getElementById('dealerHolder');
var playerHolder = document.getElementById('playerHolder');
var playerPoints = document.getElementById('playerPoints');
var dealerPoints = document.getElementById('dealerPoints');
var levaValue = document.getElementById('leva');
document.getElementById('mybet').onchange = function () {
	"use strict";
  if (this.value < 0) {
    this.value = 0;
  }
  if (this.value > myMoney) {
    this.value = myMoney;
  }
  message.innerHTML = "Променихте залога на " + this.value + " BGN";
};

//loop for creating and pushing cards into decks

for (var s in suits) {
  for (var n in rank) {
  
  	
    var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
      
    var card = {
      icon: suits[s],
      cardnum: rank[n],
      cardvalue: cardValue
    };
    cards.push(card);
   }
  }
// second way to create second deck

/* 
var i;
for (i = 0; i < 2; i++)
{
for (var s in suits) {
 
  for (var n in rank) {
 
   
 
    var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
 
   
 
    var card = {
 
      icon: suits[s],
 
      cardnum: numb[n],
 
      cardvalue: cardValue
 
    }
 
    cards.push(card);
 
  }
 
}
}*/

function Start() {
  shuffleDeck(cards);
  dealNew();
  document.getElementById('start').style.display = 'none';
  levaValue.innerHTML = myMoney;
}

function dealNew() {
  dealerPoints.innerHTML = "[?]";
  playerCard = [];
  dealerCard = [];
  dealerHolder.innerHTML = "";
  playerHolder.innerHTML = "";
  var betValue = document.getElementById('mybet').value;
  if (betValue > myMoney) {
    window.alert('Нямате достатъчно пари! Презаредете страницата.');

    return false;
  }
  myMoney = myMoney - betValue;
  document.getElementById('leva').innerHTML = myMoney;
  document.getElementById('myactions').style.display = 'block';
  message.innerHTML = "Събери 21 точки и победи Дилъра <br/>";
  document.getElementById('mybet').disabled = true;
  deal();
  document.getElementById('btndeal').style.display = 'none';
}

function reDeal() {
  cardCount++;
  if (cardCount > 40) {
    shuffleDeck(cards);
    cardCount = 0;
  }
}

function deal() {
  for (x = 0; x < 2; x++) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, x);
    if (x == 0) {
      dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
    }
    reDeal();
    playerCard.push(cards[cardCount]);
    playerHolder.innerHTML += cardOutput(cardCount, x);
    reDeal();
  }
  var playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
    finnishGame();
  }
  playerPoints.innerHTML = playervalue;
}

function cardOutput(n, x) {
  var hpos = (x > 0) ? x * 60 + 100 : 100;
  return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;">  <div class="top-card suit">' + cards[n].cardnum + '<br></div>  <div class="content-card suit"></div>  <div class="bottom-card suit">' + cards[n].cardnum +
    '<br></div> </div>';
}

function cardAction(a) {

  switch (a) {
    case 'hit':
      getOneCard(); // add new card to players hand
      break;
    case 'stand':
      finnishGame(); // finish game and calculate points
      break;

    default:

      finnishGame(); 
  }
}

function getOneCard() {
  playerCard.push(cards[cardCount]);
  playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length - 1));
  reDeal();
  var rValu = checktotal(playerCard);
  playerPoints.innerHTML = rValu;
  if (rValu > 21) {
    message.innerHTML = "Играта свърши! Имате повече от 21 точки.<br/>";
    finnishGame();
  }
}

function finnishGame() {
  endGame = true;
  document.getElementById('btndeal').style.display = 'inline-block';
  document.getElementById('cover').style.display = 'none';
  document.getElementById('myactions').style.display = 'none';

  document.getElementById('mybet').disabled = false;
  var BlackJackPays = 1;
  var dealervalue = checktotal(dealerCard);
  dealerPoints.innerHTML = dealervalue;

  while (dealervalue < 17) {
    dealerCard.push(cards[cardCount]);
    dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length - 1));
    reDeal();
    dealervalue = checktotal(dealerCard);
    dealerPoints.innerHTML = dealervalue;
  }

  //Winner is...?
  var playervalue = checktotal(playerCard);
  if (playervalue == 21 && playerCard.length == 2) {
	document.querySelector(".not").style.display = "block";
    message.innerHTML = "Имате БЛЕКДЖЕК от първа ръка!";
    BlackJackPays = 2;
    
  }


  var betValue = parseInt(document.getElementById('mybet').value) * BlackJackPays;
  if ((playervalue < 22 && dealervalue < playervalue) || (dealervalue > 21 && playervalue < 22)) {
    message.innerHTML += '<span style="color:lime;"> Печелите! Спечелихте ' + betValue + ' BGN</span>';
    myMoney = myMoney + (betValue * 2);
  } 
   else if (playervalue > 21) {
    message.innerHTML += '<span style="color:red;"> Дилърът печели! Загубихте ' + betValue + ' BGN</span>';
  } else if (playervalue == dealervalue) {
    message.innerHTML += '<span style="color:blue;"> Равни! Няма победител</span>';
    myMoney = myMoney + betValue;
}
    else if (playervalue == 21) {
    	window.alert('Честито имате БЛЕКДЖЕК!<br/> Печелите! Спечелихте ' + betValue + ' BGN')
    myMoney = myMoney + (betValue * 2);
  } else {
    message.innerHTML += '<span style="color:red;">Дилърът спечели! Загубихте ' + betValue + ' BGN</span>';
  }
  playerPoints.innerHTML = playervalue;
  levaValue.innerHTML = myMoney;
}

function checktotal(arr) {
  var AceValue = 0;
  var hasAce = false;
  for (var i in arr) {
    if (arr[i].cardnum == 'A' && !hasAce) {
      hasAce = true;
      AceValue = AceValue + 10;
    }
    AceValue = AceValue + arr[i].cardvalue;
  }

  if (hasAce && AceValue > 21) {
    AceValue = AceValue + 1;
  }
  return AceValue;
}

function shuffleDeck(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function outputCard() {
  output.innerHTML += "<span style='color:" + cards[cardCount].backgroundColor + "'>" + cards[cardCount].cardnum + "&" + cards[cardCount].icon + ";</span>  ";
}