// https://gomakethings.com/how-to-use-the-fetch-api-with-vanilla-js/
let base_url = "https://jsonplaceholder.typicode.com";
let currentUser = undefined
let tasks = []
const baseUrl = "http://localhost:3000"
const email = document.getElementById("input-email")
const password = document.getElementById("input-password")
const defaultHeaders = { "Content-Type": "application/json; charset=utf-8" }
const welcomeElement = document.getElementById("welcome")

const savedUser = sessionStorage.getItem('currentUser');
if (savedUser && savedUser != "") {
    setUser(JSON.parse(savedUser));
}

function authenticate(data) {}

async function index() {
  const response = await fetch(base_url + "/todos")
  return response.json();
}

async function get(id) {
  const response = await fetch(base_url + "/todos/" + id)
  return response.json();
}

async function update(id, data) {
  const formData = new FormData();
  formData.append("id", 1);
  formData.append("userId", 1);
  formData.append("title", "delectus aut autem");
  formData.append("completed", false);
  const response = await fetch(base_url + "/todos", {
    method: "POST",
    body: formData,
  })
  return response.json();
}

async function create(data) {
  const formData = new FormData();
  formData.append("userId", 1);
  formData.append("title", data);
  formData.append("completed", false);
  const response = await fetch(base_url + "/todos", {
    method: "POST",
    body: formData,
  })
  return response.json();
}

async function remove(id) {

  function showAlert() {
    var myText = "Task Deleted";
    console.log(myText);
  }

  const formData = new FormData();
  formData.append("id", 1);
  console.log("Deleted");
  const response = await fetch(base_url + "/todos", {
    method: "DELETE",
    body: formData,
  })
  return response.json();
}

// eslint-disable-next-line no-unused-vars
async function login() {
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify({ email: email.value, password: password.value })
        })
        if (response.ok) {
            setUser(await response.json())
        } else {
            throw new Error(await response.json())
        }
    }
    catch (error) {
        console.error(error)
    }
}

// eslint-disable-next-line no-unused-vars
async function register() {
    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify({ email: email.value, password: password.value })
        })
        if (response.ok) {
            console.log(await response.json())
        } else {
            alert("Bereits Registriert");
        }
    } catch (error) {
        console.error(error)
    }
}

// eslint-disable-next-line no-unused-vars
function logout() {
    setUser({user:"", accessToken:""})
    window.location.reload();

}

// eslint-disable-next-line no-unused-vars
async function loadTasks() {
  console.log(currentUser);
    const authorization = !currentUser ? {} : { "Authorization": `Bearer ${currentUser.token}` }
    const response = await fetch(`${baseUrl}/tasks`, {
        method: "GET",
        headers: { ...authorization },
    })
    tasks = await response.json()
  console.log(tasks);
}

function setUser(auth) {
  console.log(auth);
    currentUser = auth.user
  currentUser.token = auth.accessToken;
  console.log(currentUser);
    // sessionStorage.setItem('currentUser', user ? JSON.stringify(currentUser) : null);

    if (currentUser) {
        document.body.classList.add('is-authenticated')
        document.body.classList.remove('is-unauthenticated')
        welcomeElement.innerText = `Hallo ${currentUser.email}`
    } else {
        document.body.classList.remove('is-authenticated')
        document.body.classList.add('is-unauthenticated')
        welcomeElement.innerText = " ";
    }
}