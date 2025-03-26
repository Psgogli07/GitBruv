let difficulty = 0;

function StartGame(){
    console.log("asd")
    GenerateCards();
}

function Difficulty(){
    let tabla = document.querySelector("table")
    for (tr  of tabla) {
        for (const td of tr) {
            if(td.text == "Easy"){
                difficulty = 1;
            }
            else if(td.text == "Easy"){
                difficulty = 2;
            }
            else{
                difficulty = 3;
            }
        }
    }

    console.log(difficulty);
}

function GenerateCards(){

}

function MixCards(){

}

function NewGame(){

}


document.querySelector("button", StartGame())
document.querySelector("", Difficulty())