// class is responsible for the choice of complexity and shirts
class GameSettings{

    initSettings(){
        this.initDifficulty();
        this.initShirts();
        container("div", ["buttonsContainerInSettings"], "buttonsContainerInSettings", menuContainer);
        this.initStartGameButton();
        this.initBackButtonInSettings();
    }

    initShirts(){
        container("div", ["containerForShirts"], "containerForShirts", menuContainer);
        for(let i = 0; i < Config.backs.length; i++){
            const shirt = document.createElement("div");
            shirt.classList.add("shirt");
            shirt.style.backgroundImage = `url(${Config.backs[i]})`;
            shirt.id = `${Config.backs.length - i}shirt`;
            containerForShirts.appendChild(shirt);
            shirt.addEventListener("click" , () => {
                //Active Shirt and Transmission of Field Parameters
                let classSearch = document.getElementsByClassName('activeShirt');
                if(classSearch.length == 1){
                    for(let i = 1; i < Config.backs.length + 1; i++){
                        let shirtBack = document.getElementById(`${i}shirt`);
                        shirtBack.classList.remove('activeShirt');
                    }
                }
                shirt.classList.add('activeShirt');
                currentSettings.shirt = Config.backs[i];
            });
        }

    }
    initDifficulty(){
        container("div", ["containerForDiff"], "containerForDiff", menuContainer);
        for(let i = 0; i < Config.diff.length; i++){
            const buttonForDiff = document.createElement("button");
            buttonForDiff.classList.add("Buttons");
            buttonForDiff.classList.add("buttonForDiff");
            buttonForDiff.id = `${i}diff`;
            buttonForDiff.textContent = `${Config.diff[i].height} X ${Config.diff[i].width}`;
            containerForDiff.appendChild(buttonForDiff);
            buttonForDiff.addEventListener("click" , () => {
                //active button and sending field parameters
                let classSearch = document.getElementsByClassName('activeDiff');
                if(classSearch.length == 1){
                    for(let i = 0; i < 3; i++){
                        let button = document.getElementById(`${i}diff`);
                        button.classList.remove('activeDiff');
                    }
                }
                buttonForDiff.classList.add('activeDiff');
                currentSettings.diff.width = Config.diff[i].width;
                currentSettings.diff.height = Config.diff[i].height;
            });
        }
    }
    initBackButtonInSettings(){
        button(["Buttons", "ButtonsInSettings"], "Back to menu", "backToMenu", buttonsContainerInSettings);
        backToMenu.addEventListener("click" , () => {
            clear();
            menu.initAbout();
            menu.initGameButton();
            menu.initRecordsButton();
        });
    }

    initStartGameButton(){
        button(["Buttons", "ButtonsInSettings"], "Start Game", "startGameButton", buttonsContainerInSettings);
        startGameButton.addEventListener("click" , () => {
            if(document.getElementsByClassName('activeDiff').length == 0 || document.getElementsByClassName('activeShirt').length == 0 ){
                notification('no complexity or shirt chosen!');
            }else{
                clear();
                let game = new Game(currentSettings.diff.width,currentSettings.diff.height, 
                currentSettings.shirt, currentSettings.person.firstName, currentSettings.person.lastName,
                currentSettings.person.email);
                game.initGame();
            }
        });
    }

}