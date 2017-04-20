defmodule Pastakone.PastaTest do
  use Pastakone.ModelCase

  alias Pastakone.Pasta

  @valid_attrs %{contents: "some content", title: "some content", type: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Pasta.changeset(%Pasta{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Pasta.changeset(%Pasta{}, @invalid_attrs)
    refute changeset.valid?
  end
end
