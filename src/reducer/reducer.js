import {
  CHANGE_ORDER,
  GET_TODOS,
  LOADING,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_MESSAGE,
  DELETE_TODO,
  CREATE_TODO,
} from "./actionType";
export const initialState = {
  orderBy: "date",
  todos: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case LOADING:
      return copyState({ loading: true });
    case CREATE_TODO:
      return createTodo();
    case CHANGE_ORDER:
      return changeOrder();
    case UPDATE_TODO_STATUS:
      return updateStatus();
    case UPDATE_TODO_MESSAGE:
      return updateMessage();
    case DELETE_TODO:
      return deleteTodo();
    case GET_TODOS:
      return getTodos();
    default:
      throw new Error();
  }

  function copyState(props) {
    return { ...state, ...props };
  }

  function getTodos() {
    return copyState({ todos: action.payload.todos, loading: false });
  }

  function changeOrder() {
    return copyState({
      orderBy: action.payload.orderBy,
      loading: true,
    });
  }

  function createTodo() {
    let newTodos = [action.payload.todo, ...state.todos];
    return copyState({ todos: newTodos });
  }

  function updateMessage() {
    let newTodos = state.todos;
    newTodos[action.payload.index].message = action.payload.message;
    return copyState({ todos: newTodos });
  }

  function updateStatus() {
    let newTodos = state.todos;
    newTodos[action.payload.index].status = action.payload.status;
    return copyState({ todos: newTodos });
  }

  function deleteTodo() {
    const newTodos = state.todos.filter((e, index) => {
      return index !== action.payload.index;
    });
    return copyState({ todos: newTodos });
  }
}
export default reducer;
