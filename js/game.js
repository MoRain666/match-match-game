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
        this.backButtonInGame();
        this.againGameButton();
    }

    initCards(){
        let randomIndexes = this.shuffle();
        let indexOFArray = -1;
        console.log(randomIndexes[randomIndexes.length - 1]);
        for(let i = 0; i < this.difficultyHeight; i++){
            const rowCards = document.createElement("div");
            rowCards.classList.add("row");
            rowCards.id = `row${i}`;
            menuContainer.appendChild(rowCards);
            for(let j = 0; j < this.difficultyWidth; j++){
                indexOFArray++;
                const cellCard = document.createElement("div");
                cellCard.classList.add("card");
                cellCard.id = `card${indexOFArray}`;
                cellCard.innerHTML = `<img src="./${this.back}" alt=""> `;
                rowCards.appendChild(cellCard);
            }
        }
        for(let i = 0; i < randomIndexes.length; i++){
            let card = document.querySelector(`#card${i}`);
            card.addEventListener("click", () => {
                if(document.getElementsByClassName('clicked').length == 2){
                    console.log('cant do that')
                }else{
                card.classList.add("clicked");
                card.innerHTML = `<img src="./images/shirts/shirt_${randomIndexes[i]}.png" alt="">`;
                }
            });
           card.addEventListener("click", () => {
            setTimeout(() => this.unMatched(),1000);
            setTimeout(() => this.matched(),1400);
            card.classList.remove('unmatched');
            });
        }
    }

    stopWatch(){
        const containerForTimer = document.createElement("div");
        let seconds = 0, minutes = 0, countOfCards = this.difficultyWidth * this.difficultyHeight, t;
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
            if(!(document.getElementsByClassName('hidden').length == countOfCards)) t = setTimeout(add,1000);
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
        let result = [];
        let currentNumber = 1;
        let compareRandom = (a,b) =>{
            return Math.random() -0.5;
        };
        for(let i = 0; i < countOfCards; i++){
            if(currentNumber == countOfCards / 2 + 1) currentNumber = 1;
            result.push(currentNumber);
            currentNumber++;
        }
        return result.sort(compareRandom);
    }
    unMatched(){
        if(document.getElementsByClassName('clicked').length > 1){
            let cardToHidden = document.querySelectorAll('.clicked');
            if(!(document.getElementsByClassName('clicked')[0].firstChild.src ==
             document.getElementsByClassName('clicked')[1].firstChild.src)){
                 let i = 0;
                while(document.getElementsByClassName('clicked').length > 0){
                    cardToHidden[i].classList.add("unmatched");
                    cardToHidden[i].innerHTML = `<img src="./${this.back}" alt="">`;
                    cardToHidden[i].classList.remove('clicked');
                    i++;
                }
             }
        }
    }

    matched(){
        if(document.getElementsByClassName('clicked').length > 1){
            if(document.getElementsByClassName('clicked')[0].firstChild.src ==
             document.getElementsByClassName('clicked')[1].firstChild.src){
                let cardMatched =  document.getElementsByClassName('clicked');
                while(document.getElementsByClassName('clicked').length > 0){
                    cardMatched[0].classList.add('hidden');
                    cardMatched[0].classList.remove('clicked');
                    this.endOfGame();
                }
             }
        }
    }
    endOfGame(){
        let countOfCards = this.difficultyWidth * this.difficultyHeight;
        if(document.getElementsByClassName('hidden').length == countOfCards){
            currentSettings.person.time = document.querySelector("#containerForTimer").textContent;
            console.log('u win!');}
    }
}