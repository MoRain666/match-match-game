//this class call a menu
class Menu{

    initMenu(){
        const menuContainer  = document.createElement('main');
        menuContainer.classList.add("menuContainer");
        menuContainer.id = "menuContainer";
        wrapper.appendChild(menuContainer);
        this.initAbout();
        this.initGameButton();
        this.initRecordsButton();
    }

    initGameButton(){
        const menuButton = document.createElement('button');
        menuButton.classList.add("elementsOfMenu");
        menuButton.id = "newGame";
        menuButton.textContent = "New Game";
        menuContainer.appendChild(menuButton);
        menuButton.addEventListener("click" , () => {
            this.clear();
            let game = new Registration();
            game.initRules();
        });
    }

    initRecordsButton(){
        const menuButton = document.createElement('button');
        menuButton.classList.add("elementsOfMenu");
        menuButton.id = "records";
        menuButton.textContent = "Highscore Table";
        menuContainer.appendChild(menuButton);
        menuButton.addEventListener("click" , () => {
            this.clear();
            let records = new Records();
            records.initRecords();
        });
    }

    initAbout(){
        const menuButton = document.createElement('div');
        const aboutText = document.createElement('p');
        menuButton.classList.add("about");
        menuButton.id = "about";
        aboutText.textContent = "Hi, you came in match-match game, here you will wasted time (no), press the button \"New game \" and follow further instructions!";
        menuContainer.appendChild(menuButton);
        about.appendChild(aboutText);
    }

    clear(){
        while (document.querySelector("#menuContainer").firstChild) {
            document.querySelector("#menuContainer").removeChild(document.querySelector("#menuContainer").firstChild);
        }
    }

    notification(string){
        let notifiContainer = document.createElement("div");
        notifiContainer.classList.add("alert");
        notifiContainer.textContent = string;
        menuContainer.appendChild(notifiContainer);
        let close = document.createElement('span');
        close.classList.add('closebtn');
        close.innerHTML = '&times';
        close.addEventListener("click" , () => {
            notifiContainer.style.display='none';
        });
        notifiContainer.appendChild(close);
    }
}

let menu = new Menu();
menu.initMenu();