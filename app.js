const close = document.getElementsByClassName("close");
const done = document.getElementsByClassName("done");

function newTask() {
    let li = document.createElement("li");
    const inputValue = document.querySelector("#inputTask").value;

    let newLi = document.createTextNode(inputValue);
    li.appendChild(newLi);

    inputValue === '' ? alert("You didn't type anything") : document.querySelector("#tasks").appendChild(li);
    document.querySelector("#inputTask").value = "";

    for (let i = 0; i < 2; i++) {

        if (i === 1) {
            let span = document.createElement("span");
            span.className = "close";
            let text = document.createTextNode("\u274C");

            span.appendChild(text);
            li.appendChild(span);
        }
        else {
            let span = document.createElement("span");
            span.className = "done";
            let text = document.createTextNode("\u2714\uFE0F");

            span.appendChild(text);
            li.appendChild(span);
        }
    }

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let div = this.parentElement;
          div.style.display = "none";
        }
    }

    for (let i = 0; i < done.length; i++) {
        done[i].onclick = function() {
          let div = this.parentElement;
          div.style.backgroundColor = "#FFFA00";
        }
    }
}