//класс инициализации рекордов
class Records extends Registration{

    initRecords(){
        const layOut = document.querySelector('#menuContainer');
        layOut.classList.add('LayoutForRecords');
        if(localStorage.length == 0) {
            this.initLackOfRecords();
            this.initBackButtonInRecords();
        }else{
            this.sortRecords();
            this.initDescriptionOfTheHighscoreTable();
            this.initHighscoreTable();
            this.initBackButtonInRecords();
            this.unpackingRecords();
            this.zeroingOfRecordsButton();
        }
    }

    initBackButtonInRecords(){
        const ButtonsContainer = document.createElement('div');
        ButtonsContainer.classList.add("ButtonsContainer");
        ButtonsContainer.classList.add("ButtonsOfRecords");
        ButtonsContainer.id = "ButtonsContainer";
        menuContainer.appendChild(ButtonsContainer);
        super.initBackButton();
        const backButton = document.querySelector("#Back");
        backButton.classList.add('ButtonInHighscores');
        backButton.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForRecords");
        });
    }

    initDescriptionOfTheHighscoreTable(){
        const div = document.createElement("div");
        div.classList.add("about");
        div.classList.add("DescriptionOfTheHighscoreTable");
        div.textContent = "Here are the top 10 players!";
        menuContainer.appendChild(div);
    }

    initHighscoreTable(){
        const table = document.createElement('table');
        const tr = document.createElement('tr');
        const arrayOfAttributes = ["Number","First Name", "Last Name", "Email", "Time"];
        table.id = "HighscoreTable";
        menuContainer.appendChild(table);
        table.appendChild(tr);
        for(let i = 0; i < arrayOfAttributes.length; i++){
            const td = document.createElement('td');
            td.textContent = arrayOfAttributes[i];
            tr.appendChild(td);
        }
    }

    unpackingRecords(){
        let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("records"))).length;
        let arrayOfKeys = Object.keys(JSON.parse(localStorage.getItem("records")));
        if(countOFPeople < 10){
            for(let i = 0; i < countOFPeople; i++){
                let firstName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].firstName;
                let lastName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].lastName;
                let email = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].email;
                let time = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].time;
                let arrayOfAttributes = [i + 1, firstName, lastName, email, time];
                const tr = document.createElement('tr');
                HighscoreTable.appendChild(tr);
                for(let i = 0; i < arrayOfAttributes.length; i++){
                    const td = document.createElement('td');
                    td.textContent = arrayOfAttributes[i];
                    tr.appendChild(td);
                }
            }
        }else{
            //TODO:Do not forget to rework the section, so as not to look at how many people are in records
            for(let i = 0; i < 10; i++){
                let firstName = JSON.parse(localStorage.getItem("people"))[arrayOfKeys[i]].firstName;
                let lastName = JSON.parse(localStorage.getItem("people"))[arrayOfKeys[i]].lastName;
                let email = JSON.parse(localStorage.getItem("people"))[arrayOfKeys[i]].email;
                let time = JSON.parse(localStorage.getItem("people"))[arrayOfKeys[i]].time;
                let arrayOfAttributes = [arrayOfKeys[i],firstName, lastName, email, time];
                const tr = document.createElement('tr');
                HighscoreTable.appendChild(tr);
                for(let j = 0; j < arrayOfAttributes.length; j++){
                    const td = document.createElement('td');
                    td.textContent = arrayOfAttributes[j];
                    tr.appendChild(td);
                }
            }
        }
    }

    initLackOfRecords(){
        const div = document.createElement('div');
        div.classList.add("about");
        div.classList.add("DescriptionOfTheHighscoreTable");
        div.textContent = "Play to see the records here!";
        menuContainer.appendChild(div);
    }

    zeroingOfRecordsButton(){
        const button = document.createElement('button');
        button.classList.add("ButtonInHighscores");
        button.classList.add("Buttons");
        button.textContent = "Reset Records";
        ButtonsContainer.appendChild(button);
        button.addEventListener("click" , () => {
            menu.clear();
            localStorage.clear();
            this.initRecords();
        });
    }

    sortRecords(){
        let entries = Object.entries(JSON.parse(localStorage.getItem("people")));
        let sorted = entries.sort((a, b) => a[1].time - b[1].time);
        for(let i = 0; i < sorted.length; i++){
            let minutes = Math.floor(sorted[i][1].time / 60);
            let seconds = sorted[i][1].time - minutes * 60;
            sorted[i][1].time = `${minutes}:${seconds}`;
        }
        let serialObj = JSON.stringify(sorted);
        localStorage.setItem('records',serialObj);
    }

}