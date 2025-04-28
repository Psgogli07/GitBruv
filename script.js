let difficulty = 0;
let cardnumber = 0;
let startTime;
let timerInterval;
let errorCount = 0;
label = document.querySelector("label")



function StartGame(){
    if(difficulty != 0){
        const ul = document.querySelector("ul");
        GenerateCards();
        ShowALL()
        startTimer();
        ul.addEventListener("click", handleFlip);  
        document.querySelector("#noshowdiv").classList.add("noshowcss")
        button.disabled = true;
    }  
}

let showAllAbilityUsed = false; 
const showallcardbutton = document.querySelector("#showall")
showallcardbutton.addEventListener("click", () => {
    if (showAllAbilityUsed) return; 

    showAllAbilityUsed = true;
    ShowALL();
    showallcardbutton.disabled = true; 
});

// ------------------------------------------ kepesseg -------------------------------------------

const ability = document.querySelector("#ability")
ability.addEventListener("click", useAbility);
let abilityUsed = false;
function useAbility() {
    if (abilityUsed) return;
    abilityUsed = true;
    const hiddenCards = Array.from(document.querySelectorAll(".card"))
        .filter(card => card.style.visibility !== "hidden");

    if (hiddenCards.length < 2) return;

    const randomIndex = Math.floor(Math.random() * hiddenCards.length);
    const randomCard = hiddenCards[randomIndex];
    const randomCardImg = randomCard.querySelector("img").src;

    const pairCard = hiddenCards.find(card => 
        card !== randomCard && card.querySelector("img").src === randomCardImg
    );

    if (pairCard) {
        revealAndRemovePair(randomCard, pairCard);
    }

    ability.disabled = true;
}

function revealAndRemovePair(card1, card2) {
    const front1 = card1.querySelector(".front");
    const back1 = card1.querySelector(".back");

    const front2 = card2.querySelector(".front");
    const back2 = card2.querySelector(".back");
    front1.classList.add("flipped");
    back1.classList.remove("flipped");

    front2.classList.add("flipped");
    back2.classList.remove("flipped");
    setTimeout(() => {
        card1.style.visibility = "hidden";
        card2.style.visibility = "hidden";
    }, 1500);
}


function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTime) / 1000);
    document.querySelector("#timer").innerHTML = `<div>Idő: ${elapsedTime} mp</div>`;
}
// -------------------------------------- megmutatja az osszeset -------------------------------------

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function ShowALL() {
    const cards = document.querySelectorAll(".card");
    lockBoard = true; 

    cards.forEach(card => {
        const front = card.querySelector(".front");
        const back = card.querySelector(".back");
        front.classList.add("flipped");
        back.classList.remove("flipped");
    });

    setTimeout(() => {
        cards.forEach(card => {
            const front = card.querySelector(".front");
            const back = card.querySelector(".back");

            front.classList.remove("flipped");
            back.classList.add("flipped");
        });
        lockBoard = false; 
    }, 3000); 
}

//------------------- forditas ---------------------------------------

function handleFlip(e) {
    const card = e.target.closest(".card");
    if (!card || lockBoard) return;

    if (card === firstCard) return; 

    const front = card.querySelector(".front");
    const back = card.querySelector(".back");

    front.classList.add("flipped");
    back.classList.remove("flipped");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true; 

        checkForMatch();
    }
}

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", RestartGame);

function RestartGame() {
    location.reload();
}

//-------------------------------- megnezi hogy uygan az e -----------------------------------------

function checkForMatch() {
    const firstImage = firstCard.querySelector("img").src;
    const secondImage = secondCard.querySelector("img").src;

    if (firstImage === secondImage) {
        console.log("jó!");
        setTimeout(() => {
            firstCard.style.visibility = "hidden";
            secondCard.style.visibility = "hidden";
            if (document.querySelectorAll(".card[style='visibility: hidden;']").length === cardnumber) {
                clearInterval(timerInterval);
                document.querySelector("#restart").style.display = "block";
            }
            resetBoard();
        }, 500);
    } else {
        console.log("nem jó!");
        errorCount++;
        console.log(`Hibák száma: ${errorCount}`);
        document.querySelector("#errors").innerHTML = `<div>Hibák: ${errorCount}</div>`;
        setTimeout(() => {
            unflipCards();
        }, 1000);
    }
}

function unflipCards() {
    const firstFront = firstCard.querySelector(".front");
    const firstBack = firstCard.querySelector(".back");

    const secondFront = secondCard.querySelector(".front");
    const secondBack = secondCard.querySelector(".back");

    firstFront.classList.remove("flipped");
    firstBack.classList.add("flipped");

    secondFront.classList.remove("flipped");
    secondBack.classList.add("flipped");

    resetBoard();
}

function resetBoard() {
    firstCard = null;
    secondCard = null,
    lockBoard = false;
}

function Difficulty(){
    const radios = document.getElementsByName("difficulty");
    for (const radio of radios) {
        if (radio.checked) {
          difficulty = radio.value;
        }
    }

    if(difficulty == 1){
        cardnumber = 8
    }else if(difficulty == 2){
        cardnumber = 12
    }
    else if(difficulty == 3){
        cardnumber = 14
    }
    
    StartGame();
}

function randint(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function GenerateCards(){
    let cardsarray = [];
    for(let i = 1; i < cardnumber/2+1; i++){
        cardsarray.push(i)
        cardsarray.push(i)
    }
    MixCards(cardsarray);
}

function MixCards(array){
    for (let i = 0; i < array.length - 1; i++) {
        let ran = randint(i + 1, array.length - 1);
        let temp = array[i];
        array[i] = array[ran]; 
        array[ran] = temp;
    }
    ShowCards(array)
}

function ShowCards(cardsarray){
    const cards = document.querySelector("#cards")
    cards.innerHTML = ``;
    for(i = 0; i < cardsarray.length; i++){
        console.log(`<li><img src="Kepek/${cardsarray[i]}.png"></li>`)
        cards.innerHTML += `<li class="card"> <div class="front"></div> <div class="back flipped"> <img src="Kepek/${cardsarray[i]}.png"></div></li>`
    }
}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);