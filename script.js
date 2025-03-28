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
    let cardsarray = [];
    for(let i = 1; i < cardnumber/2+1; i++){
        
        //cards.innerHTML += `
        //<li style="background-image:url(Kepek/${i}.png);"></li>
        //<li style="background-image:url(Kepek/${i}.png);"></li>
        //`
        
        cardsarray.push(`<li style="background-image:url(Kepek/${i}.png);"></li>`)
        cardsarray.push(`<li style="background-image:url(Kepek/${i}.png);"></li>`)

    }
    MixCards(cardsarray);
}

function MixCards(array){
    
    for(let i = 0; i < array.length; i++){
        let ran = randint(i+1, array.length)
        let ranli = array[ran];
        array[i] = ranli;
    }
    console.log(array)
}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);