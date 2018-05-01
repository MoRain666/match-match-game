//modules methods
function button(classOfButton, nameOfButton, id, location){
    const button = document.createElement('button');
    for(let i = 0; i < classOfButton.length;i++){
        button.classList.add(classOfButton[i]);
    }
    button.textContent = nameOfButton;
    button.id = id;
    location.appendChild(button);
}
function container(element, classOfContainer, id, location){
    const container = document.createElement(element);
    if(classOfContainer != null) container.classList.add(classOfContainer);
    if( id != null) container.id = id;
    location.appendChild(container);
}

function clear(){
    while (document.querySelector("#menuContainer").firstChild) {
        document.querySelector("#menuContainer").removeChild(document.querySelector("#menuContainer").firstChild);
    }
}
function notification(string){
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