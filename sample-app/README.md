# TaskFlow API

TaskFlow is a small service for managing tasks.

## Getting started

Install dependencies and start the server:

```
npm install
node app.js
```

The API will be available on **http://localhost:3000**.

## Configuration

TaskFlow needs a database connection. Set the following before starting:

- `DATABASE_URL` – connection string for the **MongoDB** database.

## Authentication

Requests to `/tasks` are protected. Authentication is handled by the
**legacy-auth** module, which checks an API key on each request.

## Endpoints

- `GET /health` – returns the service name and version.
- `GET /tasks` – list all tasks.
- `POST /tasks` – create a task.

## Notes

This README reflects the original design of the service. Some details may
have changed as the code evolved.
