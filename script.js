let difficulty = 0;
let cardnumber = 0;
label = document.querySelector("label")



function StartGame(){

    if(difficulty != 0){
        const ul = document.querySelector("ul");
        ul.addEventListener("click", handleFlip);  
        GenerateCards();
        document.querySelector("#noshowdiv").classList.add("noshowcss")
    }
   
}

// function unflip() {
//     setTimeout(() => {
//         first.parentNode.classList.remove("flipped");    
//         first.parentNode.classList.remove("front");
//         first.parentNode.classList.add("back")

//         second.parentNode.classList.remove("flipped");
//         second.parentNode.classList.remove("front");
//         second.parentNode.classList.add("back");           


//       first = null;
//     second = null;
//     }, 1000);
// }

const div = document.querySelector(".card");
    function handleFlip(e) {
        const card = e.target.parentNode;
        
        const front = card.children[0];
        const back = card.children[1];
        
        front.classList.add("flipped");
        back.classList.remove("flipped");
        setTimeout(() => {
            back.classList.add("flipped");
            front.classList.remove("flipped");
        }, 1000);
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