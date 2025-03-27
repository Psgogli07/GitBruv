let difficulty = 0;
let cardnumber = 0;

label = document.querySelector("label")

function StartGame(){
    GenerateCards();
}



function Difficulty(){
    const radios = document.getElementsByName("difficulty");
    for (const radio of radios) {
        if (radio.checked) {
          difficulty = radio.value;
        }
    }

    if(difficulty == 1){
        cardnumber = 9
    }else if(difficulty == 2){
        cardnumber = 12
    }
    else if(difficulty == 3){
        cardnumber = 15
    }
    StartGame();
}



function GenerateCards(){
    const cards = document.querySelector("#cards")
    for(let i = 0; i < cardnumber; i++){
        cards.innerHTML += `
        <li> Kártya </li>
        `
    }
}

function MixCards(){

}

function NewGame(){

}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);