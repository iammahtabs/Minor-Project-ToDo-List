'use strict';

const addItem = document.querySelector("#add-btn");
let input = document.querySelector("#input-text");
const list = document.querySelector("ul");

let todos = [];
if (window.localStorage.getItem("todos") === null) {
    window.localStorage.setItem("todos", JSON.stringify(todos));
}

else{
    let todosEX = window.localStorage.getItem("todos");
    todos = JSON.parse(todosEX);
}

class Item {
    constructor(itemName) {

        this.addToDo(itemName);

    }
    addToDo(itemName) {

        const li = document.createElement("li");
        li.id = itemName;
        li.innerHTML = itemName;

        const crossSpan = document.createElement("span");
        crossSpan.className = "delete";
        crossSpan.innerHTML = '&#10006;';

        list.appendChild(li);
        li.appendChild(crossSpan);

    }

}

addItem.addEventListener('click', check);

input.addEventListener("keyup", (event) => {

    if (event.keyCode === 13) {
        check();
    }

});

function check() {

    if (input.value === "") {
        alert("Invalid Operation! No Input Provided...");
    }

    else {
        const val = input.value;
        new Item(val);
        todos.push(val);
        console.log(todos);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        document.getElementById("input-text").value = "";
    }

}

list.addEventListener('click', (ev) => {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        let text = ev.target.id;
        let index = todos.indexOf(text);
        console.log(index);
        if (ev.target.innerHTML.includes("<strike>")) {
            text = text.replace("<strike>", "");
            text = text.replace("</strike>", "");
            ev.target.innerHTML = text + '<span class = "delete">✖</span>';
            ev.target.id = text;
            todos[index] = text;
        }
        else{
            ev.target.innerHTML = '<strike>' + text + '</strike><span class = "delete">✖</span>';
            ev.target.id = '<strike>' + text + '</strike>';
            todos[index] = '<strike>' + text + '</strike>';
        }
        window.localStorage.setItem("todos", JSON.stringify(todos));

    }
    if (ev.target.className === "delete") {
        const parent = ev.target.parentNode;
        let index = todos.indexOf(parent.id);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        ev.target.parentNode.remove();
    }
}, false);


for (let i = 0; i < todos.length; i++) {
    new Item(todos[i]);
}

document.querySelector("#clr-btn").addEventListener('click', () => {
    list.innerHTML = "";
    todos = [];
    window.localStorage.clear();
});
