# ID0

> i do: track your tasks

## Context

For the sake of this course, we are going to build a todo list management app. The user has access to a web app where they can fetch, create, edit and delete todos, which are persisted in the backend.

To standardize the [REST API definitions](APISpecification.yml), we use the [OpenAPI Specification](https://swagger.io/specification/) an adopt the design-first approach. The design-first approach advocates for designing the API’s contract first before writing any code.

The backend will be an Express.js app that will expose over a REST API the following functionalities:

* Fetch todos: [GET] /todos
* Create a todo: [POST] /todos
* Fetch a todo: [GET] /todos/{id}
* Update a todo: [POST] /todos/{id}
* Delete a todo: [DELETE] /todos/{id}

This is an over-simplification of the functionalities that a todo management app will need, but will serve to show and practices the development of APIs.

## Links and Sources

* [OpenAPI Specification](https://swagger.io/specification/)
* [Automatically validate API requests using an OpenAPI 3 specification](https://levelup.gitconnected.com/build-an-api-with-node-js-4573d3520cf)
* [Documenting a Node.js REST API using Swagger](https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/)
* [Adding OpenAPI to an Express app](https://dvisagie.com/post/express-openapi/)
* [Documenting a NodeJS REST API with OpenApi 3/Swagger](https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420)
* [API Development with Design-first Approach](https://blog.restcase.com/api-development-with-design-first-approach/)
* [Secrets of a great API](https://www.mulesoft.com/lp/whitepaper/api/secrets-great-api)
* [Setting up an express service using Swagger 3.0](https://nikhilvijayan.com/open-api-swagger-3-setup)
* [Better Error Handling in Express.js](https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7)

## License

This project is licensed under the terms of the [MIT license](LICENSE.md).
