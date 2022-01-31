import "./todoList.scss";
import { Form, Spinner } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import { MainContext } from "../../reducer/context";
import TodoRepository from "../../repository/todoRepository";
import moment from "moment";
import {
  DELETE_TODO,
  UPDATE_TODO_MESSAGE,
  UPDATE_TODO_STATUS,
} from "../../reducer/actionType";
import { STATUS_COMPLETE, STATUS_TODO } from "../../constants/enum";
import { BsPen, BsTrash, BsCheck, BsX } from "react-icons/bs";
import CreateTodo from "./createTodo";
function TodoList() {
  const todoRepository = new TodoRepository();
  const { state, dispatch } = useContext(MainContext);
  const [indexEditState, setIndexEditState] = useState(-1);
  const inputRef = useRef(null);

  async function updateTodoStatus(index, id, statusTodo) {
    const status =
      statusTodo === STATUS_COMPLETE ? STATUS_TODO : STATUS_COMPLETE;
    const response = await todoRepository.updateTodoStatus(id, status);
    if (response.success)
      dispatch({
        type: UPDATE_TODO_STATUS,
        payload: {
          index,
          status: response.status,
        },
      });
  }

  async function updateTodoMessage(index, id, message) {
    const response = await todoRepository.updateTodoMessage(id, message);
    if (response.success)
      dispatch({
        type: UPDATE_TODO_MESSAGE,
        payload: {
          index,
          message,
        },
      });
  }

  async function deleteTodo(index, id) {
    const response = await todoRepository.deleteTodo(id);
    if (response.success)
      dispatch({
        type: DELETE_TODO,
        payload: {
          index,
          id,
        },
      });
  }

  function action(index, item) {
    return indexEditState === index ? (
      <React.Fragment>
        <BsCheck
          size={24}
          style={{ color: "#408558" }}
          type="button"
          onClick={() => {
            updateTodoMessage(index, item.id, inputRef.current);
            setIndexEditState(-1);
          }}
        />
        <BsX
          size={24}
          style={{ color: "#FF5353" }}
          type="button"
          onClick={() => {
            setIndexEditState(-1);
          }}
        />
      </React.Fragment>
    ) : item.status === STATUS_COMPLETE ? (
      <React.Fragment>
        <BsPen
          className="pen"
          style={{ color: "rgba(255, 255, 255, 0.4)" }}
        ></BsPen>
        <BsTrash style={{ color: "rgba(255, 255, 255, 0.4)" }}></BsTrash>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <BsPen
          className="pen"
          type="button"
          onClick={() => {
            setIndexEditState(index);
          }}
        ></BsPen>
        <BsTrash
          type="button"
          onClick={() => {
            deleteTodo(index, item.id);
          }}
        ></BsTrash>
      </React.Fragment>
    );
  }

  function date(item) {
    return item?.status === STATUS_COMPLETE
      ? "Complete"
      : moment(item.createdAt).format("MMM Do YYYY HH:mm");
  }

  function list() {
    return state.todos.map((item, index) => {
      return (
        <div
          className={indexEditState === index ? "card-border" : "card"}
          key={item.id}
        >
          <div className="content">
            <Form.Check
              isValid={true}
              defaultChecked={item?.status === STATUS_COMPLETE}
              onChange={(e) => {
                setIndexEditState(-1);
                updateTodoStatus(index, item.id, item.status);
              }}
              id="check-box"
            />
            <div className="message-layout">
              <div
                contentEditable={indexEditState === index ? true : false}
                suppressContentEditableWarning={true}
                onInput={(event) => {
                  inputRef.current = event.target.textContent;
                }}
                className={
                  item?.status === STATUS_COMPLETE
                    ? "textarea-line"
                    : "textarea"
                }
              >
                {indexEditState === index ? item.message + " " : item.message}
              </div>
              <div className="date">{date(item)}</div>
            </div>
          </div>
          <div className="action">{action(index, item)}</div>
        </div>
      );
    });
  }

  if (!!state) {
    if (!!state.loading)
      return <Spinner animation="border" variant="light" className="loading" />;
    if (!!state.todos)
      return (
        <section className="container">
          <CreateTodo></CreateTodo>
          <div style={{ paddingTop: "16px" }}></div>
          {list()}
        </section>
      );
  } else return <div></div>;
}
export default TodoList;
