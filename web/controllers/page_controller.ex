defmodule Pastakone.PageController do
  use Pastakone.Web, :controller

  alias Pastakone.Pasta

  defp pasta_to_title(pasta) do
    "#{pasta.title} [#{pasta.type}]"
  end

  defp create_title(id) do
    case Repo.get(Pasta, id, select: [:title, :type]) do
      nil -> "Not found"
      pasta -> pasta_to_title(pasta)
    end
  end

  def index(conn, %{"id" => "new"}) do
    render(conn, "index.html", title: "New pasta")
  end

  def index(conn, %{"id" => id}) do
    title = create_title(id)
    render(conn, "index.html", title: title)
  end

  def index(conn, _params) do
    render(conn, "index.html", title: "Hall of Spaghetti")
  end

  # Returns pasta as plain text
  def raw(conn, %{"id" => id}) do
    case Repo.get(Pasta, id, select: [:title, :type]) do
      nil -> "Not found"
      pasta -> text(conn, pasta.contents)
    end
  end
end
