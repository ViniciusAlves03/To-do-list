const close = document.querySelectorAll(".close");
const done = document.querySelectorAll(".done");

function newTask() {
    const inputValue = document.querySelector("#inputTask").value;
    if (inputValue === '') {
        alert("You didn't type anything");
    }

    else {
        const li = createTaskElement(inputValue);
        const closeButton = createButtonElement("close", "\u274C", deleteTask);
        const doneButton = createButtonElement("done", "\u2714\uFE0F", markTaskAsDone);

        li.appendChild(closeButton);
        li.appendChild(doneButton);

        document.querySelector("#tasks").appendChild(li);
        document.querySelector("#inputTask").value = "";
    }
}

function createTaskElement(text) {
    const li = document.createElement("li");
    const newLi = document.createTextNode(text);
    li.appendChild(newLi);
    return li;
}

function createButtonElement(className, text, callback) {
    const span = document.createElement("span");
    span.className = className;
    const button = document.createTextNode(text);
    span.appendChild(button);
    span.addEventListener("click", callback);
    return span;
}

function deleteTask() {
    const div = this.parentElement;
    div.style.display = "none";
}

function markTaskAsDone() {
    const div = this.parentElement;
    div.style.backgroundColor = "#BEBEBE";
}