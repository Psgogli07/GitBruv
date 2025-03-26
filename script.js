let difficulty = 0;

label = document.querySelector("label")

function StartGame(){

    GenerateCards();
}

function Difficulty(){
    const diff = document.querySelector("#difficulty")
    for (const input of diff) {
        if(input.value == "3"){
            difficulty = 3;
        }
        else if(input.value == "2"){
            difficulty = 2;
        }
        else{
            difficulty = 1;
        }
    }
}

function GenerateCards(){

}

function MixCards(){

}

function NewGame(){

}


document.querySelector("button", StartGame())