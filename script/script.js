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
 * Fonction de mélange
 * Algo de Fisher-Yates
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
        /**
         *Création d'une balise <div>
         */
        let div = document.createElement("div");
        div.classList.add("card"); // ajout de classe

        /**
         *Creation d'une balise <img>
         */
        let img = document.createElement("img");
        img.src = carte; // ajout du lien
        img.alt = `Image n°${index+1} du Memory` ; // ajout de l'Alt avec index pour éviter le warning de repetition des Alt
        img.style.width = "100%"; // largeur
        img.style.height = "100%"; // hauteur
        img.style.display = "block"; // pour cacher les image (initialisation du jeu)

        div.append(img); // ajout de l'image dans le <div>
        plateau.append(div); // ajout du <div> dans le plateau

    })
}


initGame();