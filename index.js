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
        }, 750);
        play(panel.className); //this timeout is between each color, the smaller the number the faster it flashes between colors and vice versa
    });
};

function play(panel) {
  var audio1 = document.getElementById("sound1");
  var audio2 = document.getElementById("sound2");
  var audio3 = document.getElementById("sound3");
  var audio4 = document.getElementById("sound4");
   console.log(panel);
   if(panel.includes('top-left')) {
     audio1.play();
   }
   else if(panel.includes('top-right')) {
     audio2.play();
   }
   else if(panel.includes('bottom-left')) {
     audio3.play();
   }
   else {
     audio4.play();
   }
}

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
