function newTitle() {
    let li = document.createElement("li");
    const inputValue = document.getElementById("inputTitle").value;

    let newLi = document.createTextNode(inputValue);
    li.appendChild(newLi);

    inputValue === '' ? alert("You must write something!") : document.getElementById("titles").appendChild(li);
    document.getElementById("inputTitle").value = "";

    let span = document.createElement("span");
    span.className = "close";
    let text = document.createTextNode("\u00D7");

    span.appendChild(text);
    li.appendChild(span);
}