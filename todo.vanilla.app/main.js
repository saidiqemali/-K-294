let addToDoButton = document.getElementById('btn');
let toDoContainer = document.getElementById('toDoContainer');
let inputNewToDO = document.getElementById('inputNewToDO');

addToDoButton.addEventListener('click', function () {
    alert("Added Task");
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputNewToDO.value;
    tasksList.appendChild(paragraph);
    inputNewToDO.value = "";


    paragraph.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";
        alert("Completed Task");
    })
    paragraph.addEventListener('dblclick', function () {
        toDoContainer.removeChild(paragraph);
        alert("Delted Task");
    })

    var edit_input = document.createElement('INPUT');
    edit_input.classList.add('edit-input');
    edit_input.classList.add('hide');
    edit_input.name = 'edit-input'
})


