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
			throw new Error(await response.json())
		}
	} catch (error) {
		console.error(error)
	}
}

// eslint-disable-next-line no-unused-vars
function logout() {
	setUser(null)
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
		welcomeElement.innerText = ""
	}
}
