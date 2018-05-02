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
        this.initStopWatch();
        this.initCards();
        this.initBackButtonToMenu();
        this.initBackButton();
        this.initAgainGameButton();
    }

    initCards(){
        let randomIndexes = this.shuffle();
        let indexOFArray = -1;
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
                if(document.getElementsByClassName('clicked').length < 2){
                card.classList.add("clicked");
                card.innerHTML = `<img src="./images/shirts/shirt_${randomIndexes[i]}.png" alt="">`;
                }
            });
            card.addEventListener("click", () => {
                setTimeout(() => this.unMatched(),2000);
                card.classList.remove('unmatched');
                setTimeout(() => this.matched(),1400);
            });
        }
    }

    initStopWatch(){
        let seconds = 0, minutes = 0, countOfCards = this.difficultyWidth * this.difficultyHeight, t;
        container("div", ["containerForTimer"], "containerForTimer", menuContainer);
        containerForTimer.textContent = "00:00";
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

    initBackButtonToMenu(){
        container("div", ["containerForButtonsInGame"], "containerForButtonsInGame", menuContainer);
        button(["ButtonInGame", "Buttons"], "Back to menu", "backToMenuButton", containerForButtonsInGame);
        backToMenuButton.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForGame");
            clear();
            menu.initAbout();
            menu.initGameButton();
            menu.initRecordsButton();
        });
    }

    initBackButton(){
        button(["ButtonInGame","Buttons" ], "Back", "backButtonInGame", containerForButtonsInGame);
        backButtonInGame.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForGame");
            clear();
            let gameSettings = new GameSettings();
            gameSettings.initSettings();
        });
    }

    initAgainGameButton(){
        button (["ButtonInGame","Buttons" ], "Again", "againButtonInGame", containerForButtonsInGame);
        againButtonInGame.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForGame");
            clear();
            let game = new Game(currentSettings.diff.width,currentSettings.diff.height, 
                currentSettings.shirt, currentSettings.person.firstName, currentSettings.person.lastName,
                currentSettings.person.email);
            game.initGame();
        });
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
            let cardMatched =  document.getElementsByClassName('clicked');
            if(document.getElementsByClassName('clicked')[0].firstChild.src ==
             document.getElementsByClassName('clicked')[1].firstChild.src){
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
            let minutes = parseInt(document.querySelector("#containerForTimer").textContent.split(":")[0]);
            let seconds = parseInt(document.querySelector("#containerForTimer").textContent.split(":")[1]);
            let totalSeconds = minutes * 60 + seconds;
            currentSettings.person.time = totalSeconds;
            this.toRecords();
            notification('You\'re a superstar! May today\'s success be the beginning of tomorrow\'s achievements.');
        }
            
    }

    toRecords(){
        let table = {};
        if(localStorage.people == undefined){
            table['1'] = currentSettings.person;
            let serialobj = JSON.stringify(table);
            window.localStorage.setItem("people",serialobj);
        }else{
            let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("people"))).length;
            let ObjectOfElements = JSON.parse(localStorage.getItem("people"));
            ObjectOfElements [`${countOFPeople + 1}`] = currentSettings.person;
            let serialobj = JSON.stringify(ObjectOfElements);
            window.localStorage.setItem("people",serialobj);
        }
    }

}