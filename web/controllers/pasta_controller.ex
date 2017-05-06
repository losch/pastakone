defmodule Pastakone.PastaController do
  use Pastakone.Web, :controller

  alias Pastakone.Pasta

  defp orderByField(orderBy) do
    case orderBy do
      "title" -> :title
      "updated_at" -> :updated_at
      "type" -> :type
    end
  end

  defp addOrderBy(query, params) do
    case params do
      %{"orderBy" => orderBy, "order" => "asc"} ->
        order_by(query, [p], [asc: ^orderByField(orderBy)])

      %{"orderBy" => orderBy, "order" => "desc"} ->
        order_by(query, [p], [desc: ^orderByField(orderBy)])

      _ ->
        query
    end
  end

  defp addTitleFilter(query, params) do
    case params do
      %{"query" => titleQuery} ->
        where(query, [p], ilike(p.title, ^"%#{titleQuery}%"))
      _ ->
        query
    end
  end

  defp addLimit(query, params) do
    case params do
      %{"limit" => limit, "offset" => offset} ->
        query
          |> limit(^limit)
          |> offset(^offset)
      _ ->
        query
    end
  end

  def index(conn, params) do
    pastas = (from p in Pasta, select: [:title, :updated_at, :id, :type])
      |> addTitleFilter(params)
      |> addOrderBy(params)
      |> addLimit(params)
      |> Repo.all

    total_count = (from p in Pasta)
      |> select([p], count(p.id))
      |> addTitleFilter(params)
      |> Repo.all

    render(conn, "index.json", pastas: pastas, total_count: total_count)
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
