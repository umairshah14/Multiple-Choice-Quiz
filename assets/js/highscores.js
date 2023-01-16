    var highscores = JSON.parse(window.localStorage.getItem("highscores")) 
    var highscoresItem = document.createElement("li");
    highscoresItem.textContent = "Score: " + highscores.score + " | Initials: " + highscores.initials
    console.log(highscoresItem);
    highscoresEl.appendChild(highscoresItem);