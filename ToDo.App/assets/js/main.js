let addToDoButton = document.getElementById('addToDoButton');
let toDoContainer = document.getElementById('toDoContainer');
let inputNewToDO = document.getElementById('inputNewToDO');


addToDoButton.addEventListener('click', function () {
    let inputNewToDO = document.getElementById('inputNewToDO');
    console.log(inputNewToDO);
    let title = inputNewToDO.value;
    console.log(title);
    create(title).then(data => {
        console.log(data);
    });

    //alert("Added Task");
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = inputNewToDO.value;
    tasksList.appendChild(paragraph);
    // inputNewToDO.value = "";
    paragraph.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";
        alert("Completed Task");
    })
    paragraph.addEventListener('dblclick', function () {
        toDoContainer.removeChild(paragraph);
        alert("Delted Task");
    })

    var edit_input = document.createElement('input');
    edit_input.classList.add('edit-input');
    edit_input.classList.add('hide');
    edit_input.name = 'edit-input';



})


