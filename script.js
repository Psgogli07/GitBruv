const Datas = {
    difficulty: 0,
    startTime: 0,
    timerInterval: null,
    errorCount: 0,
    email: "",
    age: 0,
    cardnumber: 0
}

function StartGame(){
    if(Datas.difficulty != 0){
        const ul = document.querySelector("ul");
        GenerateCards();
        ShowALL();
        startTimer();
        ul.addEventListener("click", handleFlip);  
        document.querySelector("#noshowdiv").classList.add("noshowcss")
        
        StartButton.disabled = true;
        showallcardbutton.disabled = false; 
        ability.disabled = false;
    }  
}

let showAllAbilityUsed = false; 
const showallcardbutton = document.querySelector("#showall")
showallcardbutton.disabled = true;
showallcardbutton.addEventListener("click", () => {
    if (showAllAbilityUsed) return; 
    showAllAbilityUsed = true;
    ShowALL();
    showallcardbutton.classList.add("runaway")
    showallcardbutton.disabled = true; 
});

const ability = document.querySelector("#ability")
ability.addEventListener("click", useAbility);
ability.disabled = true;
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
        ability.classList.add("runaway")
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
        checkGameCompletion();
    }, 1500);
}

function startTimer() {
    Datas.startTime = Date.now(); 
    if (Datas.timerInterval) {
        clearInterval(Datas.timerInterval);
    }
    Datas.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!Datas.startTime) return;
    const now = Date.now();
    const elapsedTime = Math.floor((now - Datas.startTime) / 1000);
    document.querySelector("#timer").innerHTML = `<div>Idő: ${elapsedTime} mp</div>`;
}

function checkGameCompletion() {
    const hiddenCards = document.querySelectorAll('.card[style="visibility: hidden;"]');
    if (hiddenCards.length === Datas.cardnumber) {
        endGame();
    }
}

function endGame() {
    clearInterval(Datas.timerInterval);
    const now = Date.now();
    const gameDuration = Datas.startTime ? Math.floor((now - Datas.startTime) / 1000) : 0;
    
    const gameData = {
        email: Datas.email || "unknown",
        age: Datas.age || 0,
        difficulty: Datas.difficulty || 1,
        time: gameDuration,
        faults: Datas.errorCount || 0,
        date: new Date().toISOString().split('T')[0]
    };

    saveGameData(gameData);
    document.querySelector("#restart").style.display = "block";
}

function saveGameData(gameData) {
    try {
        let allGames = JSON.parse(localStorage.getItem("games"));
        if (allGames === null) {
            allGames = [];
        }
        allGames.push(gameData);
        localStorage.setItem("games", JSON.stringify(allGames));

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/memory/create/");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.response);
                console.log("Mentés sikeres:", response);
            } else {
                console.error("Hiba történt a mentésnél:", xhr.status, xhr.response);
            }
        };
        
        xhr.onerror = function () {
            console.error("Hálózati hiba történt.");
        };

        const requestData = JSON.stringify({
            email: gameData.email,
            age: gameData.age,
            level: gameData.difficulty === 1 ? "könnyű" : (gameData.difficulty === 2 ? "normál" : "nehéz"),
            time: gameData.time,
            mistakes: gameData.faults
        });

        xhr.send(requestData);  // Kérés elküldése
    } catch (e) {
        console.error("Mentési hiba:", e);
    }
}

const activeCards = { firstCard: null, secondCard: null }
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

function handleFlip(e) {
    const card = e.target.closest(".card");
    if (!card || lockBoard) return;
    if (card === activeCards.firstCard) return;

    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    front.classList.add("flipped");
    back.classList.remove("flipped");

    if (!activeCards.firstCard) {
        activeCards.firstCard = card;
    } else {
        activeCards.secondCard = card;
        lockBoard = true;
        checkForMatch();
    }
}

const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", RestartGame);

function RestartGame() {
    location.reload();
}

function checkForMatch() {
    const firstImage = activeCards.firstCard.querySelector("img").src;
    const secondImage = activeCards.secondCard.querySelector("img").src;
    
    if (firstImage === secondImage) {
        setTimeout(() => {
            activeCards.firstCard.style.visibility = "hidden";
            activeCards.secondCard.style.visibility = "hidden";
            checkGameCompletion();
            resetBoard();
        }, 500);
    } else {
        Datas.errorCount++;
        document.querySelector("#errors").innerHTML = `<div>Hibák: ${Datas.errorCount}</div>`;
        setTimeout(unflipCards, 1000);
    }
}

function unflipCards() {
    const firstFront = activeCards.firstCard.querySelector(".front");
    const firstBack = activeCards.firstCard.querySelector(".back");
    const secondFront = activeCards.secondCard.querySelector(".front");
    const secondBack = activeCards.secondCard.querySelector(".back");

    firstFront.classList.remove("flipped");
    firstBack.classList.add("flipped");
    secondFront.classList.remove("flipped");
    secondBack.classList.add("flipped");

    resetBoard();
}

function resetBoard() {
    activeCards.firstCard = null;
    activeCards.secondCard = null;
    lockBoard = false;
}

function Difficulty(){
    const radios = document.getElementsByName("difficulty");
    for (const radio of radios) {
        if (radio.checked) {
            Datas.difficulty = parseInt(radio.value) || 1;
        }
    }
    if(Datas.difficulty == 1){
        Datas.cardnumber = 8;
    }else if(Datas.difficulty == 2){
        Datas.cardnumber = 12;
    } else if(Datas.difficulty == 3){
        Datas.cardnumber = 14;
    }   
    StartGame();
}

function randint(a, b) {
    return Math.floor(Math.random() * (b-a+1)) + a;
}

function GenerateCards(){
    let cardsarray = [];
    for(let i = 1; i < Datas.cardnumber/2+1; i++){
        cardsarray.push(i);
        cardsarray.push(i);
    }
    MixCards(cardsarray);
}

function MixCards(array){
    for (let i = 0; i < array.length - 1; i++) {
        let ran = randint(i + 1, array.length - 1);
        [array[i], array[ran]] = [array[ran], array[i]];
    }
    ShowCards(array);
}

function ShowCards(cardsarray){
    const cards = document.querySelector("#cards");
    cards.innerHTML = ``;
    for(let i = 0; i < cardsarray.length; i++){
        cards.innerHTML += `<li class="card"> <div class="front"></div> <div class="back flipped"> <img src="Kepek/${cardsarray[i]}.png"></div></li>`;
    }
}
const userdatasButton = document.querySelector("#userdatas");
userdatasButton.addEventListener("click", saveUserDatas);

function saveUserDatas() {
    const emailInput = document.querySelector("#email");
    const ageInput = document.querySelector("#age");

    const email = emailInput.value.trim();
    const age = parseInt(ageInput.value) || 0;

    if (!email || age < 1) {
        alert("Kérlek adj meg érvényes email címet és életkort!");
        return;
    }
    Datas.email = email;
    Datas.age = age;
    document.querySelector("#userdata_form").style.display = "none";

    StartButton.disabled = false;
}

const StartButton = document.querySelector("#kezdo");
StartButton.disabled = true;
StartButton.addEventListener("click", Difficulty);
