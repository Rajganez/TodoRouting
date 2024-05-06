import TodoData from "./TodoData";
import { useState } from "react";

const TodoHome = () => {
  //State to Display all the Todos
  const [Todo, showTodo] = useState(TodoData);
  //State to Filter Todos
  const [filterTodos, showFilterTodos] = useState(TodoData);
  //State to Change Color
  const [, setTodocolor] = useState(TodoData);
  //State to Add Todo
  const [newTodo, addTodo] = useState({
    name: "",
    description: "",
    status: "Not Completed",
  });
  //State to Delete Todo
  const deleteTodo = (todoID) => {
    const deletedTodo = Todo.filter((todos) => todos.id !== todoID);
    showTodo(deletedTodo);
    showFilterTodos(deletedTodo);
  };
  //Create a Todo and Create a ID's for Todo
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ ...newTodo, id: Date.now() });
    const tempTodo = [...Todo, newTodo];
    showTodo(tempTodo);
    showFilterTodos(tempTodo);
  };
  const addTodos = (e) => {
    addTodo({ ...newTodo, [e.target.name]: e.target.value });
  };
  //Filter Todos
  const changeOptions = (e) => {
    if (e.target.value === "Completed") {
      showFilterTodos(Todo.filter((dodo) => dodo.status === "Completed"));
    } else if (e.target.value === "Not Completed") {
      showFilterTodos(Todo.filter((dodo) => dodo.status === "Not Completed"));
    } else if (e.target.value === "All") {
      showFilterTodos(Todo);
    }
  };
  //Change color
  const changeColor = (e) => {
    if (e.target.value === "Completed") {
      setTodocolor((e.target.style.background = "green"));
    } else if (e.target.value === "Not Completed") {
      setTodocolor((e.target.style.background = "red"));
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="row p-3 d-flex justify-content-center text-center">
          My Todo
        </h1>
        <form className="d-flex flex-row mb-3 gx-5">
          <div className="d-flex flex-row mb-3 p-2 ">
            <input
              type="text"
              name="name"
              placeholder="Todo Name"
              className="form-control col m-2 "
              value={newTodo.name}
              onChange={addTodos}
            />
            <input
              type="text"
              name="description"
              placeholder="Todo Description"
              className="form-control col m-2"
              value={newTodo.description}
              onChange={addTodos}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="m-2 btn btn-success"
            >
              Add Todo
            </button>
          </div>
        </form>
        <div className="row">
          <h2 className="text-start">My Todos</h2>
          <h5 className="text-end">
            Status Filter : &nbsp;
            <select
              defaultValue="All"
              className="col btn"
              onChange={changeOptions}
              style={{ width: "12%", background: "#FD8182" }}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </h5>
        </div>
        {/* Todo data is displayed here */}
        <div className="d-md-flex flex-wrap">
          {filterTodos.map((task) => (
            <div
              className="card p-2 m-2"
              key={task.id}
              style={{ width: "18rem", background: "#CCF5D3" }}
            >
              <div className="card-body">
                <p key={task.name} className="card-text mb-2">
                  Name : {task.name}
                </p>
                <p className="card-text" key={task.description}>
                  Description : {task.description}
                </p>
                <span>Status : </span>
                <select
                  key={task.status}
                  defaultValue={task.status}
                  className="col"
                  aria-label="Default select example"
                  style={{
                    width: "70%",
                    background:
                      task.status === "Not Completed" ? "red" : "green",
                  }}
                  onChange={changeColor}
                >
                  <option value="Not Completed">Not Completed</option>
                  <option value="Completed">Completed</option>
                </select>
                <br />
                <br />
                <div className="ps-5 ms-5">
                  <button href="#" className="card-link btn btn-success">
                    Edit
                  </button>
                  <button
                    href="#"
                    className="card-link btn btn-danger"
                    onClick={() => deleteTodo(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default TodoHome;
