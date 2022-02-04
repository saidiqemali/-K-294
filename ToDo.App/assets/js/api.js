// https://gomakethings.com/how-to-use-the-fetch-api-with-vanilla-js/
let currentUser = undefined
let tasks = []
const baseUrl = "http://localhost:3000"
const email = document.getElementById("input-email")
const password = document.getElementById("input-password")
const defaultHeaders = { "Content-Type": "application/json; charset=utf-8" }
const welcomeElement = document.getElementById("welcome")

let savedToken;
// const savedUser = sessionStorage.getItem('currentUser');
// if (savedUser && savedUser != "") {
//   setUser(JSON.parse(savedUser));
// }

savedToken = sessionStorage.getItem('token');
if (savedToken) {
  toggleSection(savedToken);
}

function authenticate(data) { }

async function index() {
  const response = await fetch(baseUrl + "/tasks")
  return response.json();
}

async function get(id) {
  const response = await fetch(baseUrl + "/tasks" + id)
  return response.json();
}

async function update(id, data) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("owner", 1);
  formData.append("title", data);
  const response = await fetch(baseUrl + "/tasks", {
    method: "PUT",
    body: formData,
  })
  return response.json();
}

async function create(data) {
  alert("Task Created");
  console.log(data);
  let formData = new FormData();
  formData.append("id", 1);
  formData.append("owner", 1);
  formData.append("title", data);

  console.log(formData);
  const response = await fetch(baseUrl + "/tasks", {
    method: "POST",
    body: formData,
  })
  return response.json();
}

async function remove(id) {
  alert("Task Created");
  function showAlert() {
    var myText = "Task Deleted";
    console.log(myText);
  }

  const formData = new FormData();
  formData.append("id", 1);
  console.log("Deleted");
  const response = await fetch(baseUrl + "/tasks", {
    method: "DELETE",
    body: formData,
  })
  return response.json();
}

// eslint-disable-next-line no-unused-vars
async function login() {
  alert("Eingeloggt");
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (response.ok) {
      remember(await response.json());
      savedToken = sessionStorage.getItem('token');
      toggleSection(savedToken);
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
  setUser({ user: "", accessToken: "" })
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

function remember(currentUser) {
  // Daten im sessionStorage speichern
  sessionStorage.setItem('token', currentUser.accessToken);
  sessionStorage.setItem('email', currentUser.user.email);
}

function toggleSection(currentUser) {
  if (currentUser) {
    document.body.classList.add('is-authenticated')
    document.body.classList.remove('is-unauthenticated')
    let currentUser = sessionStorage.getItem('email');
    welcomeElement.innerText = `Hallo ${currentUser}`
  } else {
    document.body.classList.remove('is-authenticated')
    document.body.classList.add('is-unauthenticated')
    welcomeElement.innerText = " ";
  }
}