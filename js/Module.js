//modules methods
let button = (classOfButton, nameOfButton, id, location) => {
    const button = document.createElement('button');
    for(let i = 0; i < classOfButton.length;i++){
        button.classList.add(classOfButton[i]);
    }
    button.textContent = nameOfButton;
    button.id = id;
    location.appendChild(button);
}
let container = (element, classOfContainer, id, location) => {
    const container = document.createElement(element);
    if(classOfContainer != null){
        for(let i = 0; i < classOfContainer.length; i++){
            container.classList.add(classOfContainer[i]);
        }
    }
    if( id != null) container.id = id;
    location.appendChild(container);
}

let clear = () => {
    while (document.querySelector("#menuContainer").firstChild) {
        document.querySelector("#menuContainer").removeChild(document.querySelector("#menuContainer").firstChild);
    }
}
let notification = (string) => {
    const notifiContainer = document.createElement("div");
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