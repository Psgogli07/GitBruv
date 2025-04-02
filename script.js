let difficulty = 0;
let cardnumber = 0;
label = document.querySelector("label")


function StartGame(){
    if(difficulty != 0){
        const ul = document.querySelector("ul");
        ul.addEventListener("click", handleClick);  
        GenerateCards();
        document.querySelector("#noshowdiv").classList.add("noshowcss")
    }
   
}

let first = null;
let second = null;

function handleClick(e) {
    const li = e.target;
    //const ul = document.querySelector("#cards") 
    //console.log(ul.childNodes);

    if (li.matches("ul li img")) {
        
        if (!first) {
            first = li;            
            //let li_index_first = ul.child
            console.log(first);
        }
        else if (!second) {
            second = li;  

            if (first.src === second.src) {
                console.log("jo:", first, second);
                first = null;
                second = null;
            }
            else{
                console.log("nemjo:", first, second);
                first = null;
                second = null;
            }
        }
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
        cards.innerHTML += `<li><img src="Kepek/${cardsarray[i]}.png"></li>`
    }
}

const button = document.querySelector("#kezdo");
button.addEventListener("click", Difficulty);