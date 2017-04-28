defmodule Pastakone.PastaController do
  use Pastakone.Web, :controller

  alias Pastakone.Pasta

  def index(conn, %{"query" => query}) do
    pastas = Repo.all(
      from p in Pasta,
      select: [:title, :updated_at, :id, :type],
      where: ilike(p.title, ^"%#{query}%")
    )
    render(conn, "index.json", pastas: pastas)
  end

  def index(conn, _params) do
    pastas = Repo.all(
      from Pasta,
      select: [:title, :updated_at, :id, :type],
      order_by: [desc: :updated_at]
    )
    render(conn, "index.json", pastas: pastas)
  end

  def create(conn, %{"pasta" => pasta_params}) do
    changeset = Pasta.changeset(%Pasta{}, pasta_params)

    case Repo.insert(changeset) do
      {:ok, pasta} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", pasta_path(conn, :show, pasta))
        |> render("show.json", pasta: pasta)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pastakone.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    pasta = Repo.get!(Pasta, id)
    render(conn, "show.json", pasta: pasta)
  end

  def update(conn, %{"id" => id, "pasta" => pasta_params}) do
    pasta = Repo.get!(Pasta, id)
    changeset = Pasta.changeset(pasta, pasta_params)

    case Repo.update(changeset) do
      {:ok, pasta} ->
        render(conn, "show.json", pasta: pasta)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Pastakone.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    pasta = Repo.get!(Pasta, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(pasta)

    send_resp(conn, :no_content, "")
  end
end
