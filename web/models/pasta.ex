defmodule Pastakone.Pasta do
  use Pastakone.Web, :model

  schema "pastas" do
    field :title, :string
    field :type, :string
    field :contents, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :type, :contents])
    |> validate_required([:title, :type, :contents])
  end
end
