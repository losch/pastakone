defmodule Pastakone.Repo.Migrations.CreatePasta do
  use Ecto.Migration

  def change do
    create table(:pastas) do
      add :title, :string
      add :type, :string
      add :contents, :text

      timestamps()
    end

  end
end
