//class call a registration before a game
class Registration{

    initRules(){
        container("div", ["rules"], "rules", menuContainer);
        rules.textContent = "You have to fill out contact details, and also choose a card shirt and complexity," +
        "after then the game will start, the timer will go, you have to find pairs as soon as possible," +
        " GOOD LUCK AND HAVE A FUN !";
        container("div", ["containerCommunications"], "containerCommunications", menuContainer);
        this.initCommunications();
        container("div", ["ButtonsContainer"], "ButtonsContainer", containerCommunications);
        this.initBackButton();
        this.initNext();
    }

    initNext(){
        button(["Buttons"], "Next", "next", ButtonsContainer);
        next.addEventListener("click" , () => {
            let firstName = document.getElementsByTagName('input')[0].value;
            let lastName = document.getElementsByTagName('input')[1].value;
            let email = document.getElementsByTagName('input')[2].value;
            if (firstName == "" || lastName == "" || email == ""){
                notification('Fill all fields!');
            }else if(firstName.length > 20 || lastName.length > 20 || email.length > 30){
                notification('More than 30 symbols in forms!');
            }
            else{
                let person = {};
                person.firstName = firstName;
                person.lastName = lastName;
                person.email = email;
                person.time = 0;
                currentSettings.person = person;
                clear();
                let gameSettings = new GameSettings();
                gameSettings.initSettings();
            }
        });
    }

    initCommunications(){
        const attributes = ["First Name", "Last Name", "Email"];
        container("form", ["communications"], "communications", containerCommunications);
        for(let i = 0; i < attributes.length; i++){
            const input = document.createElement('input');
            const nameInput = document.createElement('h3');
            input.classList.add("input");
            nameInput.textContent = attributes[i];
            if(i == 2) {
                input.setAttribute("type","email");
            }else{
                input.setAttribute("type","text");
            }
            input.setAttribute("placeholder", `Waiting for ${attributes[i]}`);
            communications.appendChild(nameInput);
            communications.appendChild(input);
        }
    }

    initBackButton(){
        button(["Buttons"], "Back", "back", ButtonsContainer);
        back.addEventListener("click" , () => {
            clear();
            menu.initAbout();
            menu.initGameButton();
            menu.initRecordsButton();
        });
    }

}