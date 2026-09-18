let dimention = 150 ;
let imgStart = Math.floor(Math.random()*100)+1

let images = [] ;

for (let i = 0 ; i < 8 ; i++) {
    images.push(`https://picsum.photo/seed/${imgStart+i}/${dimention}`)
}