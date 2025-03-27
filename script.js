let difficulty = 0;
let cardnumber = 0;

label = document.querySelector("label")

function StartGame(){
    GenerateCards();
    document.querySelector("#noshowdiv").classList.add("noshowcss")
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
    const cards = document.querySelector("#cards")
    cards.innerHTML = ``;
    let nums = (1,2,3,4,5,6,7)
    for(let i = 0; i < cardnumber/2; i++){
        let ran = randint(1,nums.Count())
        cards.innerHTML += `
        <li> <img src="Kepek/${ran}.png"></li>
        <li> <img src="Kepek/${ran}.png"></li>
        `
    }

}

function MixCards(){
    console.log("");
}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);