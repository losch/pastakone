# Pastakone - Hall of Spaghetti

A pastebin clone application created with Phoenix Framework, PostgreSQL,
InfernoJS and Ace Editor.

![Screenshot](./screenshots/screenshot.png?raw=true)

## Prerequisites

* Erlang
* Elixir
* npm
* PostgreSQL

## Development mode

Run `mix ecto.create` for creating database.

Run database migrations with `mix echo.migrate`

Start backend with `iex -S mix phoenix.server`

And start Webpack dev server in another terminal: `npm start`

Then open browser at `http://localhost:8080`
