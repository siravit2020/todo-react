import "./header.css";
import React, { useContext } from "react";
import TodoRespository from "../../repository/todoRepository";
import { MainContext } from "../../reducer/context";
import { CHANGE_ORDER, GET_TODOS } from "../../reducer/actionType";

function Header() {
  const { state, dispatch } = useContext(MainContext);

  function onSelected(orderBy) {
    dispatch({
      type: CHANGE_ORDER,
      payload: {
        orderBy,
      },
    });
    getTodos(orderBy);
  }

  function underline(item) {
    if (state.orderBy === item) return <div className="underline"></div>;
    else return;
  }

  async function getTodos(orderBy) {
    const repository = new TodoRespository();
    const todos = await repository.getTodos(orderBy);
    dispatch({
      type: GET_TODOS,
      payload: {
        todos: todos,
      },
    });
  }
  return (
    <div>
      <div className="todo-header">TodoList</div>
      <div className="filter-layout">
        <div className="filter-title">Order By</div>
        <button
          id="date"
          className={"filter-item " + state.orderBy}
          onClick={() => {
            onSelected("date");
          }}
        >
          Create Date
          {underline("date")}
        </button>
        <button
          id="status"
          className={"filter-item " + state.orderBy}
          onClick={() => {
            onSelected("status");
          }}
        >
          Status
          {underline("status")}
        </button>
      </div>
    </div>
  );
}
export default Header;
