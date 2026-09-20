let dimension = 150 ;
let imgStart = Math.floor(Math.random()*92)+1
let url = [] ;
let jeu = [] ;
let firstCard = null ;
let secondCard = null ;
let turnedCard = [] ;
let lockBoard = false;
let move = 0 ;
let matchedCount = 0;
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
        let card = document.createElement("div");
        card.classList.add("card"); // ajout de classe
        card.role = "button"; // définit le <div> comme un button
        card.tabIndex = "0"; //ajoute un index afin de pouvoir utiliser les tab du clavier pour parcourir les elements
        card.dataset.value = carte;

        /**
         *Creation d'une balise <img>
         */
        let img = document.createElement("img");
        img.src = carte; // ajout du lien
        img.alt = `Image n°${index+1} du Memory` ; // ajout de l'Alt avec index pour éviter le warning de repetition des Alt
        img.style.width = "100%"; // largeur
        img.style.height = "100%"; // hauteur
        img.style.display = "none"; // pour cacher les image (initialisation du jeu)

        card.append(img); // ajout de l'image dans le <div>
        plateau.append(card); // ajout du <div> dans le plateau

        card.addEventListener("click", () => handleCardClick(card))
    })
}


function handleCardClick(card) {
    if (lockBoard === true) {
        return;
    }

    if (card === firstCard){
        return;
    }

    if (turnedCard.includes(card.dataset.value)){
        return;
    }


    if (firstCard === null) {
        firstCard = card;
        afficherCard(card);

    }else if (firstCard != null && secondCard === null) {
        secondCard = card;
        afficherCard(secondCard);
        lockBoard = true;


        if (checkMatch(firstCard, secondCard) === true ) {
            move += 2 ;
            lockBoard = false;

            turnedCard.push(firstCard.dataset.value);

            firstCard = null ;
            secondCard = null ;

            matchedCount ++ ;

            if (matchedCount === 8) {
                setTimeout(() => gameWin() , 1500)
            }

        }
        else {
            move += 2 ;
            setTimeout(() => {
                cacherCard(firstCard);
                cacherCard(secondCard);

                firstCard = null ;
                secondCard = null ;

                lockBoard = false;
            }, 800);


        }
    }
}

function afficherCard(card){
    card.classList.toggle("retournee");

    setTimeout(() => {
        card.querySelector("img").style.display = "block";
    }, 140);
}

function cacherCard(card){
    card.classList.remove("retournee");

    setTimeout(() => {
        card.querySelector("img").style.display = "none";
    }, 140);
}

function checkMatch(card1 , card2) {
    return card1.dataset.value === card2.dataset.value ;

}

function gameWin() {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.remove();
    })

    plateau.append("Bravo vous avez gagné")
}

initGame();