const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
let score = document.getElementById("score");

let noise = true;


const randomPanel = () => {

    const panels = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ]
    return panels[parseInt(Math.random() * panels.length)]; //this is getting the length of panels (which is 4) and choosing a random index.. gives a number between 0-3
};

const sequences = [randomPanel()]; //this is just choosing a random panel to add to the sequence

let sequenceToGuess = [...sequences]; //this is a clone of sequence

const flash = panel => {
    return new Promise((resolve, reject) => {
        panel.className += ' active';
        setTimeout(() => {
            panel.className = panel.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250); //this timeout is for color duplicates, so for example if we have red, green, green,
                     //without this timeout the green will just stay white for awhile, with this time out, it will flash from green back to green

                     //trying to add when the game plays it will play the function that has the sound
                     if (panel[flash] == topLeft) one();
                     if (panel[flash] == topRight) two();
                     if (panel[flash] == bottomLeft) three();
                     if (panel[flash] == bottomRight) four();
                     //flash++;

        }, 750); //this timeout is between each color, the smaller the number the faster it flashes between colors and vice versa
    });
};



let canClick = false; //this is so the user cannot click until the buttons stop flashing


const panelClicked = panelClicked => {
    if(!canClick) return; //if canClick is false, return from this callback
    const expectedPanel = sequenceToGuess.shift(); //removes first element


    if(expectedPanel === panelClicked) {
        if(sequenceToGuess.length === 0){
            //start a new round
            score.innerHTML = 'Score: ' + sequences.length;
            sequences.push(randomPanel());
            sequenceToGuess = [...sequences];
            startFlashing();
        }
    } else{
        //end the game
        alert('Game Over!\nScore: ' + (sequences.length - 1));
    }
};


const startFlashing = async () => {
    canClick = false;
    for(const panel of sequences){
        await flash(panel);
    }
    canClick = true;
}


const main = async () => {
    startFlashing();
};

startFlashing();


//this the fucntions that will play the sounds I just need to fit them in the function that plays the game
function one() {
    if (noise) {
      let audio = document.getElementById("sound1");
      audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
  }

  function two() {
    if (noise) {
      let audio = document.getElementById("sound2");
      audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "yellow" ;
  }

  function three() {
    if (noise) {
      let audio = document.getElementById("sound3");
      audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "tomato";
  }

  function four() {
    if (noise) {
      let audio = document.getElementById("sound4");
      audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
  }
