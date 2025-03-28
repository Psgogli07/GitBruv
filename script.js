let difficulty = 0;
let cardnumber = 0;
label = document.querySelector("label")

function StartGame(){
    const ul = document.querySelector("ul");
    ul.addEventListener("click", handleClick);  
    GenerateCards();
    document.querySelector("#noshowdiv").classList.add("noshowcss")
}

function handleClick(e) {
    const li = e.target;
    if(li == e.target){
        console.log("jo")
    }
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
        cardsarray.push(`<li style="background-image:url(Kepek/${i}.png);"></li>`)
        cardsarray.push(`<li style="background-image:url(Kepek/${i}.png);"></li>`)
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
        console.log(cardsarray[i])
        cards.innerHTML += cardsarray[i]
    }
}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);