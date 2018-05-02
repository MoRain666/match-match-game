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
            this.zeroingOfRecordsButton();
            this.unpackingRecords();
        }
    }

    initBackButtonInRecords(){
        container("div", ["ButtonsContainer", "ButtonsOfRecords"], "ButtonsContainer", menuContainer);
        super.initBackButton();
        const backButton = document.querySelector("#back");
        backButton.classList.add('ButtonInHighscores');
        backButton.addEventListener("click" , () => {
            document.querySelector('#menuContainer').classList.remove("LayoutForRecords");
        });
    }

    initDescriptionOfTheHighscoreTable(){
        container("div", ["about", "DescriptionOfTheHighscoreTable"], "DescriptionOfTheHighscoreTable", menuContainer);
        DescriptionOfTheHighscoreTable.textContent = "Here are the top 10 players!";
    }

    initHighscoreTable(){
        container('table', null, "HighscoreTable", menuContainer);
        container('tr', null, "tr", HighscoreTable);
        const arrayOfAttributes = ["Number","First Name", "Last Name", "Email", "Time"];
        for(let i = 0; i < arrayOfAttributes.length; i++){
            const td = document.createElement('td');
            td.textContent = arrayOfAttributes[i];
            tr.appendChild(td);
        }
    }

    unpackingRecords(){
        let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("records"))).length;
        let arrayOfKeys = Object.keys(JSON.parse(localStorage.getItem("records")));
        if(countOFPeople > 10){
            let array = JSON.parse(localStorage.getItem("records"));
            for(let i = 10; i < array.length; i++){
                array.pop();
            }
            let serialObj = JSON.stringify(array);
            localStorage.setItem('records',serialObj);    
        }
        countOFPeople = Object.keys(JSON.parse(localStorage.getItem("records"))).length;
        for(let i = 0; i < countOFPeople; i++){
            let firstName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].firstName;
            let lastName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].lastName;
            let email = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].email;
            let time = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].time;
            let arrayOfAttributes = [i + 1,firstName, lastName, email, time];
            const tr = document.createElement('tr');
            HighscoreTable.appendChild(tr);
            for(let j = 0; j < arrayOfAttributes.length; j++){
                const td = document.createElement('td');
                td.textContent = arrayOfAttributes[j];
                tr.appendChild(td);
            }
        }
    }

    initLackOfRecords(){
        container("div", ["about", "DescriptionOfTheHighscoreTable"], "lackOfRecords", menuContainer);
        lackOfRecords.textContent = "Play to see the records here!";
    }

    zeroingOfRecordsButton(){
        button(["ButtonInHighscores", "Buttons"], "Reset Records", "resetRecords", ButtonsContainer);
        resetRecords.addEventListener("click" , () => {
            clear();
            localStorage.clear();
            this.initRecords();
        });
    }

    //sorting records method
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