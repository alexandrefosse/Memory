let dimension = 150 ;
let imgStart = Math.floor(Math.random()*100)+1

let url = [] ;

let jeu = [] ;7

let plateau = document.getElementById("plateau");

/**
 * Récuperation des images aléatoires
 */
for (let i = 0 ; i < 8 ; i++) {
    url.push(`https://picsum.photos/id/${imgStart+i}/${dimension}`)
}


/**
 * Duplication des cartes
 */
for (let i = 0 ; i < 8 ; i++) {
    jeu[i] = url[i];
    jeu[i + 8] = url[i];
}


/**
 * Algo de Fisher-Yates
 * Fonction de mélange
 */

function shuffle(cards = []) {
    for (let i = cards.length-1 ; i > 0 ; i--) {
        let rand = Math.floor(Math.random()*(i+1))

        let temp = cards[rand];
        cards[rand] = cards[i];
        cards[i] = temp;
    }
    return cards;
}


function initGame() {
    jeu = shuffle(jeu) ;
    jeu.forEach((carte , index )=> {
        let div = document.createElement("div");
        div.classList.add("card");

        let img = document.createElement("img");
        img.src = carte;
        img.alt = `Image n°${index+1} du Memory` ;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.display = "none";

        div.append(img);
        plateau.append(div);
    })
}

initGame();