defmodule Pastakone.PastaControllerTest do
  use Pastakone.ConnCase

  alias Pastakone.Pasta
  @valid_attrs %{contents: "some content", title: "some content", type: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, pasta_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    pasta = Repo.insert! %Pasta{}
    conn = get conn, pasta_path(conn, :show, pasta)
    assert json_response(conn, 200)["data"] == %{"id" => pasta.id,
      "title" => pasta.title,
      "type" => pasta.type,
      "contents" => pasta.contents}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, pasta_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, pasta_path(conn, :create), pasta: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Pasta, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, pasta_path(conn, :create), pasta: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    pasta = Repo.insert! %Pasta{}
    conn = put conn, pasta_path(conn, :update, pasta), pasta: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Pasta, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    pasta = Repo.insert! %Pasta{}
    conn = put conn, pasta_path(conn, :update, pasta), pasta: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    pasta = Repo.insert! %Pasta{}
    conn = delete conn, pasta_path(conn, :delete, pasta)
    assert response(conn, 204)
    refute Repo.get(Pasta, pasta.id)
  end
end
