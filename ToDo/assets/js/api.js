// https://gomakethings.com/how-to-use-the-fetch-api-with-vanilla-js/
let base_url = "https://jsonplaceholder.typicode.com";

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
  const formData = new FormData();
  formData.append("id", 1);
  const response = await fetch(base_url + "/todos", {
    method: "DELETE",
    body: formData,
  })
  return response.json();
}
