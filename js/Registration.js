//class call a registration before a game
class Registration{

    initRules(){
        const rules = document.createElement('div');
        const ButtonsContainer = document.createElement('div');
        const containerCommunications = document.createElement('div');
        ButtonsContainer.classList.add("ButtonsContainer");
        ButtonsContainer.id = "ButtonsContainer";
        rules.classList.add("rules");
        rules.id = "rules";
        rules.textContent = "You have to fill out contact details, and also choose a card shirt and complexity, after then the game will start, the timer will go, you have to find pairs as soon as possible, GOOD LUCK AND HAVE A FUN !";
        menuContainer.appendChild(rules);
        containerCommunications.classList.add("containerCommunications");
        containerCommunications.id = "containerCommunications";
        menuContainer.appendChild(containerCommunications);
        this.initCommunications();
        containerCommunications.appendChild(ButtonsContainer);
        this.initBackButton();
        this.initNext();
    }

    initNext(){
        const next = document.createElement('button');
        next.classList.add("Buttons");
        next.id = "next";
        next.textContent = "Next";
        ButtonsContainer.appendChild(next);
        next.addEventListener("click" , () => {
            //Do not forget to record the records at the end of the game
            let firstName = document.getElementsByTagName('input')[0].value;
            let lastName = document.getElementsByTagName('input')[1].value;
            let email = document.getElementsByTagName('input')[2].value;
            if (firstName == "" || lastName == "" || email == ""){
                //it is possible to screw the component
                alert('Fill all fields!');
            }else if(firstName.length > 26 || lastName.length > 25|| email.length > 25){
                alert('More than 25 symbols in forms!');
            }
            else{
                let table = {};
                let person = {};
                person.firstName = firstName;
                person.lastName = lastName;
                person.email = email;
                person.time = 0;
                currentSettings.person = person;
                if(localStorage.people == undefined){
                    table['1'] = person;
                    let serialobj = JSON.stringify(table);
                    window.localStorage.setItem("people",serialobj);
                }else{
                    let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("people"))).length;
                    let ObjectOfElements = JSON.parse(localStorage.getItem("people"));
                    ObjectOfElements [`${countOFPeople + 1}`] = person;
                    let serialobj = JSON.stringify(ObjectOfElements);
                    window.localStorage.setItem("people",serialobj);
                }
                menu.clear();
                let gameSettings = new GameSettings();
                gameSettings.initSettings();
                //do not forget to erase 2 lines with output
                let returnObj = JSON.parse(localStorage.getItem("people"));
                console.log(returnObj);
            }
            
        });
    }

    initCommunications(){
        const attributes = ["First Name", "Last Name", "Email"];
        const form = document.createElement('form');
        containerCommunications.appendChild(form);
        form.classList.add("communications");
        form.id = "communications";
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
        const button = document.createElement('button');
        button.classList.add("Buttons");
        button.id = "Back";
        button.textContent = "Back";
        ButtonsContainer.appendChild(button);
        button.addEventListener("click" , () => {
            menu.clear();
            menu.initAbout();
            menu.initGameButton();
            menu.initRecordsButton();
        });
    }

}