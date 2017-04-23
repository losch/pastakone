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

## Release

Build frontend `npm run build`

Create manifest file `MIX_ENV=prod mix phoenix.digest`

Run `MIX_ENV=prod mix release --env=prod` for creating the release.

Create database `MIX_ENV=prod mix ecto.create` and then run migrations
`MIX_ENV=prod mix ecto.migrate`

Start release: `PORT=8000 _build/prod/rel/pastakone/bin/pastakone console`
