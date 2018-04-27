//this class init a game
class Game{

    constructor(difficultyWidth, difficultyHeight, back, firstName, lastName, email){
        this.difficultyWidth = difficultyWidth;
        this.difficultyHeight = difficultyHeight;
        this.back = back;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    initGame(){
        const layOut = document.querySelector('#menuContainer');
        layOut.classList.add('LayoutForGame');
        this.stopWatch();
        this.initCards();
        this.logicOfGame();
        this.backButtonInGame();
        this.againGameButton();
    }

    initCards(){
        for(let i = 1; i < this.difficultyHeight + 1; i++){
            const rowCards = document.createElement("div");
            rowCards.classList.add("row");
            rowCards.id = `row${i}`;
            menuContainer.appendChild(rowCards);
            for(let j = 1; j < this.difficultyWidth + 1; j++){
                const cellCard = document.createElement("div");
                cellCard.classList.add("card");
                cellCard.id = `${this.shuffle()}`;
                cellCard.innerHTML = `<img src="./${this.back}" alt=""> `;
                cellCard.addEventListener("click", () => {
                    cellCard.classList.add("clicked");
                    cellCard.innerHTML = `<img src="./images/shirts/shirt_${this.shuffle()}.png" alt="">`;
                });
                rowCards.appendChild(cellCard);
            }
        }
    }
    logicOfGame(){
        
    }

    stopWatch(){
        const containerForTimer = document.createElement("div");
        let seconds = 0, minutes = 0, t;
        containerForTimer.classList.add("containerForTimer");
        containerForTimer.id = "containerForTimer";
        containerForTimer.textContent = "00:00";
        menuContainer.appendChild(containerForTimer);

        let add = () =>{
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            containerForTimer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
             ":" + (seconds > 9 ? seconds : "0" + seconds);
            timer();
        };

        let timer = () =>{
            t = setTimeout(add,1000);
        };
        
        timer();
    }

    backButtonInGame(){
        const containerForButtonsInGame = document.createElement("div");
        containerForButtonsInGame.classList.add("containerForButtonsInGame");
        containerForButtonsInGame.id = "containerForButtonsInGame";
        menuContainer.appendChild(containerForButtonsInGame);
        const button = document.createElement("button");
        button.classList.add("ButtonInGame");
        button.classList.add("Buttons");
        button.textContent = "Back to menu";
        button.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForGame");
            menu.clear();
            menu.initAbout();
            menu.initGameButton();
            menu.initRecordsButton();
        });
        containerForButtonsInGame.appendChild(button);
    }

    againGameButton(){
        const button = document.createElement("button");
        button.classList.add("ButtonInGame");
        button.classList.add("Buttons");
        button.textContent = "Again";
        button.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForGame");
            menu.clear();
            let game = new Game(currentSettings.diff.width,currentSettings.diff.height, 
                currentSettings.shirt, currentSettings.person.firstName, currentSettings.person.lastName,
                currentSettings.person.email);
            game.initGame();
        });
        containerForButtonsInGame.appendChild(button);
    
    }

    shuffle(){
        let countOfCards = this.difficultyWidth * this.difficultyHeight;
        let arrayOfIndex = [];
        for(let i = 0; i < countOfCards; i++){
            let randomIndex = Math.floor(Math.random() * countOfCards / 2) + 1;
            let randomPlace = Math.floor(Math.random() * countOfCards / 2) + 1;
            if(arrayOfIndex.includes)
            arrayOfIndex.push(randomIndex);
        }
        return arrayOfIndex;
    }

}