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
        li.appendChild(document.createTextNode(itemName));

        const crossSpan = document.createElement("span");
        crossSpan.className = "delete";
        crossSpan.innerHTML = '&#10006;';
        crossSpan.addEventListener('click', () => this.clearOption(li, itemName));

        list.appendChild(li);
        li.appendChild(crossSpan);

    }


    clearOption(li, itemName) {

        li.parentNode.removeChild(li);
        let index = todos.indexOf(itemName);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));

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
