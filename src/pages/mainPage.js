import Header from "../components/header/header";
import TodoList from "../components/todoList/todoList";
import React, { useEffect, useContext } from "react";

import TodoRepository from "../repository/todoRepository";
import { MainContext } from "../reducer/context";
import { GET_TODOS, LOADING } from "../reducer/actionType";

function MainPage() {
  const { dispatch } = useContext(MainContext);
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getTodos() {
    dispatch({
      type: LOADING,
    });
    const todoRepository = new TodoRepository();
    const todos = await todoRepository.getTodos();
    dispatch({
      type: GET_TODOS,
      payload: {
        todos: todos,
      },
    });
  }
  return (
    <section>
      <Header></Header>
      <div style={{paddingTop:'20px'}}></div>
      <TodoList></TodoList>
    </section>
  );
}
export default MainPage;
