defmodule Pastakone.PageController do
  use Pastakone.Web, :controller

  alias Pastakone.Pasta

  defp create_title(id) do
    case Repo.get(Pasta, id, select: [:title, :type]) do
      nil -> "Not found"
      pasta -> "#{pasta.title} [#{pasta.type}]"
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
end
