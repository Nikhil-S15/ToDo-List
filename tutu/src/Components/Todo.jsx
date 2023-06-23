import { React } from "react";
import "./Todo.css";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      console.log(todos);
      setTodo("");
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((value) =>
        value.id === editTodo.id
          ? (value = { id: value.id, list: todo })
          : (value = { id: value.id, list: value.list })
      );
      setTodos(updateTodo);
      setEditId("null");
      setTodo("");
    }
  };

  //   delete function
  const deleteItem = (id) => {
    setTodos(todos.filter((value) => value.id !== id));
  };

  const editItem = (id) => {
    const editTodo = todos.find((value) => value.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo"
          className="form-control"
          value={todo}
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((value) => (
            <li className="list-items" key="index">
              <div className="list-item-list">{value.list}</div>

              <span>
                <BiEdit
                  className="list-icons"
                  id="edit"
                  title="Edit"
                  onClick={() => editItem(value.id)}
                />
                <MdDelete
                  className="list-icons"
                  id="delete"
                  title="Delete"
                  onClick={() => deleteItem(value.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Todo;
