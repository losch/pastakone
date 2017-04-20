defmodule Pastakone.Router do
  use Pastakone.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Pastakone do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/pastas/:id", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", Pastakone do
    pipe_through :api

    resources "/pastas", PastaController, only: [:index, :show, :create, :update]
  end
end
