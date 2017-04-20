defmodule Pastakone.PastaView do
  use Pastakone.Web, :view

  def render("index.json", %{pastas: pastas}) do
    render_many(pastas, Pastakone.PastaView, "pasta.json")
  end

  def render("show.json", %{pasta: pasta}) do
    %{data: render_one(pasta, Pastakone.PastaView, "pasta.json")}
  end

  def render("pasta.json", %{pasta: pasta}) do
    %{id: pasta.id,
      title: pasta.title,
      type: pasta.type,
      contents: pasta.contents,
      updated_at: pasta.updated_at}
  end
end
