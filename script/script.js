let dimension = 150 ;
let urlValide = [] ;
let firstCard = null ;
let secondCard = null ;
let turnedCard = [] ;
let lockBoard = false;
let move = 0 ;
let matchedCount = 0;
const main = document.querySelector("main");


function pickCard(difficulty) {
    let jeu = [] ;
    while(urlValide.length < difficulty) {
        let idTest = Math.floor(Math.random()*100)+1
        if (idTest !== 86 && idTest !== 97 && !urlValide.includes(`https://picsum.photos/id/${idTest}/${dimension}`)) {
            urlValide.push(`https://picsum.photos/id/${idTest}/${dimension}`)
        }
        console.table(urlValide);
    }

    for (let i = 0 ; i < difficulty ; i++) {
        jeu[i] = urlValide[i];
        jeu[i + difficulty] = urlValide[i];
    }

    if (difficulty === 8){
        initGame(jeu , "facile")
    }else if(difficulty === 18){
        initGame(jeu , "moyen")
    }else if(difficulty === 32){
        initGame(jeu , "difficile")
    }

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


function initGame(jeu,difficulty) {
    jeu = shuffle(jeu) ;
    let plateau = document.createElement("div");

    plateau.id = "plateau";
    plateau.classList.add("plateau");
    main.appendChild(plateau);

    jeu.forEach((carte , index )=> {
        /**
         *Création d'une balise <div>
         */
        let card = document.createElement("div");
        card.classList.add("card" , difficulty); // ajout de classe
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
        img.style.borderRadius = "5px";
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

            if (matchedCount === (document.querySelectorAll(".card").length)/2 ) {
                setTimeout(() => gameWin() , 1000)
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

    const plateau = document.querySelector(".plateau");
    plateau.remove();

    main.append("Bravo vous avez gagné");
}

function choiceDifficulty() {

    let div = document.createElement("div");
    div.classList.add("difficulty-div");
    main.append(div);

    let p = document.createElement("p");
    p.textContent = "Choisissez votre Difficulté"
    p.style.fontSize = "20px";
    div.append(p);

    let difficultyNormal = document.createElement("button");
    difficultyNormal.classList.add("difficulty-button");
    difficultyNormal.type = "button";
    difficultyNormal.textContent = "Normale";
    div.append(difficultyNormal);
    difficultyNormal.addEventListener("click",() => {
        pickCard(8);
        choiceDelete();


    })

    let difficultyHard = document.createElement("button");
    difficultyHard.classList.add("difficulty-button");
    difficultyHard.type = "button";
    difficultyHard.textContent = "Dur";
    div.append(difficultyHard);
    difficultyHard.addEventListener("click",() => {
        pickCard(18);
        choiceDelete();
    })

    let difficultyVeryHard = document.createElement("button");
    difficultyVeryHard.classList.add("difficulty-button");
    difficultyVeryHard.type = "button";
    difficultyVeryHard.textContent = "Super dur";
    div.append(difficultyVeryHard);
    difficultyVeryHard.addEventListener("click",() => {
        pickCard(32);
        choiceDelete();
    })

}

function choiceDelete() {
    const div = document.querySelector(".difficulty-div");
    div.remove();
}

choiceDifficulty();