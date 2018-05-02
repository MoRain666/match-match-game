//this class call a menu
class Menu{

    initMenu(){
        container("main", ["menuContainer"], "menuContainer", wrapper);
        this.initAbout();
        this.initGameButton();
        this.initRecordsButton();
    }

    initGameButton(){
        button(["elementsOfMenu"],"New Game", "initGameButton", menuContainer);
        initGameButton.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRules();
        });
    }

    initRecordsButton(){
        button(["elementsOfMenu"],"Highscore Table", "initRecordsButton",menuContainer );
        initRecordsButton.addEventListener("click" , () => {
            clear();
            let records = new Records();
            records.initRecords();
        });
    }

    initAbout(){
        container("div", ["about"], "aboutContainer", menuContainer);
        container("p", null, "aboutContent", aboutContainer);
        aboutContent.textContent = "Hi, you came in match-match game, here you will wasted time (no), press the button \"New game \" and follow further instructions!";
    }
}

let menu = new Menu();
menu.initMenu();