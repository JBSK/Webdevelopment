/**
 * Created by garfi on 15/12/2015.
 */
var cardsFlipped = 0;
var card1;
var card2;
var score = 1000;
var matches = 0;
var turns = 0;
var cardSets = 6;
var cardValues = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
updateResults();

window.onload = function(e){
    document.getElementById("restartBtn").addEventListener("click",resetMatch);
    shuffleCards();
};

function resetMatch(){
    console.log("reset");
    cardSets = document.getElementById("cardSets").value;
    addEmptyCardsToPage();
    flipCardsBack();
    setTimeout(function(){shuffleCards();},1000);
    cardsFlipped = 0;
    card1 = null;
    card2 = null;
    score = 1000;
    matches = 0;
    turns = 0;
    updateResults();
}

function addEmptyCardsToPage(){
    var totalCardString ="";
    var cardString =
        '<div class="col-xs-6 col-sm-3">'+
            '<div class="flip">'+
                '<div class="card">'+
                    '<div class="face front">'+
                        ''+
                    '</div>'+
                    '<div class="face back">'+
                        ''+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

    var cardContainer = document.getElementById("card-container");
    for(var i=0;i < cardSets*2;i++){
        totalCardString = totalCardString + cardString;
    }
    cardContainer.innerHTML = totalCardString;
}
function areCardsTurnable(boolean){
    var cardsToFlip = document.getElementsByClassName("card");
    if(boolean== true){
        for(var i=0;i < cardsToFlip.length;i++){
            cardsToFlip[i].addEventListener("click",turnCard)
        }
    }
    if(boolean == false){
        console.log("cards disabled");
        for(var j=0;j < cardsToFlip.length;j++){
            cardsToFlip[j].removeEventListener("click",turnCard);
        }
    }
}

function turnCard(){
    console.log(cardsFlipped);
    this.setAttribute("class","card flipped");
    console.log("flipping");
    cardsFlipped += 1;
    if(cardsFlipped == 1){
        card1 = this;
    }
    if(cardsFlipped == 2){
        areCardsTurnable(false);
        card2 = this;
        checkMatch(card1,card2)
    }
}

function checkMatch(card1,card2){
    card1Value = card1.innerHTML;
    card2Value = card2.innerHTML;
    if(card1Value == card2Value){
        cardsFlipped = 0;
        areCardsTurnable(true);
        matches++;
        setTimeout(function(){removeFromPage();},1000);
        if(matches == cardSets){
            setTimeout(function(){winScreen();},1000);
        }
    }
    else{
        setTimeout(function(){flipCardsBack(card1,card2);},1000);
        cardsFlipped = 0;
    }
    turns++;
    calculateScore()
}

function flipCardsBack(card1,card2){
    if(card1 != null && card2 != null) {
        card1.setAttribute("class", "card");
        card2.setAttribute("class", "card");
        areCardsTurnable(true);
    }
    else {
        var cardsToTurnBack = document.getElementsByClassName("card")
        for(var i=0; i < cardsToTurnBack.length; i++){
            cardsToTurnBack[i].setAttribute("class","card");
        }
    }
}

function calculateScore(){
    score = score-20;
    updateResults();
}

function shuffleCards(){
    console.log("shuffling cards");
    var cards = document.getElementsByClassName("card");
    putCardValuesInArray(cards);
    areCardsTurnable(true);
}

function putCardValuesInArray(cards){
    console.log(cardSets);
    var trimmedCardValues = cardValues.slice();//slice to prevent only being a reference to another array thus losing he value;
    trimmedCardValues.length = cardSets;
    console.log("trimmedCards after "+trimmedCardValues);
    for(i=0; i< cardSets; i++){
        trimmedCardValues[trimmedCardValues.length] = trimmedCardValues[i];
    }
    shuffle(trimmedCardValues);
    console.log(trimmedCardValues);
    addShuffledValuesToPage(trimmedCardValues);
}

function addShuffledValuesToPage(array){
    var totalCards = document.getElementsByClassName("card").length; // this is total sets
    console.log(document.getElementsByClassName("card").length);
    for(var i=0; i < totalCards;i++){
        document.getElementsByClassName("back")[i].innerHTML = array[i];
    }
}

function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp
    }
    return array;
}

function updateResults(){
    var scoreOnPage = document.getElementById("score");
    var turnsOnPage = document.getElementById("turns");
    var matchesOnPage = document.getElementById("matches");
    scoreOnPage.innerHTML = '<p>SCORE : '+score+'</p>';
    turnsOnPage.innerHTML = '<p>TURNS : '+turns+'</p>';
    matchesOnPage.innerHTML = '<p>MATCHES : '+matches+'</p>';
}
/*********keeping score stuck to top ***********/
$(window).scroll(function(e){
    var $el = $('#score-container');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 270 && !isPositionFixed){
        $('#score-container').css({'position': 'fixed', 'top': '50px'});
    }
    if ($(this).scrollTop() < 270 && isPositionFixed)
    {
        $('#score-container').css({'position': 'static', 'top': '0px'});
    }
});

function removeFromPage(){
    $(card1).parent().parent().hide('slow', function(){
        $(this).remove();
    });
    $(card2).parent().parent().hide('slow', function(){
        $(this).remove();
    });
}

function winScreen(){
    console.log("winner");
    $('#winModal').modal('toggle');
}