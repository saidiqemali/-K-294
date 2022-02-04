var tasksList = document.getElementById('tasksList');
var taskform = document.getElementById('taskform');


// Do this when we submit the form
taskform.addEventListener('submit', function (e) {
  e.preventDefault();

console.log(inputNewToDO);
  var title = inputNewToDO.value;
console.log(title);
  create(title).then(data => {
    console.log(data);
    // addTask({
    //   id: data.id,
    //   title: title
    // });
    // document.getElementById("card-" + data.id).focus();
  });
});

// To  add task in List
function addTask(newTask) {
  console.log(newTask);
  // Create li element and set its class
  let newTaskItem = document.createElement('div');
  newTaskItem.setAttribute('id', 'card-' + newTask.id)
  newTaskItem.setAttribute('class', 'card')
  let newTaskTitle = document.createElement('header');
  newTaskTitle.setAttribute('class', 'title');
  // Put value of input in it
  // TODO: Add <button class="delete"></button>
  newTaskTitle.innerText = `${newTask.id} :: ` + newTask.title; // putting value of input in the li
  // append (insert) span tag in li
  newTaskItem.appendChild(newTaskTitle)
  // append (insert) li tag in Ul
  tasksList.appendChild(newTaskItem)

}
