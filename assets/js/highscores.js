var highscoresEl = document.querySelector("#highscores");

var highscores = JSON.parse(window.localStorage.getItem("highscores"));


//SORT THE SCORES
function sortHighscores() {
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
}

sortHighscores()

for (let i = 0; i < highscores.length; i++) {

    if (highscores[i].score === 1 ){
        var highscoresItem = document.createElement("li");
        highscoresItem.textContent =  highscores[i].initials.toUpperCase().slice(0, 3) + " - "  + highscores[i].score + " Point" + ", completed in " + highscores[i].timeTaken + " seconds"
        highscoresItem.style = "list-style:none" 
        highscoresEl.appendChild(highscoresItem);
    }else {
        var highscoresItem = document.createElement("li");
        highscoresItem.textContent =  highscores[i].initials.toUpperCase().slice(0, 3) + " - "  + highscores[i].score + " Points" + ", completed in " + highscores[i].timeTaken + " seconds"
        highscoresItem.style = "list-style:none" 
        highscoresEl.appendChild(highscoresItem);
    }   
    
}



// Button to clear highscores
document.querySelector("#clear").addEventListener("click", function () {
    highscoresEl.innerHTML = "";
    localStorage.clear();
  });


  