import "./todoList.scss";
import TodoRepository from "../../repository/todoRepository";
import { BsCheck, BsX } from "react-icons/bs";
import { CREATE_TODO } from "../../reducer/actionType";
import { MainContext } from "../../reducer/context";
import { useContext, useState } from "react";
function CreateTodo() {
  const { dispatch } = useContext(MainContext);
  const todoRepository = new TodoRepository();
  const [inputState, setInputState] = useState("");

  async function create(message) {
    if (!!!message) return;
    const response = await todoRepository.createTodo(message);
    if (response.success)
      dispatch({
        type: CREATE_TODO,
        payload: {
          todo: response.todo,
        },
      });
  }

  return (
    <div className="card-border">
      <div className="content">
        <div className="message-layout">
          <textarea
            rows={3}
            placeholder="Enter text"
            value={inputState}
            onChange={(event) => {
              setInputState(event.target.value);
            }}
            className="textarea"
            style={{ marginBottom: "20px" }}
          ></textarea>
        </div>
      </div>
      <div className="action">
        <BsCheck
          size={24}
          style={{ color: "#408558" }}
          type="button"
          onClick={() => {
            setInputState("");
            create(inputState);
          }}
        />
        <BsX
          size={24}
          style={{ color: "#FF5353" }}
          type="button"
          onClick={() => {
            setInputState("");
          }}
        />
      </div>
    </div>
  );
}
export default CreateTodo;
